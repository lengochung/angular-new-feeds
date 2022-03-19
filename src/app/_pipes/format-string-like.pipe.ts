import { Pipe, PipeTransform } from '@angular/core';
import Like from '../models/likes.model';
import { UserService } from '../services/user.service';

@Pipe({
  name: 'formatStringLike'
})
export class FormatStringLikePipe implements PipeTransform {
  constructor(
    private user: UserService
  ) {}
  transform(likes: Like[], isvalLike: boolean): string {
    // Fix bug show on console
    if(!likes)
      return ''
    // Return info likes this post
    if(likes.length == 0)
      return `Nobody liked this post`
    // 
    if(isvalLike) {
      if(likes.length == 1)
        return `You liked this post`
      else
        return `You and ${likes.length - 1} more`
    } else {
      let nameFirstLike = likes[0].name ? likes[0].name : 'Someone with no name'
      if(likes.length == 1)
        return `${nameFirstLike} liked this post`
      else
        return `${nameFirstLike} and ${likes.length - 1} more`
    }
  }

}
