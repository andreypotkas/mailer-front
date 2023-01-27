import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './features/main/components/pages/main/main.component';
import { ProfileComponent } from './core/components/profile/profile.component';
import { StartComponent } from './core/components/start/start.component';
const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: 'main',
		loadChildren: () => import('./features/main/main.module').then((m) => m.MainModule),
	},
	{
		path: 'start',
		component: StartComponent,
	},
	{
		path: 'profile',
		component: ProfileComponent,
	},
	{
		path: '',
		redirectTo: 'start',
		pathMatch: 'full'
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
