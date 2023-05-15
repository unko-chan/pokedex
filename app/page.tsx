import React, { Suspense } from "react";
import {
  fetchAllPokemon,
  fetchAllTypes,
  fetchFilteredPokemonByTypes,
} from "./_actions";
import Client from "@/components/Client";

interface Pokemon {
  name: string;
  url: string;
}

export default async function Home({ searchParams }: { searchParams: any }) {
  const pokemonData = await fetchAllPokemon();
  const types = await fetchAllTypes();
  const filterParam = searchParams.filter;
  let filteredPokemon: Pokemon[] = [];

  if (filterParam) {
    const selectedTypes = filterParam.split(",");
    filteredPokemon = await fetchFilteredPokemonByTypes(selectedTypes);
  }

  return (
    <main>
      <div>
        <Client
          pokemonData={pokemonData}
          filteredPokemon={filteredPokemon}
          types={types}
        />
      </div>
    </main>
  );
}
