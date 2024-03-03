import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Channel, UserResponse } from 'stream-chat';
import {
  ChatClientService,
  DefaultStreamChatGenerics,
  StreamChatModule,
} from 'stream-chat-angular';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Observable, debounceTime, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'invite-button',
  standalone: true,
  imports: [
    MatButtonModule,
    StreamChatModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './invite-button.component.html',
  styleUrl: './invite-button.component.scss',
})
export class InviteButtonComponent implements OnInit {
  constructor(private chatClintService: ChatClientService) {}

  showDialog = false;
  @Input() channel!: Channel;
  userSearchField = new FormControl();
  availableUsers$!: Observable<UserResponse<DefaultStreamChatGenerics>[]>;

  ngOnInit(): void {
    this.availableUsers$ = this.userSearchField.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      switchMap((queryString) =>
        this.chatClintService.autocompleteUsers(queryString)
      )
    );
  }

  addToChat({ option: { value: userId } }: MatAutocompleteSelectedEvent) {
    this.channel.addMembers([userId]);
  }
}
