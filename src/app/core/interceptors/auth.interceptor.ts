/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { TOKEN_HEADER_KEY } from 'src/app/entities/constants/token.constants';
import { IUserResponse } from 'src/app/entities/interfaces/user.interface';
import { UsersService } from '../services/users.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor( private authService: AuthService, private userService: UsersService) {}

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let authReq = req;
		const token = this.userService.getToken();
		if (token !== null && !authReq.url.includes('auth/refresh')) {
			authReq = this.addTokenHeader(req, token);
		}

		return next.handle(authReq).pipe(
			catchError((error) => {
				console.log(error);
				
				if (
					error instanceof HttpErrorResponse &&
					!authReq.url.includes('auth/login') &&
					error.status === 401
				) {					
					return this.handle401Error(authReq, next);
				}

				throw new (error);
			}),
		);
	}

	private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		
		if (!this.isRefreshing) {
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);
			const oldToken = this.userService.getRefreshToken();
			const id = this.userService.getUserFromLocalStorage()?.id;
			
			if (id && oldToken) {				
				return this.authService.refreshToken(id, oldToken).pipe(
					switchMap((token: IUserResponse) => {
						
						this.isRefreshing = false;
						
						this.userService.setToken(token.tokens.accessToken);
						this.refreshTokenSubject.next(token.tokens.accessToken);

						return next.handle(this.addTokenHeader(request, token.tokens.accessToken));
					}),
					catchError((err) => {
						this.isRefreshing = false;

						this.userService.logout();
						return throwError(err);
					}),
				);
			}
		}

		return this.refreshTokenSubject.pipe(
			filter((token) => token !== null),
			take(1),
			switchMap((token) => next.handle(this.addTokenHeader(request, token))),
			catchError((err) => {
				this.isRefreshing = false;

				this.userService.logout();
				return throwError(err);
			}),
		);
	}

	private addTokenHeader(request: HttpRequest<any>, token: string) {
		return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`) });
	}
}

export const AuthInterceptorProviders = {
	provide: HTTP_INTERCEPTORS,
	useClass: AuthInterceptor,
	multi: true,
};
