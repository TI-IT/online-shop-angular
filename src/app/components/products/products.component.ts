import {Component, OnInit} from '@angular/core';
import {IProducts} from "../../models/products";
import {Subscription} from "rxjs";
import {ProductsService} from "../../services/products.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogBoxComponent} from "../dialog-box/dialog-box.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: IProducts[];
  productsSubcription: Subscription;
  canEdit: boolean = false;
  canView: boolean = false;

  constructor(private ProductsService: ProductsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    //......Проверка на Администратора
    this.canEdit = true;
    this.productsSubcription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  openDialog(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig
    );
  }


  ngOnDestroy() {
    if (this.productsSubcription) this.productsSubcription.unsubscribe()
  }

}
