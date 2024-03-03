import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutes } from './chat.routing';
import { TranslateModule } from '@ngx-translate/core';
import {
  StreamAutocompleteTextareaModule,
  StreamChatModule,
} from 'stream-chat-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChatRoutes,
    TranslateModule.forChild(),
    StreamAutocompleteTextareaModule,
    StreamChatModule,
  ],
})
export class ChatModule {}
