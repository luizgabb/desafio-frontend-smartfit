import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../types/units-response.interface';
import { Location } from '../types/location.interface';

@Injectable({
  providedIn: 'root'
})
export class GetUnits {

  readonly apiUrl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";

  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  private allUnits: Location[] = [];
  private filterUnits: Location[] = [];


  constructor(private httpClient: HttpClient) {
  }
    getAllUnits(): Observable<UnitsResponse> {
      return this.httpClient.get<UnitsResponse>(this.apiUrl)
    }

}
