// src/app/detail/alert.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private baseUrl = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/alert/list';

  constructor(private http: HttpClient, private auth: AuthService) {}
  
  getAlerts(id: string, indexNumber: number, pageSize: number, startDate: string, endDate: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });

    return this.http.get(`${this.baseUrl}/${id}`, {
      headers,
      params: {
        indexNumber,
        pageSize,
        startDate,
        endDate
      }
    });
  }
}
