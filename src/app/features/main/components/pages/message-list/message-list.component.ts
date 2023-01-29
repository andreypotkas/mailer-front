import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { IIMapMessage } from '../../../models/message-list.interface';
import { IMyEmailAccount } from '../../../models/my-email.interface';
import { MyEmailsService } from '../../../services/my-emails.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  public messages!: IIMapMessage[];
  public accounts!: IMyEmailAccount[];
  public currentMailBoxId!: string;
  avatar!: any;
  constructor(private router: Router, private myEmailsService: MyEmailsService) { }

  ngOnInit(): void {
    this.myEmailsService.getAllMyEmailByUserId().pipe(take(1)).subscribe(data => {            
      this.accounts = data;
      this.getAccountMessages(data[0].id!);
    })
  }

  getAccountMessages(id:string){
    this.currentMailBoxId = id;
    this.myEmailsService.getAllMessages(id).subscribe(data => {
      this.messages = data;
    })
  }

  back(){
    this.avatar = null;
  }

  openMessage(id: number){
    this.myEmailsService.getMessage(this.currentMailBoxId, id).subscribe((data:any) => {
      this.avatar = data;
    });
  }
}


