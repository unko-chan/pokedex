import React from "react";
import { fetchAllPokemon, fetchAllTypes } from "./_actions";
import PokemonList from "./_components/PokemonList";

export default async function Home() {
  const pokemonData = await fetchAllPokemon();
  const types = await fetchAllTypes();

  return (
    <div>
      <h1>Pokédex</h1>
      <PokemonList pokemonData={pokemonData} types={types} />
    </div>
  );
}
