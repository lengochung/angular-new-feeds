import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Like from '../models/likes.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private likes: Observable<Like[]>| any
  constructor(
    private afs: AngularFirestore,
    private user: UserService
  ) { 
    // this.likeCollection = this.afs.collection('posts')
  }

  getLikes(postId: string) {
    return this.afs.collection('posts/' + postId + '/likes')
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Like;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
  }

  dislike(postId: string, likeId: string) {
    this.afs.collection('posts/' + postId + '/likes').doc('/' + likeId)
      .delete()
  }

  like(postId: string) {
    this.afs.collection('posts/' + postId + '/likes')
      .add({
        imageURL: this.user.photoURL(),
        name: this.user.name(),
        userID: this.user.UID()
      } as Like)
  }
}
