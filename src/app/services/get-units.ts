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
  private allUnits$: Observable<Location[]> = this.allUnitsSubject.asObservable();
  private filterUnits: Location[] = [];


  constructor(private httpClient: HttpClient) {
     this.httpClient.get<UnitsResponse>(this.apiUrl).subscribe(data => {
      this.allUnitsSubject.next(data.locations);
      this.filterUnits = data.locations;
    });
  }
    getAllUnits(): Observable<Location[]> {
      return this.allUnits$;
    }

    getFilterUnits(){
      return this.filterUnits
    }

    setFilterUnits(value: Location[]) {
      this.filterUnits = value;
    }
}
