import { Component, OnInit } from '@angular/core';
import Post from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.css']
})
export class PersonPageComponent implements OnInit {

  title:string|any
  posts: Post[]| any;

  constructor(
    private postService: PostService,
    public user: UserService
  ) {
    
  }

  ngOnInit(): void {
      this.title = this.user.name()
      this.postService.getPosts().subscribe(data => {
        this.posts = data.filter(p => p.user.uid == this.user.UID())
                      .sort((a:any, b:any) => b.created_at - a.created_at)
      })
      
  }

}
