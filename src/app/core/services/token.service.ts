import { Injectable } from '@angular/core';
import { REFRESHTOKEN_KEY, TOKEN_KEY, USER_KEY } from 'src/app/entities/constants/token.constants';
import { IUser } from 'src/app/entities/interfaces/user.interface';
import { CurrentUserService } from './current-user.service';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	constructor(private currentUserService: CurrentUserService) {}

	public saveToken(token: string): void {
		window.localStorage.removeItem(TOKEN_KEY);
		window.localStorage.setItem(TOKEN_KEY, token);
	}

	public getToken(): string | null {
		return window.localStorage.getItem(TOKEN_KEY);
	}

	public saveRefreshToken(token: string): void {
		window.localStorage.removeItem(REFRESHTOKEN_KEY);
		window.localStorage.setItem(REFRESHTOKEN_KEY, token);
	}

	public getRefreshToken(): string | null {
		return window.localStorage.getItem(REFRESHTOKEN_KEY);
	}

	public saveUser(user: IUser): void {
		this.currentUserService.updateUserLocalstorage(user);

		window.localStorage.removeItem(USER_KEY);
		window.localStorage.setItem(USER_KEY, JSON.stringify(user));

		this.currentUserService.login(user);
	}
}
