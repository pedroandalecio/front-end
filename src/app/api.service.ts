import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Planet } from './planet';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/v1/planets';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(apiUrl)
      .pipe(
        tap(planet => console.log('fetched planets')),
        catchError(this.handleError('getPlanets', []))
      );
  }

  getPlanet(id: number): Observable<Planet> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Planet>(url).pipe(
      tap(_ => console.log(`fetched planet id=${id}`)),
      catchError(this.handleError<Planet>(`getPlanet id=${id}`))
    );
  }

  addPlanet(planet: Planet): Observable<Planet> {
    return this.http.post<Planet>(apiUrl, planet, httpOptions).pipe(
      tap((prod: any) => console.log(`added planet w/ id=${prod.id}`)),
      catchError(this.handleError<Planet>('addPlanet'))
    );
  }

  updatePlanet(id: any, planet: Planet): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, planet, httpOptions).pipe(
      tap(_ => console.log(`updated planet id=${id}`)),
      catchError(this.handleError<any>('updatePlanet'))
    );
  }

  deletePlanet(id: any): Observable<Planet> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Planet>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted planet id=${id}`)),
      catchError(this.handleError<Planet>('deletePlanet'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
