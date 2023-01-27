import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, Subject, take } from 'rxjs';
import { API_ADDRESS } from 'src/app/entities/constants/token.constants';
import { IGoogleLoginResponse, IIMapMessage } from '../models/message-list.interface';
import { IMyEmailAccount } from '../models/my-email.interface';

@Injectable({
  providedIn: 'root',
})
export class MyEmailsService {
  private loginWindow!: Window;
  public currentService!: string;
  public error = new Subject();
  constructor(private http: HttpClient) {}

  public createMyEmail(body: IMyEmailAccount): Observable<IMyEmailAccount> {
		return this.http.post<IMyEmailAccount>(`${API_ADDRESS}mail-account`, body);
	}

  public getAllMyEmailByUserId(): Observable<IMyEmailAccount[]> {
		return this.http.get<IMyEmailAccount[]>(`${API_ADDRESS}mail-account`);
	}

	public deleteMyEmailById(id: string): Observable<string> {
		return this.http.delete<string>(`${API_ADDRESS}mail-account/${id}`);
	}

	public getAllMessages(id: string): Observable<IIMapMessage[]>{
		return this.http.get<IIMapMessage[]>(`${API_ADDRESS}imap-messages/messages/${id}`)
	}

	public getMessage(id: string, number: number): any{
		//TODO CHeck
		return this.http.get<Blob>(`${API_ADDRESS}imap-messages/message/${id}/${number+1}` );
	}

	public send(info: any){		
		return this.http.post<Blob>(`${API_ADDRESS}send`, info);
	}

//****************************************************************************************************** */

	public addNewMailAccountWithGoogleLogin() {
		this.loginWindow = window.open(
			`${API_ADDRESS}oauth-mail-account/google`,
			'',
			'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no',
		) as Window;

		window.addEventListener('message', (event: MessageEvent) => {
			this.createNewAccountOnLoginGoogle(event);
		});
	}

	private createNewAccountOnLoginGoogle(event: MessageEvent): void {
		const response: IGoogleLoginResponse = JSON.parse(event.data);		
		this.createMyEmail({...response, service: 'imap.gmail.com' }).pipe(take(1)).subscribe(data => console.log(data));

		this.loginWindow.close();
		window.removeEventListener('message', this.createNewAccountOnLoginGoogle);
	}

	public addNewMailAccountWithOutlookLogin() {
		this.loginWindow = window.open(
			`${API_ADDRESS}oauth-mail-account/outlook`,
			'',
			'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no',
		) as Window;

		window.addEventListener('message', (event: MessageEvent) => {
			console.log(event);
			
			this.createNewAccountOnLoginOutlook(event);
		});
	}

	private createNewAccountOnLoginOutlook(event: MessageEvent): void {
		// const response: IGoogleLoginResponse = JSON.parse(event.data);		
		// this.createMyEmail({...response, ...this.currentData}).pipe(take(1)).subscribe(data => console.log(data));

		// this.loginWindow.close();
		// window.removeEventListener('message', this.createNewAccountOnLoginOutlook);
	}

	public addYandexAccount() {
		this.loginWindow = window.open(
			`${API_ADDRESS}oauth-mail-account/yandex`,
			'',
			'toolbar=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no',
		) as Window;

		window.addEventListener('message', (event: MessageEvent) => {	
			this.onYandexLogin(event);
		});
	}

	private onYandexLogin(event: MessageEvent): void {
		const response: IGoogleLoginResponse = JSON.parse(event.data);	
		console.log(response);
			
		this.createMyEmail({...response, service: 'imap.yandex.com'}).pipe(take(1)).subscribe();

		this.loginWindow.close();
		window.removeEventListener('message', this.onYandexLogin);
	}

	public addMailruAccount() {
		this.loginWindow = window.open(
			`${API_ADDRESS}oauth-mail-account/mailru`,
			'',
			'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no',
		) as Window;

		window.addEventListener('message', (event: MessageEvent) => {			
			this.onMailruLogin(event);
		});
	}

	private onMailruLogin(event: MessageEvent): void {
		const response: IGoogleLoginResponse = JSON.parse(event.data);		
		this.createMyEmail({...response, service: 'imap.mail.ru'}).pipe(take(1)).subscribe(data => console.log(data));

		this.loginWindow.close();
		window.removeEventListener('message', this.onMailruLogin);
	}
}


