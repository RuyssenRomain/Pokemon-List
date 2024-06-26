import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';
import PokemonService from '../services/pokemon-service';
import Loader from '../components/loader';
 
type Params = { id: string };
  
const PokemonEdit: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    
  const [pokemon, setPokemon] = useState<Pokemon|null>(null);
  

	// useEffect(() => {
  //   PokemonService.getPokemon(+match.params.id).then(data => setPokemon(data));
	// }, [match.params.id]);
  useEffect(() => {
    PokemonService.getPokemon(+match.params.id).then(data => {
      console.log(data); // Ajoutez cette ligne pour vérifier les données
      setPokemon(data);
    });
  }, [match.params.id]);
  
  return (
    <div>
      { pokemon ? (
        <div className="row">
            <h2 className="header center">Éditer { pokemon.name }</h2>
            <PokemonForm pokemon={pokemon} isEditForm = {true}></PokemonForm>
        </div>
      ) : (
        <h4 className="center"><Loader/></h4>
      )}
    </div>
  );
}
  
export default PokemonEdit;