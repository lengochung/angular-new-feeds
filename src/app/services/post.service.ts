import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Post from '../models/post.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postCollection: AngularFirestoreCollection<Post>
  posts: Observable<Post[]>

  constructor(
    private afs: AngularFirestore,
    private user: UserService
  ) {
    this.postCollection = afs.collection('posts')
    this.posts = this.postCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  getPosts() {
    return this.posts
  }

  uploadPost(post: Post) {
    post.user = this.user.getUser()
    post.created_at = new Date().getTime()
    
    return this.postCollection.add(post)
  }

  remove(postId:string) {
    return this.postCollection.doc('/' + postId).delete()
  }

  update(postId:string, newContent: string) {
    return this.postCollection.doc('/' + postId).update({
      content: newContent
    })
  }

}
