import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  public messages: Message[] = [];

  constructor(private msgSvc: MessageService) { }

  ngOnInit(): void {
    this.msgSvc.messageSubject.subscribe((message: Message) => {
      let updatedArrayLength = this.messages.push(message);
      setTimeout(() => {
        this.closeMessage(updatedArrayLength - 1);
      }, 3000);
    });
  }

  public closeMessage(index: number): void {
    this.messages[index] = {
      text: "",
      type: ""
    };
  }

}
