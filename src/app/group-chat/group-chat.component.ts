import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../socket.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css'],
  providers : [SocketService]
})
export class GroupChatComponent implements OnInit {

  public activatedGroup : string;
  public myuserId :string;
  public myname :string;
  public msgs = [];
  public msg :string;
  public typingMsg : string;
  public typing : boolean = false;

  constructor(
    private _route : ActivatedRoute,
    private userService : UserService,
    private socketService : SocketService
  ) { 
    this.myuserId = this.userService.getCurrentUserInfo().userId;
    this.myname  = this.userService.getCurrentUserInfo().name;
  }

  ngOnInit(): void {
    this.activatedGroup = this._route.snapshot.paramMap.get('groupname');
    console.log(this.activatedGroup);
    this.socketService.joinGroup({
      groupName : this.activatedGroup,
      userId : this.myuserId
    });

    this.socketService.getGroupChat(this.activatedGroup).subscribe(
      data=>{
        data.createdOn = new Date(data.createdOn);
        this.msgs.push(data);
      }
    );

    this.socketService.isTyping2(this.activatedGroup).subscribe(
      data=>{
        this.typing = true;
          this.typingMsg = data.msg;
          setTimeout(()=>{
            this.typing = false;
          },1000);
      }
    );
  }

  send(){

    let msgobj = {
      sender : this.myuserId,
      group : this.activatedGroup,
      msg : this.msg,
      createdOn : new Date(),
      diff : null
    }
    console.log(msgobj);
    this.socketService.sendMsgToGroup(msgobj);
    this.msgs.push(msgobj);
    this.msg = "";
  }

  sendTyping(){
    this.socketService.sendTypingGroup({
      name : this.myname,
      group : this.activatedGroup,
      msg : this.myname+" is Typing.."
    })
  }
}
