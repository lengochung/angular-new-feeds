import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import User from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  user: User|any
  alert = {
    displayName: "",
    nickname: "",
    phoneNumber: "",
    gender: "",
    address: ""
  }

  constructor(
    public userService: UserService,
    private router: Router,
    private afs: AngularFirestore
  ) { 
    this.afs.collection('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data }; 
      }))
    ).subscribe(data => {
      this.user = data.find(u => u.id == this.userService.UID()) as User
    })
    
  }

  ngOnInit(): void {
  }

  save() {
    this.alert = {
      displayName: "",
      nickname: "",
      phoneNumber: "",
      gender: "",
      address: ""
    }
    // check form
    if(this.user.displayName.length < 6) {
      this.alert.displayName = 'Display Name must be more than 6 characters.'
      return
    }
    if(this.user.nickname == undefined || this.user.nickname.length < 6) {
      this.alert.nickname = 'Nick Name must be more than 6 characters.'
      return
    }
    if(this.user.phoneNumber == null || this.user.phoneNumber.length != 10 || isNaN(this.user.phoneNumber)) {
      this.alert.phoneNumber = 'Phone Number must be exactly 10 numberic.'
      return
    }
    if(this.user.gender == undefined) {
      this.alert.gender = 'Please choose one value above.'
      return
    }
    if(this.user.address == undefined || this.user.address.length < 10) {
      this.alert.address = "Address must be more than 10 characters."
      return
    }
    // Success valid form
    this.userService.updateUser(this.user)
      .then((result) => {
        this.router.navigate(['profile', this.userService.UID()])
        
      })
  }

}
