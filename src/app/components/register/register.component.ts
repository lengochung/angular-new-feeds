import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app'
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup|any
  users: User[]|any
  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private user: UserService
  ) {
    this.afs.collection('users').valueChanges()
      .subscribe(data => {
          this.users = data as User[]
      })
   }

  ngOnInit(): void {
    this.formInit()
  }

  formInit() {
    this.form = new FormGroup({
      fullname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirm: new FormControl(null, [Validators.required])
    })
  }

  done() {
    const {
      fullname, email, password, confirm
    } = this.form.value
    if(this.form.valid) {
          
      if(this.users.some((u: any) => u.email == email)) {
          alert('Email already in use')
      } else {
        // 
        if(password != confirm) {
          alert('The confirm password incorrect.')
        } else {
          this.auth.createUserWithEmailAndPassword(email, password)
            .then(rs => {
              this.handleWhenLoginSuccess(rs, fullname)
              
            })
        }
      }
    }
    
  }

  handleWhenLoginSuccess(rs: firebase.auth.UserCredential, fullname:string) {
    const user = {
      displayName: fullname,
      email: rs.user?.email,
      phoneNumber: null,
      photoURL: rs.user?.photoURL,
      refreshToken: rs.user?.refreshToken,
      id: rs.user?.uid,
      created_at: rs.user?.metadata.creationTime,
      lastLoginAt: rs.user?.metadata.lastSignInTime
    } as User
    // check new user
    if(rs.additionalUserInfo?.isNewUser) {
      this.user.addUser(user)
        .then((result) => {
          this.user.setUser(user)
          this.router.navigate(['feeds'])
        })
    } else {
        this.user.setUser(user)
        this.router.navigate(['feeds'])
    }
  }

}
