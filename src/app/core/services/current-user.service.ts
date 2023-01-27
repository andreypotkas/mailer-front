import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { API_ADDRESS, USER_KEY } from 'src/app/entities/constants/token.constants';
import { IAvatar, IUser } from 'src/app/entities/interfaces/user.interface';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
	}),
};
@Injectable({
	providedIn: 'root',
})
export class CurrentUserService {
	public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public user: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

	constructor(private http: HttpClient) {}

	public login(user: IUser): void {
		this.isLoggedIn.next(true);
		this.user.next(user);
	}

	public logout(): void {
		localStorage.clear();
		this.isLoggedIn.next(false);
		this.user.next(null);
	}

	public checkUser(): Observable<boolean> {
		return this.isLoggedIn as Observable<boolean>;
	}

	public getUser(): Observable<IUser> {
		return this.user as Observable<IUser>;
	}

	public upload(file: File): Observable<IAvatar> {
		const formData = new FormData();
		formData.append('file', file, file.name);
		return this.http.post<IAvatar>(`${API_ADDRESS}users/avatar`, formData);
	}

	public getAvatar(userId: string, imageId: string = 'x') {
		return `${API_ADDRESS}users/${userId}/avatar/${imageId}`;
	}

	public getAvatarById(avatarId: string) {
		// return this.http.get(`${API_ADDRESS}users/user-avatar/${avatarId}`, {responseType: "blob"});
		return `${API_ADDRESS}users/user-avatar/${avatarId}`;
	}

	
	public getUserFromLocalStorage(): IUser | null {
		const user = window.localStorage.getItem(USER_KEY);
		if (user) {
			return JSON.parse(user);
		}

		return null;
	}

	public updateUserLocalstorage(user: IUser): void {
		window.localStorage.removeItem(USER_KEY);
		window.localStorage.setItem(USER_KEY, JSON.stringify(user));
	}
}
