import { Component, EventEmitter, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  ChatClientService,
  ChannelService,
  StreamI18nService,
  StreamAutocompleteTextareaModule,
  StreamChatModule,
} from 'stream-chat-angular';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NewChannelComponent } from './new-channel/new-channel.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [
    CommonModule,
    TranslateModule,
    StreamAutocompleteTextareaModule,
    StreamChatModule,
    NewChannelComponent,
  ],
})
export class ChatComponent implements OnInit {
  chatIsReady$!: Observable<boolean>;

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.chatIsReady$ = this.auth.getStreamToken().pipe(
      switchMap((userToken) =>
        this.chatService.init(
          environment.stream.key,
          this.auth.getCurrentUser().uid,
          userToken
        )
      ),
      switchMap(() =>
        this.channelService.init({
          type: 'messaging',
          members: { $in: [this.auth.getCurrentUser().uid] },
        })
      ),
      map(() => true),
      catchError(() => of(false))
    );

    this.streamI18nService.setTranslation();
  }

  onCreate(name: string) {
    const dasherizedName = name.replace(/\s+/g, '-').toLowerCase();
    const channel = this.chatService.chatClient.channel(
      'messaging',
      dasherizedName,
      {
        name: name,
        members: [this.auth.getCurrentUser().uid],
      }
    );
    from(channel.create());
  }
}
