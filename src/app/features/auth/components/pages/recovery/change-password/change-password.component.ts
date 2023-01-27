import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
	public password = new FormControl('', [Validators.required]);
	public password2 = new FormControl('', [Validators.required]);
	public email = new FormControl('', [Validators.required]);

	public errorMessage = '';

	public returnUrl = '/';

	public token = '';

	public done = false;
	constructor(
		private authService: AuthService,
		private tokenService: TokenService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private currentUserService: CurrentUserService
	) {}

	public ngOnInit(): void {
		this.currentUserService.logout();
		this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
		this.token = this.activatedRoute.snapshot.params['token'];
	}

	public onSubmit(): void {
		this.authService
			.changePassword(this.email.value!, this.password.value!, this.token!)
			.pipe(take(1))
			.subscribe();
		this.done = !this.done;
		setTimeout(() => this.router.navigate(['login']), 2000);
	}
}
