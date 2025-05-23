import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

interface Product {
  id: string;
  productName: string;
  url: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  showModal = false;
  modalMode: 'add' | 'edit' = 'add';
  selectedProduct: any = { productName: '', url: '' };
isSidebarCollapsed = false;
itemsPerPage = 5; 
 username: string | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
    this.username = localStorage.getItem('username');
  }

  loadProducts(): void {
    this.productService.getProductList('').subscribe((data: any[]) => {
      this.products = data;
    });
  }

  

  openModal(mode: 'add' | 'edit', product: any = null): void {
    this.modalMode = mode;
    this.showModal = true;
    if (mode === 'edit' && product) {
      this.selectedProduct = { ...product };
    } else {
      this.selectedProduct = { productName: '', url: '' };
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveProduct(): void {
    if (this.modalMode === 'add') {
      this.products.push({ ...this.selectedProduct, id: Date.now().toString() });
    } else if (this.modalMode === 'edit') {
      const index = this.products.findIndex(p => p.id === this.selectedProduct.id);
      this.products[index] = { ...this.selectedProduct };
    }
    this.closeModal();
  }

  removeProduct(): void {
    this.products = this.products.filter(p => p.id !== this.selectedProduct.id);
    this.closeModal();
  }

  goToDetail(id: string): void {
    this.router.navigate(['/detail', id]);
  }

  currentPage = 1;
  pageSize = 5;

  get pagedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const paged = this.products.slice(start, start + this.pageSize);
    return paged;
  }

  get totalPages(): number {
    const total = Math.ceil(this.products.length / this.pageSize) || 1;
    return total;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/login']);
  }

 

isSidebarClosed = false;

toggleSidebar() {
  this.isSidebarClosed = !this.isSidebarClosed;
}


goHome() {
  this.router.navigate(['/home']);
}
}
