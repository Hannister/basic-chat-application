import { NgModule } from '@angular/core';
import { ChatRoutes } from './chat.routing';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [ChatRoutes, TranslateModule.forChild()],
})
export class ChatModule {}
