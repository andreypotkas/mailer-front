import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { map, take } from 'rxjs';
import { IUser } from 'src/app/entities/interfaces/user.interface';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public user!: IUser;
  public file!: File;
  public msg!: string;
  public url!: string | ArrayBuffer | null;
  constructor(private currentUserService: CurrentUserService) { }

  ngOnInit(): void {
    this.currentUserService.getUser().pipe(
      map((user) => {
        console.log(user);
        
        this.user = user
    })).subscribe();
  }

  public selectFile(event: Event): void {
		const target = event.target as HTMLInputElement;
		const fileList = target.files as FileList;
		this.file = fileList[0];
		const mimeType = fileList[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.msg = 'Only images are supported';
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(this.file!);

		reader.onload = () => {
			this.msg = '';
			this.url = reader.result;
		};
	}

}
