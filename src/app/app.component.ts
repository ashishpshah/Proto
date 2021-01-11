import {Component,VERSION, OnInit} from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Hindindisk';
  name = 'Angular ' + VERSION.major;
  showproduct = true;
  showHeader = true;
  showFooter = true;
  showrouter: string;

  slideActivate(ngbSlideEvent: NgbSlideEvent) {
    console.log(ngbSlideEvent.source);
    console.log(ngbSlideEvent.paused);
    console.log(NgbSlideEventSource.INDICATOR);
    console.log(NgbSlideEventSource.ARROW_LEFT);
    console.log(NgbSlideEventSource.ARROW_RIGHT);
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute)
  {
  }

  ngOnInit() {


    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {

        // this.showproduct = this.activatedRoute.firstChild.snapshot.data.showproduct !== false;
        // this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
        // this.showFooter = this.activatedRoute.firstChild.snapshot.data.showFooter !== false;
      }
      window.scrollTo(0, 0);
    });
  }
}
