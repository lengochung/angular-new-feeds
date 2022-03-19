import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverComment]'
})
export class HoverCommentDirective {

  constructor(private e: ElementRef) {
      this.e.nativeElement
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('rgb(223, 221, 221)');
    this.padding('10px')
    this.scale(1.1)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
    this.scale(1)
    this.padding('0')
  }

  private highlight(color: string) {
    this.e.nativeElement.style.backgroundColor = color;
  }
  private scale(scale: number) {
    this.e.nativeElement.style.transform = `scale(${scale})`;
  }
  private padding(value:string) {
    this.e.nativeElement.style.padding = value
  }

}
