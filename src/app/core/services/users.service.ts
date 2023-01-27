import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ADDRESS } from 'src/app/entities/constants/token.constants';
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
	constructor(private http: HttpClient) {}

	public getAllUsers(): Observable<IUser[]> {
		return this.http.get(`${API_ADDRESS}users`, httpOptions) as Observable<IUser[]>;
	}

	public getUserById(id: string): Observable<IUser> {
		return this.http.get(`${API_ADDRESS}users/${id}`, httpOptions) as Observable<IUser>;
	}
}
