import Pokemon from "../models/pokemon";

export default class PokemonService {
  static pokemons: Pokemon[] = [];

  static getPokemons(): Promise<Pokemon[]> {
    return fetch('http://localhost:3001/pokemons')
      .then(response => response.json())
      .then(data => {
        this.pokemons = data; // Stocke les Pokémon dans la propriété de classe
        return data;
      })
      .catch(error => this.handleError(error));
  }

  static getPokemon(id: number): Promise<Pokemon | null> {
    return fetch(`http://localhost:3001/pokemons/${id}`)
      .then(response => response.json())
      .then(data => this.isEmpty(data) ? null : data)
      .catch(error => this.handleError(error));
  }

  static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
      method: 'PUT',
      body: JSON.stringify(pokemon),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .catch(error => this.handleError(error));
  }

  static deletePokemon(pokemon: Pokemon): Promise<{}> {
    return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .catch(error => this.handleError(error));
  }

  static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
    if (pokemon.created) {
      delete pokemon.created;
    }

    return fetch(`http://localhost:3001/pokemons/`, {
      method: 'POST',
      body: JSON.stringify(pokemon),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .catch(error => this.handleError(error));
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
