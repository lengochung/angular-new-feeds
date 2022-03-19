import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let timestamp = new Date().getTime()
    let different = (timestamp - value)/1000
    // return `${different}`
    if(different <= 60)
      return 'just now'
    else if(different <= 60*60)
      return Math.floor(different/60) + ' minutes ago'
    else if(different <= 60*60*24)
      return Math.floor(different/(60*60)) + ' hours ago'
    else if(different <= 60*60*24*7)
      return Math.floor(different/(60*60*24)) + ' days ago'
    else if(different <= 60*60*24*30)
      return Math.floor(different/(60*60*24*7)) + ' weeks ago'
    else
      return new Date(different).toDateString()
  }

}
