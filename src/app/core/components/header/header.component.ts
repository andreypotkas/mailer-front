import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { catchError, Observable, of, take } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { CurrentUserService } from '../../services/current-user.service';
import { UsersService } from '../../services/users.service';
import { IUser } from 'src/app/entities/interfaces/user.interface';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	public isLoggedIn$!: Observable<boolean>;
	public height: string = '100px';
	public displayAdmin: boolean = true;
	public user!: any;
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private tokenService: TokenService,
		public currentUserService: CurrentUserService,
		public userService: UsersService,
	) {}

	public ngOnInit(): void {
		this.isLoggedIn$ = this.currentUserService.checkUser();
		const token = this.tokenService.getToken();
		const user = this.currentUserService.getUserFromLocalStorage();

		if (token && user) {
			this.userService.getUserById(user!.id).pipe(take(1)).subscribe((user: IUser) => {
				this.currentUserService.login(user)
				this.user = user;
				console.log(user);
			});
		} else {
			this.currentUserService.logout();
		}

		this.router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
			  if (event.url !== '/start'){
				this.height = '50px';
				this.displayAdmin = false;
			  } else {				
			  	this.height = '100px';
				this.displayAdmin = true;
			  }
			}
		  })
	}

	public logout() {
		this.currentUserService.logout();
		this.router.navigateByUrl('/start');
	}
}
