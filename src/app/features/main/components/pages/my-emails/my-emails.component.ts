import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { MyEmailsService } from '../../../services/my-emails.service';

@Component({
  selector: 'app-my-emails',
  templateUrl: './my-emails.component.html',
  styleUrls: ['./my-emails.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class MyEmailsComponent implements OnInit {
    
    productDialog!: boolean;

    products!: any[];

    product!: any;

    selectedProducts!: any;

    submitted!: boolean;

    statuses!: any[];

    constructor(private myEmailsService: MyEmailsService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.myEmailsService.getAllMyEmailByUserId().pipe(take(1)).subscribe(data => {            
            this.products = data;
        })

        this.myEmailsService.error.subscribe((data: any) => 
        this.messageService.add({ 
            severity:'error', 
            icon:'pi-close', 
            summary: 'Service Message', 
            detail: `${data.email} Already exist!`
        }))
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => !this.selectedProducts.includes(val));
                this.selectedProducts = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
            }
        });
    }

    editProduct(product: any) {
        this.product = {...product};
        this.productDialog = true;
    }

    deleteProduct(product: any) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.myEmailsService.deleteMyEmailById(product.id!).pipe(take(1)).subscribe();
                this.products = this.products.filter(val => val.id !== product.id);
                this.product = {};
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
            }
        });
    }

    addYandexAccount(){
        this.myEmailsService.addYandexAccount();
    }

    addGoogleAccount(){
        this.myEmailsService.addNewMailAccountWithGoogleLogin();
    }

    addMailruAccount(){
        this.myEmailsService.addMailruAccount();
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }


    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 5; i++ ) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

}
