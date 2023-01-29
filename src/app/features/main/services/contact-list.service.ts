import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ADDRESS } from 'src/app/entities/constants/api.constants';
import { IEmailContactList } from '../models/email-contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactListService {

  constructor(private http: HttpClient) {}

  public createContactList(body: IEmailContactList): Observable<IEmailContactList> {
		return this.http.post<IEmailContactList>(`${API_ADDRESS}contact-list`, body);
	}

  public getAllContactLists(): Observable<IEmailContactList[]> {
		return this.http.get<IEmailContactList[]>(`${API_ADDRESS}contact-list`);
	}

	public deleteContactListById(id: string): Observable<string> {
		return this.http.delete<string>(`${API_ADDRESS}contact-list/${id}`);
	}
}
