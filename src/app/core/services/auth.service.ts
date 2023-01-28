import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { API_ADDRESS } from 'src/app/entities/constants/api.constants';
import { IUserResponse } from 'src/app/entities/interfaces/user.interface';
import { UsersService } from './users.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private loginWindow!: Window;
	private returnUrl = '/';
	constructor(
		private http: HttpClient,
		private router: Router,
		private userService: UsersService
	) {}

	public login(email: string, password: string): Observable<IUserResponse> {
		return this.http.post<IUserResponse>(
			`${API_ADDRESS}auth/login`,
			{
				email: email,
				password: password,
			},
		);
	}

	public signup(email: string, password: string): Observable<IUserResponse> {
		return this.http.post<IUserResponse>(
			`${API_ADDRESS}auth/signup`,
			{
				email: email,
				password: password,
			},
		);
	}

	public refreshToken(id: string, token: string): Observable<IUserResponse> {
		return this.http.get<IUserResponse>(
			`${API_ADDRESS}auth/refresh/${id}`,{headers: {
				'Authorization': `Bearer ${token}`
			}}
		);
	}

	public loginWithGoogle() {
		this.loginWindow = window.open(
			`${API_ADDRESS}oauth/google`,
			'',
			'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no',
		) as Window;
		window.addEventListener('message', (event: MessageEvent) => {
			this.onLoginGoogle(event);
		});
	}

	private onLoginGoogle(event: MessageEvent): void {
		const response: IUserResponse = JSON.parse(event.data);

		this.userService.setToken(response.tokens.accessToken!);
		this.userService.setRefreshToken(response.tokens.refreshToken!);
		this.userService.saveUser(response.user);
		this.router.navigateByUrl(this.returnUrl);

		this.loginWindow.close();
		window.removeEventListener('message', this.onLoginGoogle);
	}

	public loginWithFacebook() {
		this.loginWindow = window.open(
			`${API_ADDRESS}oauth/facebook`,
			'',
			'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no',
		) as Window;
		window.addEventListener('message', (event: MessageEvent) => {
			this.onLoginFacebook(event);
		});
	}

	private onLoginFacebook(event: MessageEvent) {
		const response: IUserResponse = JSON.parse(event.data);

		this.userService.setToken(response.tokens.accessToken!);
		this.userService.setRefreshToken(response.tokens.refreshToken!);
		this.userService.saveUser(response.user);
		this.router.navigateByUrl(this.returnUrl);

		this.loginWindow.close();
		window.removeEventListener('message', this.onLoginFacebook);
	}
}
