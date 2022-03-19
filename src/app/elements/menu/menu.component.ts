import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  constructor(
    public user: UserService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.signOut()
      .then((result) => {
        this.user.remove()
        
      }).catch((err) => {
        console.log('no');
        
      });
  }

}
