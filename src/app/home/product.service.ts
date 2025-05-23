
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productUrl = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/productList';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getProductList(p0?: string): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(this.productUrl, { headers });
  }
}
