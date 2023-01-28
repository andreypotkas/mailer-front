import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ADDRESS } from 'src/app/entities/constants/api.constants';
import { IEmailContact } from '../models/email-contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactEmailService {

  constructor(private http: HttpClient) {}

  public createContactEmail(body: IEmailContact): Observable<IEmailContact> {
		return this.http.post<IEmailContact>(`${API_ADDRESS}mail-contact`, body);
	}

	public deleteContactEmailById(id: string): Observable<string> {
		return this.http.delete<string>(`${API_ADDRESS}mail-contact/${id}`);
	}
}
