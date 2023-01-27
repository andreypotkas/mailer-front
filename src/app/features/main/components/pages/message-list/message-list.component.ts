import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { IIMapMessage } from '../../../models/message-list.interface';
import { MyEmailsService } from '../../../services/my-emails.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  public messages!: IIMapMessage[];
  public currentMailBoxId!: string;
  avatar!: any;
  constructor(private activatedRoute: ActivatedRoute, private myEmailsService: MyEmailsService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      switchMap((event) =>  {
        this.currentMailBoxId = event[0];
        return event[0] ? this.myEmailsService.getAllMessages(event[0]) : []
      }),
    ).subscribe((data: IIMapMessage[]) => {
      console.log(data);
      this.messages = data
    });
  }

  openMessage(id: number){
    this.myEmailsService.getMessage(this.currentMailBoxId, id).subscribe((data:any) => this.avatar = data);
  }
}


