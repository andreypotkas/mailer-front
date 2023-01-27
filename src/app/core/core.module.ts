import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StartComponent } from './components/start/start.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, ProfileComponent, StartComponent],
  imports: [
    SharedModule,
  ],
  exports: [FooterComponent, HeaderComponent]
})
export class CoreModule { }
