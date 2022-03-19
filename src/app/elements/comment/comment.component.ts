import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Comment from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input('comment') comment: Comment| any
  @Input('postID') postID: string| any
  @ViewChild('replyInput') replyInput: ElementRef|any

  remote = {
    confirm: false,
    likes: false,
    editPr: false,
    reply: false
  }

  textCmt: string|any
  textCmtChild:string|any

  constructor(
    public user: UserService,
    private commentService: CommentService
  ) { 
    
  }

  ngOnInit(): void {
    this.textCmt = this.comment.content
  }

  saveCommentParent() {
    this.commentService.updateComment(
      this.postID,
      this.comment.id,
      { content: this.textCmt }
    ).then(rs => {})
  }

  removeCommentParent() {
    this.commentService.removeComment(this.postID, this.comment.id)
      .then(rs => {

      })
  }

  addCommentChild() {
    if(this.textCmtChild !== null && this.textCmtChild !== "") {
      this.commentService.addComment(
        this.postID + '/comments/' + this.comment.id,
        this.textCmtChild
      ).then(rs => { 
        this.remote.reply = false
        this.textCmtChild = null
      })
    }
  }

  focusReplyForm(rep:any) {
    
  }

}
