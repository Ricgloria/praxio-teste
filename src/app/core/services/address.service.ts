import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ViaCepAddress} from '../../shared/models/via-cep-address';


@Injectable({
  providedIn: 'root'
})
export class AddressService {


  private url = environment.viaCep;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAddressByZipcode(zipcode: string): Observable<ViaCepAddress> {
    return this.httpClient.get<ViaCepAddress>(`${this.url}/${zipcode}/json`);
  }
}
