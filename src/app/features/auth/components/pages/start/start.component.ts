import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { IUser } from 'src/app/entities/interfaces/user.interface';
import { AuthService } from '../../../../../core/services/auth.service';
import { UsersService } from '../../../../../core/services/users.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
	public displayAdmin: boolean = true;
	public user!: any;
  
  constructor(
    private router: Router,
	private activatedRoute: ActivatedRoute,
	public userService: UsersService,
  ) { }

  ngOnInit(): void {
		const token = this.userService.getToken();
		const user = this.userService.getUserFromLocalStorage();

		console.log(token, user);
		

		if (token && user) {
			this.userService.getUserById(user!.id).pipe(take(1)).subscribe((user: IUser) => {
				this.userService.login(user);
				this.user = user;
				console.log(user);
				this.router.navigateByUrl('/main');
			});
		} else {
			this.userService.logout();
		}
  }

  public logout() {
		this.userService.logout();
  }
}
