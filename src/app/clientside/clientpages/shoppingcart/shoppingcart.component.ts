import { Client_commonService } from './../../client_services/client_common.service';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs";

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  constructor
  (
    private route: ActivatedRoute,
    private router: Router,
    private Client_commonService_: Client_commonService
  )
  {
  }

  items$ = this.Client_commonService_.items$;

  ngOnInit() {
  }

}
