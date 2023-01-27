import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { TokenService } from 'src/app/core/services/token.service';


@Component({
	selector: 'app-recovery',
	templateUrl: './recovery.component.html',
	styleUrls: ['./recovery.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoveryComponent implements OnInit {
	public email = new FormControl('', [Validators.required, Validators.email]);

	public errorMessage = '';

	public returnUrl = '/';

	public done = false;
	constructor(
		private authService: AuthService,
		private tokenService: TokenService,
		private route: ActivatedRoute,
		private currentUserService: CurrentUserService
	) {}

	public ngOnInit(): void {
		this.currentUserService.logout();
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	public getEmailError(): string {
		if (this.email.hasError('required')) {
			return 'You must enter a value';
		}
		return this.email.hasError('email') ? 'Not a valid email' : '';
	}

	public onSubmit(): void {
		this.authService.passwordRecovery(this.email.value!).pipe(take(1)).subscribe();
		this.done = !this.done;
	}
}
