import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:string;
  public password : string;

  constructor(
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.userService.login({email : this.email,password : this.password}).subscribe(
      data=>{
        if(data["isError"]){
          console.log(data["ErrorMsg"]);
        }
        else{
          console.log(data["ErrorMsg"]);
          console.log(data);
          this.userService.currentuser = data["SuccessMsg"];
          this.router.navigate(["user/home"]);
        }
      },
      err=>{
        console.log("Somethnig went wrong");
      }
    )
  }


}
