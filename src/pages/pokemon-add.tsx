import React, { FunctionComponent, useState } from "react";
import PokemonForm from "../components/pokemon-form";
import Pokemon from "../models/pokemon";

const PokemonAdd: FunctionComponent = () => {
	const [id] = useState<number>(new Date().getTime());
	const [pokemon] = useState<Pokemon>(new Pokemon(id));

	return (
		<div className="row">
			<div className="center">
				<h2 className="headers">Ajouter un pokemon</h2>
			</div>
			<PokemonForm pokemon={pokemon} isEditForm = {false}></PokemonForm>
		</div>
	);
};

export default PokemonAdd;