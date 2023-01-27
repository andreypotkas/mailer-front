import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IEmailContactList } from 'src/app/features/main/models/email-contact.interface';
@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogWindowComponent implements OnInit {
  @Input() contactList: IEmailContactList[] = [];
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  profileForm = this.fb.group({
    name: [''],
    phoneNumber: [''],
    email: [''],
    telegram: [''],
    whatsup: [''],
    mailContactListId: [''],
    description: [''],
    facebook: [''],
    instagram: [''],
    linkedin: [''],
  });
  
  countries: any[] = [];

  cascadeSelectCountries!: any[];

  filteredCountries!: any[];

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {}

  onSubmit(){
    this.submit.emit(this.profileForm.value);    
  }

  onCancel(){
    this.cancel.emit();    
  }

  searchCountry(event: any) {}

}
