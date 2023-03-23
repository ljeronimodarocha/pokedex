import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  public apiListAllPokemons(valorInicia: number, valorFinal: number): Observable<any> {
    return this.http.get<any>(`${this.url}?offset=${valorInicia}&limit=${valorFinal}`).pipe(
      tap((res) => res),
      tap((res) => {
        res.results.map((resPokemons: any) => {
          this.apitGetPokemon(resPokemons.url).subscribe(
            (res) => resPokemons.status = res
          );
        });
      })
    );
  }

  public apitGetPokemon(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(map(res => res));
  }
}
