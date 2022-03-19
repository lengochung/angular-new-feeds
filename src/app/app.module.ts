import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { RouterModule } from '@angular/router';
import { AngularFireAuthGuard, AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './elements/menu/menu.component';
import { TemplateComponent } from './template/template.component';
import { UploadPostComponent } from './elements/upload-post/upload-post.component';
import { FormatTimePipe } from './_pipes/format-time.pipe';
import { PostComponent } from './elements/post/post.component';
import { FormatStringLikePipe } from './_pipes/format-string-like.pipe';
import { CommentComponent } from './elements/comment/comment.component';
import { HoverCommentDirective } from './_directives/hover-comment.directive';
import { ChildcommentComponent } from './elements/childcomment/childcomment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PersonPageComponent } from './components/person-page/person-page.component';
import { HeaderProfileComponent } from './components/profile/header-profile/header-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditComponent } from './components/profile/edit/edit.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedsComponent,
    MenuComponent,
    TemplateComponent,
    UploadPostComponent,
    FormatTimePipe,
    PostComponent,
    FormatStringLikePipe,
    CommentComponent,
    HoverCommentDirective,
    ChildcommentComponent,
    ProfileComponent,
    PersonPageComponent,
    HeaderProfileComponent,
    EditProfileComponent,
    EditComponent,
    AboutComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule,
    AngularFireAuthGuardModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
