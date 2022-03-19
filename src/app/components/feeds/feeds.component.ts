import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Post from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { AuthCredential, getAuth } from 'firebase/auth'
import { getApp } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import User from 'src/app/models/user.model';



@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  title = 'Feeds'
  posts: Post[]| any;

  constructor(
    private postService: PostService,
    public user: UserService,
    private auth: AngularFireAuth,
    private afs: AngularFirestore
  ) {  
  }

  ngOnInit(): void {

      this.postService.getPosts().subscribe(data => {
        this.posts = data.sort((a:any, b:any) => b.created_at - a.created_at)
        this.posts.forEach((post: Post) => {
          
          this.afs.collection('users', ref => ref.where("id", "==", post.user.id))
          .valueChanges()
          .subscribe(b => {
            let u = b[0] as User
            post.user.displayName = u.displayName
            post.user.photoURL = u.photoURL
            
            
            
          })
        });
      })
      
  }

}