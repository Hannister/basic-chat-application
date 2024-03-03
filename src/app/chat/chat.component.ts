import { Component, OnInit } from '@angular/core';
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
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
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
}
