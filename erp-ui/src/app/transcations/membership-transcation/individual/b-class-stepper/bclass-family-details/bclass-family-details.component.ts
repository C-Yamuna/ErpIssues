import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-bclass-family-details',
  templateUrl: './bclass-family-details.component.html',
  styleUrls: ['./bclass-family-details.component.css']
})
export class BclassFamilyDetailsComponent {
  // products!: Product[];

  statuses!: SelectItem[];
  statusList:any[]=[];
  commomCategory:any[]=[];
  // clonedProducts: { [s: string]: Product } = {};

  ngOnInit() {
    // this.productService.getProductsMini().then((data) => {
    //     this.products = data;
    // });

    this.statuses = [
        { label: 'In Stock', value: 'INSTOCK' },
        { label: 'Low Stock', value: 'LOWSTOCK' },
        { label: 'Out of Stock', value: 'OUTOFSTOCK' }
    ];
    this.statusList = [
      { label: "Active", value: true },
      { label: "In-Active", value: false }
    ]
}
onRowEditInit() {
  // this.clonedProducts[product.id as string] = { ...product };
}

onRowEditSave() {
  // if (product.price > 0) {
  //     delete this.clonedProducts[product.id as string];
  //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
  // } else {
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
  // }
}

onRowEditCancel() {
  // this.products[index] = this.clonedProducts[product.id as string];
  // delete this.clonedProducts[product.id as string];
}
Add(){
  
}
}
