import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, take } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { IUser } from 'src/app/entities/interfaces/user.interface';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	public isLoggedIn$!: Observable<boolean>;
	public displayAdmin: boolean = true;
	public user!: any;
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		public userService: UsersService,
	) {}

	public ngOnInit(): void {
		this.isLoggedIn$ = this.userService.isLoggedIn;
		const token = this.userService.getToken();
		const user = this.userService.getUserFromLocalStorage();

		if (token && user) {
			this.userService.getUserById(user!.id).pipe(take(1)).subscribe((user: IUser) => {
				this.userService.login(user)
				this.user = user;
				console.log(user);
			});
		} else {
			this.userService.logout();
		}
	}

	public logout() {
		this.userService.logout();
		this.router.navigateByUrl('/start');
	}
}
