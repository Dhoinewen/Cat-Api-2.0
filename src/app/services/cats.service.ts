import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICat} from "../models/cats";
import {IBreeds} from "../models/breeds";


@Injectable({
  providedIn: 'root'
})
export class CatsService {

  constructor(private http: HttpClient) {
  }


  getCats(
    limit: number,
    page: number,
    breed_id: string,
    format: string,
    categoryID: number
  ){
    let params = new HttpParams()
      .append('limit', limit)
      .append('order', 'ASC')
      .append('page', page)
      .append('breed_ids', breed_id)
      .append('mime_types', format)
    if (categoryID != 0) {
      params = params.append('category_ids', categoryID)
    }
    return this.http.get('https://api.thecatapi.com/v1/images/search', {
      headers: new HttpHeaders().append(
        'x-api-key',
        'live_cdDyPkqKPEm7J3IiMV6e31uVHpneQOey2j6Bfw3xprkRJdzp3pMcsG1euDSVHfbb'
      ),
      params: params,
      observe: 'response',
    });
  }

  getAllBreeds() {
    return this.http.get('https://api.thecatapi.com/v1/breeds');
  }

  getAllCategories() {
    return this.http.get('https://api.thecatapi.com/v1/categories')
  }
}
