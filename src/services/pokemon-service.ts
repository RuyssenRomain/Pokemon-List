import Pokemon from "../models/pokemon";
import POKEMONS from "../models/mock-pokemon";

export default class PokemonService {

  static pokemons: Pokemon[] = POKEMONS;

  static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

  static getPokemons(): Promise<Pokemon[]> {
    if(this.isDev) {
      return fetch('http://localhost:3001/pokemons')
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      resolve(this.pokemons);
    });
  }

  static getPokemon(id: number): Promise<Pokemon | null> {
    if(this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${id}`)
        .then(response => response.json())
        .then(data => this.isEmpty(data) ? null : data)
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      const pokemon = this.pokemons.find(pokemon => id === pokemon.id);
      resolve(pokemon ? pokemon : null);
    });
  }

  static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    if(this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
        method: 'PUT',
        body: JSON.stringify(pokemon),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      const index = this.pokemons.findIndex(p => p.id === pokemon.id);
      this.pokemons[index] = pokemon;
      resolve(pokemon);
    });
  }

  static deletePokemon(pokemon: Pokemon): Promise<{}> {
    if(this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      this.pokemons = this.pokemons.filter(p => p.id !== pokemon.id);
      resolve({});
    });
  }

  static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
    if (pokemon.created) {
      delete pokemon.created;
    }

    if(this.isDev) {
      return fetch(`http://localhost:3001/pokemons`, {
        method: 'POST',
        body: JSON.stringify(pokemon),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

    return new Promise(resolve => {
      this.pokemons.push(pokemon);
      resolve(pokemon);
    });
  }

  static searchPokemon(term: string): Promise<Pokemon[]> {
    return new Promise((resolve) => {
    const filteredPokemons = this.pokemons.filter(pokemon =>
    pokemon.name.toUpperCase().includes(term.toUpperCase())
    );
    resolve(filteredPokemons);
    });
    }
  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error);
  }
}
