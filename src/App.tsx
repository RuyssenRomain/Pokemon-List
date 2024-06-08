import React, { FunctionComponent } from "react";
import PokemonList from "./pages/pokemon-list";
import PokemonsDetail from "./pages/pokemon-detail";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PageNotFound from "./pages/page-not-found";

const App: FunctionComponent = () => {
	return (
		<Router>
			<div>
				{/* la barre de navigation commune à toutes les pages*/}
				<nav>
					<div className="nav-wrapper teal">
						<Link to="/" className="brand-logo center">
							Pokédex
						</Link>
					</div>
				</nav>
				{/* le systeme de gestion des routes de notre application*/}
				<Switch>
					<Route exact path="/" 				component={PokemonList} />
					<Route exact path="/Pokemons"		component={PokemonList} />
					<Route exact path="/Pokemons/:id" 	component={PokemonsDetail} />
					<Route 				component = {PageNotFound}/>
				</Switch>
			</div>
		</Router>
	);
};
export default App;
