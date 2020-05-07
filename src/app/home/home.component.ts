import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../socket.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers : [SocketService]
})
export class HomeComponent implements OnInit{

  public  msg : string;
  public myuserId : string;
  public receiver : string;
  public msgs = [];
  public today = new Date();
  public receivername : string;
  public typing : boolean = false;
  public typemsg : string;
  public myname :string;
  public groupName : string;
  public users = [];
  public selectedUsers = [];
  public myGroups = [];
  constructor(
    private socketService : SocketService,
    private userService : UserService
  ) { }


  ngOnInit(): void {

    this.myuserId = this.userService.getCurrentUserInfo().userId;
    this.myname  = this.userService.getCurrentUserInfo().name;
    console.log(this.myuserId);

    this.userService.getOtherUsers(this.myuserId).subscribe(
      data=>{
        console.log(data);
        this.receiver = data["SuccessMsg"][0].userId;
        this.receivername = data["SuccessMsg"][0].name;
        console.log(this.receiver);
        console.log(this.receivername);
      },
      err=>{

      }
    )

    this.userService.getmyGroup(this.myuserId).subscribe(
      data=>{
        console.log(data);
        this.myGroups = data["SuccessMsg"];
      }
    )

    this.socketService.receiveMsg(this.myuserId).subscribe(
      data=>{
       console.log(data);
        data.createdOn = new Date(data.createdOn);
        this.msgs.push(data);
      },
      err=>{
        console.log(err);
      }
    );

    this.userService.getAll().subscribe(
      data=>{
        this.users = data["SuccessMsg"];
      }
    )

      this.socketService.istyping(this.myuserId).subscribe(
        data=>{
          this.typing = true;
          this.typemsg = data.msg;
          setTimeout(()=>{
            this.typing = false;
          },1000);
        }
      )

  }

  send(){

    let msgobj = {
      sender : this.myuserId,
      receiver : this.receiver,
      msg : this.msg,
      createdOn : new Date(),
      diff : null
    }
    console.log(msgobj);
    this.socketService.sendMsg(msgobj);
    this.msgs.push(msgobj);
    this.msg = "";
  }

  sendTyping(){
    this.socketService.sendTyping({
      name : this.myname,
      receiver : this.receiver,
      msg : this.myname+" is Typing.."
    })
  }

  createGroup(){
    for(let user of this.users){
      if(user.selected){
        this.selectedUsers.push(user);
      }
    }
    let data = {
      groupName : this.groupName,
      users : this.selectedUsers
    }
    this.userService.createGroup(data).subscribe(
      data=>{
        console.log(data);
      }
    )
  }

}
