import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket: any;
  public userName : string;

  constructor(
    private userService :UserService
  ) { 
    this.userName = this.userService.getCurrentUserInfo().name;
    this.socket = io("http://192.168.43.82:3000/chat",{query :`name=${this.userName}`});
    console.log("socket initiated");
  }

  sendMsg(data){
    this.socket.emit("newMessage",data);
  }

  receiveMsg(userId){
    return Observable.create((observer)=>{
      this.socket.on(userId,(data)=>{
        observer.next(data);
      })
    });
  }

  sendTyping(data){
    this.socket.emit("typing",data);
  }

  sendTypingGroup(data){
    this.socket.emit("grouptyping",data);
  }

  istyping(userId){
    return Observable.create((observer)=>{
      this.socket.on(userId+"typing",(data)=>{
        observer.next(data);
      })
    });
  }

  getGroupChat(groupName){
    return Observable.create((observer)=>{
      this.socket.on(groupName,(data)=>{
        observer.next(data);
      })
    });
  }

  joinGroup(data){
    this.socket.emit("join",data);
  }

  sendMsgToGroup(data){
    this.socket.emit("groupchat",data);
  }

  isTyping2(groupname){
    return Observable.create((observer)=>{
      this.socket.on(groupname+"typing",(data)=>{
        observer.next(data);
      })
    });
  }
}
