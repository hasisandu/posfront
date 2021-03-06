import {Component} from '@angular/core';
import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';
import {Customer} from './dto/Customer';
import {CustomerService} from './service/customer.service';
import {Orders} from './dto/Orders';
import {OrderrService} from './service/orderr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animRoutes', [
      transition('* <=> *', [
        group([
          query(
            ':enter',
            [
              style({
                opacity: 0,
                transform: 'translateY(9rem) rotate(-10deg)'
              }),
              animate(
                '0.35s cubic-bezier(0, 1.8, 1, 1.8)',
                style({opacity: 1, transform: 'translateY(0) rotate(0)'})
              ),
              animateChild()
            ],
            {optional: true}
          ),
          query(
            ':leave',
            [animate('0.35s', style({opacity: 0})), animateChild()],
            {optional: true}
          )
        ])
      ])
    ])
  ]
})
export class AppComponent {

  Customers: Customer[] = [];
  orders: Orders[] = [];

  constructor(private customerService: CustomerService, private orderrService: OrderrService) {
    this.customerService.getAllCustomers().subscribe(result => {
      this.Customers = result;

    });

    this.orderrService.getAllOrders().subscribe(result => {
      this.orders = result;
      console.log(this.orders);
    });

  }


  getPage(outlet) {
    return outlet.activatedRouteData.page || 'one';
  }
}
