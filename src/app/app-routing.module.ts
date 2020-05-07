import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GroupChatComponent } from './group-chat/group-chat.component';


const routes: Routes = [
  {path: "",component : LoginComponent},
  {path : "user/home" ,component : HomeComponent},
  {path : "user/group/:groupname",component : GroupChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
