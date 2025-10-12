import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../models/trip';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TripsService {
  private base = '/api/trips'; // proxied to http://localhost:3000/api/trips

  constructor(private http: HttpClient) {}

  list(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.base);
  }

  getByCode(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.base}/${encodeURIComponent(code)}`);
  }

  create(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.base, trip);
  }

  update(code: string, changes: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(`${this.base}/${encodeURIComponent(code)}`, changes);
  }

  delete(code: string): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(`${this.base}/${encodeURIComponent(code)}`);
  }
}
