import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Comment from '../models/comment.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Observable<Comment[]>| any
  
  constructor(
    private afs: AngularFirestore,
    private user: UserService
  ) { }

  setCollection(path:string) {
    return 'posts/' + path + '/comments'
  }

  getComments(path: string) {
    return this.afs.collection(this.setCollection(path))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Comment;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
  }

  removeComment(path: string, commentId: string) {
    return this.afs.collection(this.setCollection(path))
      .doc('/' + commentId)
      .delete()
  }

  addComment(path: string, content: string) {
    
    return this.afs.collection(this.setCollection(path))
      .add({
        imageURL: this.user.photoURL(),
        name: this.user.name(),
        userID: this.user.UID(),
        content: content,
        created_at: new Date().getTime()
      } as Comment)
  }

  updateComment(path: string, commentId: string, data:Comment) {
    return this.afs.collection(this.setCollection(path))
      .doc('/' + commentId)
      .update(data)
  }
}