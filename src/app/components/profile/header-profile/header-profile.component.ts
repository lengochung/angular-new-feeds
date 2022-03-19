import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user.model';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.css']
})
export class HeaderProfileComponent implements OnInit {

  @Input('profile') profile: User|any

  image: any
  file: File| any
  constructor(
    public user: UserService,
    private router: Router,
    private uploadImage: UploadImageService
  ) { }

  ngOnInit(): void {
    if(this.profile)
      this.image = this.profile.photoURL
  }

  goEdit() {
    this.router.navigate(['edit'])
  }

  changeFile(e: any) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = (event) => {
      this.image = event.target?.result;
      this.file = e.target.files[0]
    }
  }

  save() {
    this.uploadImage.uploadAvatar(this.file)
      .subscribe(url => {
        console.log('Failed');
        
      })
  }
}
