import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProduct]'
})
export class ProductDirective {

  constructor(private _ren: Renderer2, private _el: ElementRef) { }


  @HostListener('click') onClick() {
    debugger;
    this._ren.addClass(this._el.nativeElement, '_36fT9');
    setTimeout(() => {
      this._ren.removeClass(this._el.nativeElement, '_1uN_a');
    }, 2000)
  }
}
