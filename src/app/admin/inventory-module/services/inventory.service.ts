import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private _http: HttpClient) { }

  create(order: any){
    return this._http.post(environment.API_PATH + 'inventory', order);
  }

  getAll(){
    return this._http.get(environment.API_PATH + 'inventory');
  }

  getInventoryDetail(productId: number){
    return this._http.get(environment.API_PATH + 'inventory/' + productId + '/detail');
  }

  getCriticalStock(){
    return this._http.get(environment.API_PATH + 'inventory/criticalStock');
  }

}
