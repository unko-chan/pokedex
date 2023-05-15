import React from "react";
import { fetchAllPokemon, fetchAllTypes, fetchFilteredPokemonByTypes } from "./_actions";
import PokemonList from "./_components/Client";

interface Pokemon {
  name: string;
  url: string;
}

export default async function Home({ searchParams }: { searchParams: any }) {
  const pokemonData = await fetchAllPokemon();
  const types = await fetchAllTypes();
  const filterParam = searchParams.filter
  let filteredPokemon: Pokemon[] = [];

  if (filterParam) {
    const selectedTypes = filterParam.split(",");
    filteredPokemon = await fetchFilteredPokemonByTypes(selectedTypes);
  }

  return (
    <div>
      <h1>Pokédex</h1>
      <PokemonList pokemonData={pokemonData} filteredPokemon={filteredPokemon} types={types} />
    </div>
  );
}
