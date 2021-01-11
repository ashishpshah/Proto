import { Item_Master } from '../../../models/Item_Master';
import { CategoryService } from '../../client_services/category.service';
import { Component, OnInit } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public data;
  Item_Masters : Observable<Item_Master[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
  ){

  }

  slideActivate(ngbSlideEvent: NgbSlideEvent) {
    console.log(ngbSlideEvent.source);
    console.log(ngbSlideEvent.paused);
    console.log(NgbSlideEventSource.INDICATOR);
    console.log(NgbSlideEventSource.ARROW_LEFT);
    console.log(NgbSlideEventSource.ARROW_RIGHT);
  }
  GetProductItem(){

    this.categoryService.GetProductItem().subscribe(
      (data) =>
       {
         this.Item_Masters = data;
      }
    )
  }

  ngOnInit(): void {
    this.GetProductItem();

// array of json for product list

    this.data ={

      result:status,

      productList:[

        {

          '_id': '5e804e29a915bb6a2297cfed',

          'index': 0,

          'price': '$31.79',

          'picture': '/assets/img/slider/slide_2.jpg',

          'name': 'Duffy Houston',

          'company': 'EQUITAX',

          'stock': 88

        },

        {

          '_id': '5e804e29c0165da9c25fdf9c',

          'index': 1,

          'price': '$32.92',

          'picture': '/assets/img/slider/slide_3.jpg',

          'name': 'Sanford Stanley',

          'company': 'ZILLA',

          'stock': 42

        },

        {

          '_id': '5e804e29421be457e0764462',

          'index': 2,

          'price': '$26.05',

          'picture': '/assets/img/slider/slide_2.jpg',

          'name': 'Tracey Fleming',

          'company': 'RODEMCO',

          'stock': 85

        },

        {

          '_id': '5e804e296cd363835b6b1904',

          'index': 3,

          'price': '$34.00',

          'picture': '/assets/img/slider/slide_3.jpg',

          'name': 'Howe Ruiz',

          'company': 'ARCTIQ',

          'stock': 27

        },

        {

          '_id': '5e804e29f434203d0037bf41',

          'index': 4,

          'price': '$14',

          'picture': '/assets/img/slider/slide_2.jpg',

          'name': 'Powers Kaufman',

          'company': 'EXOSPACE',

          'stock': 44

        },

        {

          '_id': '5e804e295884556517418658',

          'index': 5,

          'price': '$48.41',

          'picture': '/assets/img/slider/slide_3.jpg',

          'name': 'Pugh Pierce',

          'company': 'ZILPHUR',

          'stock': 64

        }
      ]

    }

  }



}
