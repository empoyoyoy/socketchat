import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes =[
  { path: '' , component: ChatComponent},
  { path: 'callback' , component: ChatComponent },
  { path: 'about' , component:  AboutComponent},
  { path: 'login' , component:  LoginComponent}
  // {path: 'not-found', component: ErrorPageComponent,data: {message: 'Requested page not found!'}},
  // {path: '**', redirectTo: '/not-found'} //should be the last one

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
