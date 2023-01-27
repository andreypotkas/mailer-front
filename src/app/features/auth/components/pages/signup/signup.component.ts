import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { TokenService } from 'src/app/core/services/token.service';
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
	public repeatPass = new FormControl('', [Validators.required]);

	public errorMessage = '';
	public isLoginFailed = false;

	public returnUrl = '/';
	constructor(
		private authService: AuthService,
		private tokenService: TokenService,
		private currentUserService: CurrentUserService,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	public ngOnInit(): void {
		this.currentUserService.logout();
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	public getError(element: FormControl): string {
		if (element.hasError('required')) {
			return 'You must enter a value';
		}
		return element.hasError('email') ? 'Not a valid email' : '';
	}

	public onSubmit(): void {
		this.authService.signup(this.email.getRawValue()!, this.pass.getRawValue()!).subscribe(
			(data: IUserResponse) => {
				this.tokenService.saveToken(data.tokens.accessToken!);
				this.tokenService.saveRefreshToken(data.tokens.refreshToken!);
				this.tokenService.saveUser(data.user);
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
