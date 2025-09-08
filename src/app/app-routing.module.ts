import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlaylistComponent } from './playlist/playlist.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'playlist', component: PlaylistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
