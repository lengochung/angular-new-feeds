import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app'
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = "Login"

  form: FormGroup| any
  isvalLog = false

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private user: UserService,
    private afs: AngularFirestore
  ) { 
  }

  ngOnInit(): void {
    this.formInit()
  }

  formInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  handleWhenLoginSuccess(rs: firebase.auth.UserCredential) {
    const user = {
      displayName: rs.user?.displayName,
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
    
    // this.user.addUser()
  }

  loginWithEmailAndPassword() {
    if(!this.form.invalid) {
      const { email, password } = this.form.value
      this.auth.signInWithEmailAndPassword(email, password)
        .then(rs => this.handleWhenLoginSuccess(rs))
        .catch(err => {
            this.isvalLog = true
        })
    }
  }

  loginWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(rs => this.handleWhenLoginSuccess(rs))
  }
  loginWithGithub() {
    this.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then(rs => this.handleWhenLoginSuccess(rs))
  }
}
