import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import Comment from 'src/app/models/comment.model';
import Like from 'src/app/models/likes.model';
import Post from 'src/app/models/post.model';
import { CommentService } from 'src/app/services/comments.service';
import { LikesService } from 'src/app/services/likes.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input('post') post:Post| any
  // 
  remote = {
    confirm: false,
    edit: false,
    likes: false,
    showComments: false
  }
  isvalLike:boolean = false
  likes: Observable<Like[]>| any
  likeId: string| any
  comments: Observable<Comment[]>| any = []
  // 
  textComment = null

  constructor(
    public user: UserService,
    private postService: PostService,
    private likeService: LikesService,
    private commentService: CommentService
  ) { 
    
  }

  ngOnInit(): void {
    console.log(this.post.imageURL);
    
    // Set isvalLike and likes
    this.likeService.getLikes(this.post.id).subscribe(data => {
      // 
      this.likes = data
      // 
      this.isvalLike = this.likes.some((l:Like) => l.userID == this.user.UID())
      // 
      if(this.isvalLike)
        this.likeId = this.likes.find((l: Like) => l.userID == this.user.UID()).id
      // 
    })
    // set Comments
    this.commentService.getComments(this.post.id).subscribe(rs1 => {
      this.comments = rs1.sort((a:any, b:any) => b.created_at - a.created_at)
      // 
      this.comments.forEach((cmt: Comment) => {
        // Level 2 comments
        this.commentService
          .getComments(this.post.id + '/comments/' + cmt.id)
          .subscribe(rs2 => {
            cmt.comments = rs2.sort((a:any, b:any) => a.created_at - b.created_at)
            // End comments
          })
      });
    })
    // 
  }

  compare(a: any, b: any) {
    return b.created_at - a.created_at
  }

  removePost() {
    this.postService.remove(this.post.id)
      .then(rs => {
        this.remote.confirm = false
      }).catch((err) => {
        alert('failed')
      });
  }

  saveContent() {
    this.postService.update(this.post.id, this.post.content)
      .then(rs => {
        this.remote.edit = false
        
      }).catch((err) => {
        console.log("Failed");
        
      });
  }
  
  reactLike() {
    if(this.isvalLike)
      this.likeService.dislike(this.post.id, this.likeId)
    else
      this.likeService.like(this.post.id)
  }

  sendComment() {
    if(this.textComment !== null && this.textComment !== "") {
      this.commentService.addComment(this.post.id, this.textComment)
        .then(rs => {
            this.textComment = null
            this.remote.showComments = true
            
        }).catch((err) => {
          
        });
    }
  }
}
