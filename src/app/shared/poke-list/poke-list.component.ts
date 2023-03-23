import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';


@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  private setAllPokemons: any;
  public getAllPokemons: any;

  private valorInicial = 0;
  private valorFinal = 100;

  public apiError: boolean = false;

  constructor(private pokeApiService: PokeApiService) {}

  public loadMore(): void {
    this.valorInicial = this.valorFinal + 1;

    this.valorFinal = this.valorFinal + 100;

    this.pokeApiService
      .apiListAllPokemons(this.valorInicial, this.valorFinal)
      .subscribe(
        (res) => {
          this.setAllPokemons.push(...res.results);
          this.getAllPokemons = this.setAllPokemons;
        },
        (error) => {
          console.log(error);

          this.apiError = true;
        }
      );
  }

  ngOnInit(): void {
    this.pokeApiService
      .apiListAllPokemons(this.valorInicial, this.valorFinal)
      .subscribe(
        (res) => {
          this.setAllPokemons = res.results;
          this.getAllPokemons = this.setAllPokemons;
        },
        (error) => {
          console.log(error);

          this.apiError = true;
        }
      );
  }

  public getSearch(value: string) {
    const filter = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });
    this.getAllPokemons = filter;
  }
}
