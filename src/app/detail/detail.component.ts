
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  
import { AlertService } from '../services/alert.service';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class DetailComponent implements OnInit {
  productId!: string;
  data: any[] = [];
  total = 0;
  pageSize = 5;
  currentPage = 0;
   username: string | null = null;
  startDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');



  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router  
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.username = localStorage.getItem('username');
    this.fetchAlerts();
  }

  fetchAlerts(): void {
    const formattedStart = moment(this.startDate).format('YYYY-MM-DD');
    const formattedEnd = moment(this.endDate).format('YYYY-MM-DD');

    this.alertService
      .getAlerts(this.productId, this.currentPage, this.pageSize, formattedStart, formattedEnd)
      .subscribe((res) => {
        this.data = res.data || [];
        this.total = res.total || 0;
      });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchAlerts();
  }

  onDateChange(): void {
    this.currentPage = 0; 
    this.fetchAlerts();
  }

  isSidebarClosed = false;

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/home'])
      .then(success => console.log('Navigation success:', success))
      .catch(error => console.error('Navigation error:', error));
  }
}
