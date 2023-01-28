import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { IUserResponse } from 'src/app/entities/interfaces/user.interface';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
	public email = new FormControl('', [Validators.required, Validators.email]);
	public pass = new FormControl('', [Validators.required]);

	public errorMessage = '';
	public isLoginFailed = false;

	public returnUrl = '/';
	constructor(
		private authService: AuthService,
		private userService: UsersService,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	public ngOnInit(): void {
		this.userService.logout();
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	public getError(element: FormControl): string {
		if (element.hasError('required')) {
			return 'You must enter a value';
		}
		return element.hasError('email') ? 'Not a valid email' : '';
	}

	public onSubmit(): void {
		this.authService.signup(this.email.value!, this.pass.value!).pipe(take(1))
		.subscribe(
			(data: IUserResponse) => {				
				this.userService.setToken(data.tokens.accessToken!);
				this.userService.setRefreshToken(data.tokens.refreshToken!);
				this.userService.saveUser(data.user);
				this.router.navigateByUrl('/main');
			},
			(err: HttpErrorResponse) => {
				this.errorMessage = err.error.message;
				this.isLoginFailed = true;
			},
		);
	}

	public signupWithGoogle() {
		this.authService.loginWithGoogle();
	}

	public signupWithFacebook() {
		this.authService.loginWithFacebook();
	}
}
