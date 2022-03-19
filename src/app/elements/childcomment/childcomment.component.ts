import { Component, Input, OnInit } from '@angular/core';
import Comment from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-childcomment',
  templateUrl: './childcomment.component.html',
  styleUrls: ['./childcomment.component.css']
})
export class ChildcommentComponent implements OnInit {

  @Input('child') child: Comment| any
  @Input('path') path: string| any

  remote = {
    edit: false
  }
  textCmtChild:string|any

  constructor(
    public user: UserService, private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.textCmtChild = this.child.content
  }

  removeCommentChild(cmtId:string) {
    this.commentService.removeComment(
      this.path,
      cmtId
    )
  }

  updateCommentChild() {
    this.commentService.updateComment(
      this.path,
      this.child.id,
      {
        content: this.textCmtChild
      }
    )
  }

}
