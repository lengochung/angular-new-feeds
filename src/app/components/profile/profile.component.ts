import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import Post from 'src/app/models/post.model';
import User from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title:string|any
  posts: Post[]| any;

  pfID:string|any
  profile: User|any

  constructor(
    private postService: PostService,
    public user: UserService,
    private ar: ActivatedRoute,
    private afs: AngularFirestore
  ) {
      this.pfID = this.ar.snapshot.paramMap.get('profileID')
      this.user.getUserFirebase().subscribe(data => {
        // Set profile
        this.profile = data.find(u => u.id == this.pfID) as User
        this.title = this.profile.displayName
      })
  }

  ngOnInit(): void {
      
      this.postService.getPosts().subscribe(data => {
        this.posts = data.filter(p => p.user.id == this.pfID)
                      .sort((a:any, b:any) => b.created_at - a.created_at);
        this.posts.forEach((post: Post) => {

            this.afs.collection('users', ref => ref.where("id", "==", this.pfID))
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
