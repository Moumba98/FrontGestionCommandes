import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StripeService {
  private apiUrl = 'http://15.188.37.53:8080/api/payment/create-intent';

  constructor(private http: HttpClient) {}

  // Cette méthode appelle ton API Spring Boot
  createPaymentIntent(amount: number): Observable<any> {
    return this.http.post(this.apiUrl, { amount: amount });
  }
}
