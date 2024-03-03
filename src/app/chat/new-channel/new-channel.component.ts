import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'new-channel',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-channel.component.html',
  styleUrl: './new-channel.component.scss',
})
export class NewChannelComponent {
  @Output() saved = new EventEmitter<string>();
  channelName = new FormControl();

  onCreate() {
    this.saved.emit(this.channelName.value);
    this.channelName.reset('');
  }
}
