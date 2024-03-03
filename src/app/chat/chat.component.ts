import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  ChatClientService,
  ChannelService,
  StreamI18nService,
  StreamAutocompleteTextareaModule,
  StreamChatModule,
  ChannelActionsContext,
  CustomTemplatesService,
} from 'stream-chat-angular';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NewChannelComponent } from './new-channel/new-channel.component';
import { InviteButtonComponent } from './invite-button/invite-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    InviteButtonComponent,
    MatProgressSpinnerModule,
  ],
})
export class ChatComponent implements OnInit, AfterViewInit {
  chatIsReady$!: Observable<boolean>;
  @ViewChild('channelActionTemplate')
  private channelActionTemplate!: TemplateRef<ChannelActionsContext>;

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private auth: AuthService,
    private customTemplatesService: CustomTemplatesService
  ) {}

  ngAfterViewInit(): void {
    this.customTemplatesService.channelActionsTemplate$.next(
      this.channelActionTemplate
    );
  }

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
      map(() => true)
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
