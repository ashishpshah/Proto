import { Client_commonService } from './../../client_services/client_common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  Cust_id:string
  AddresList  : any [];
  constructor(  private route: ActivatedRoute,
    private router: Router,
    public Client_commonService_: Client_commonService,) { }

  ngOnInit()
  {
    this.GetAddressList()
  }

  GetAddressList()
  {
    debugger;
    this.Cust_id = localStorage.getItem('CustId');

    this.Client_commonService_.GetAddressList(this.Cust_id).subscribe(
      (data) =>
       {
         this.AddresList = data;

      }
    )
  }

}
