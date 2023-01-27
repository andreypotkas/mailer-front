import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { AuthInterceptorProviders } from './core/interceptors/auth.interceptor';

@NgModule({
	declarations: [AppComponent],
	imports: [
		CoreModule,
		SharedModule,
		CommonModule,
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,

		// ServiceWorkerModule.register('ngsw-worker.js', {
		// 	enabled: environment.production,
		// 	registrationStrategy: 'registerWhenStable:30000',
		// }),
	],
	providers: [AuthInterceptorProviders],
	bootstrap: [AppComponent],
})
export class AppModule {}
