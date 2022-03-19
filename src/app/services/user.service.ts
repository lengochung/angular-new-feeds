import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>
  user: User|any

  constructor(private router: Router, private afs: AngularFirestore) { 
    
    this.userCollection = this.afs.collection('users')
    // 
    if(localStorage['user']){
      this.userCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).subscribe(data => {
        this.user = data.filter(u => u.id === JSON.parse(localStorage['user']).id)[0] as User
        
      })
    }
    
  }

  getUserFirebase() {
    return this.afs.collection('users').snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      )
  }

  addUser(user: User) {
    return this.userCollection.doc(user.id).set(user)
  }

  updateUser(user: User) {
    return this.afs.collection('users').doc('/' + user.id).update(user)
  }

  setUser(user: User) {
      localStorage.setItem('user', JSON.stringify(user))
  }

  remove() {
    localStorage.removeItem('user')
    this.router.navigate(['login'])
  }

  getUser(): User {
    if(this.user)
      return this.user
    else 
      return JSON.parse(localStorage['user']);
  }

  getFakeUser(): User {
    return this.getUser()
  }

  UID() {
    return this.getUser().id
  }

  name() {
    return this.getUser().displayName
  }

  email() {
    return this.getUser().email
  }

  photoURL() {
    if(this.getUser().photoURL == null)
      return 'assets/images/default.png'
    return this.getUser().photoURL
  }
}
