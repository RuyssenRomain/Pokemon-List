import React, { FunctionComponent, useState } from "react";
import PokemonForm from "../components/pokemon-form";
import Pokemon from "../models/pokemon";

const PokemonAdd: FunctionComponent = () => {
	const [id] = useState<number>(new Date().getTime());
	const [pokemon] = useState<Pokemon>(new Pokemon(id));

	return (
		<div className="row">
			<div className="header center">Ajouter un pokemon</div>
			<PokemonForm pokemon={pokemon}></PokemonForm>
		</div>
	);
};

export default PokemonAdd;