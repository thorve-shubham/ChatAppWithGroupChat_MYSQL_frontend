import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentuser ;
  public decoded;

  constructor(
    private http : HttpClient
  ) { }

  login(data){
    return this.http.post("http://192.168.43.82:3000/user/login",data);
  }

  getCurrentUserInfo(){
     this.decoded = jwt(this.currentuser);
     return this.decoded;
  }

  getOtherUsers(data){
    return this.http.get("http://192.168.43.82:3000/user/get?otherThan="+data);
  }

  getAll(){
    return this.http.get("http://192.168.43.82:3000/user/getAll");
  }

  createGroup(data){
    return this.http.post("http://192.168.43.82:3000/user/createGroup",data);
  }

  getmyGroup(userId){
    return this.http.get("http://192.168.43.82:3000/user/getmyGroup?userId="+userId);
  }
}
