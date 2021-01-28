import { Client_commonService } from './../../client_services/client_common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.scss']
})
export class WhishlistComponent implements OnInit {

  Item_Master_ : any;
  constructor
  (
    private route: ActivatedRoute,
    private router: Router,
    public Client_commonService_: Client_commonService,
  )
  {
  }
  itemswhish$ = this.Client_commonService_.itemswhish$;
  ngOnInit() {


    this.Item_Master_ = this.Client_commonService_.getwhislistItems();
  }

}
