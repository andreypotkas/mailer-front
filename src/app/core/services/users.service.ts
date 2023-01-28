import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_ADDRESS } from 'src/app/entities/constants/api.constants';
import { REFRESHTOKEN_KEY, TOKEN_KEY, USER_KEY } from 'src/app/entities/constants/token.constants';
import { IUser} from 'src/app/entities/interfaces/user.interface';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
	}),
};

@Injectable({
	providedIn: 'root',
})
export class UsersService {
	public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public user: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

	constructor(private http: HttpClient) {}

	public getAllUsers(): Observable<IUser[]> {
		return this.http.get(`${API_ADDRESS}users`, httpOptions) as Observable<IUser[]>;
	}

	public getUserById(id: string): Observable<IUser> {
		return this.http.get(`${API_ADDRESS}users/${id}`, httpOptions) as Observable<IUser>;
	}

	public login(user: IUser): void {
		this.isLoggedIn.next(true);
		this.user.next(user);
	}

	public logout(): void {
		localStorage.clear();
		this.isLoggedIn.next(false);
		this.user.next(null);
	}
	
	public getUserFromLocalStorage(): IUser | null {
		const user = window.localStorage.getItem(USER_KEY);
		if (user) {
			return JSON.parse(user);
		}

		return null;
	}

	public setUserLocalStorage(user: IUser): void {
		window.localStorage.removeItem(USER_KEY);
		window.localStorage.setItem(USER_KEY, JSON.stringify(user));
	}

	public setToken(token: string): void {
		window.localStorage.setItem(TOKEN_KEY, token);
	}

	public getToken(): string | null {
		return window.localStorage.getItem(TOKEN_KEY);
	}

	public setRefreshToken(token: string): void {
		window.localStorage.setItem(REFRESHTOKEN_KEY, token);
	}

	public getRefreshToken(): string | null {
		return window.localStorage.getItem(REFRESHTOKEN_KEY);
	}

	public saveUser(user: IUser): void {
		this.setUserLocalStorage(user);

		this.login(user);
	}
}
