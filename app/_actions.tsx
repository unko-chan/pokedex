"use server";

import { PokemonClient } from "pokenode-ts";
import axios from "axios";

const api = new PokemonClient();

interface PokemonItem {
  pokemon: {
    name: string;
  };
}

interface Pokemon {
  name: string;
  url: string;
}

export async function fetchAllPokemon(): Promise<any> {
  try {
    const response = await api.listPokemons(0, 810);
    const data = await response.results;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchPokemonByName(name: string): Promise<any> {
  try {
    const response = await api.getPokemonByName(name);
    const data = await response;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAllTypes(): Promise<any> {
  try {
    const response = await api.listTypes();
    const types = response.results.filter(
      (type: { name: string }) =>
        type.name !== "unknown" && type.name !== "shadow"
    );
    return types;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchPokemonByType(type: string): Promise<any> {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.data.pokemon;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchFilteredPokemonByTypes(
  types: string[]
): Promise<Pokemon[]> {
  const responses = await Promise.all(
    types.map((type) => fetchPokemonByType(type))
  );

  const nameCounts: Record<string, number> = {};
  responses.forEach((response) => {
    response.forEach((pokemonItem: PokemonItem) => {
      if (nameCounts[pokemonItem.pokemon.name]) {
        nameCounts[pokemonItem.pokemon.name]++;
      } else {
        nameCounts[pokemonItem.pokemon.name] = 1;
      }
    });
  });

  const filteredNames = Object.keys(nameCounts).filter(
    (name) => nameCounts[name] === types.length
  );

  const allPokemons = await fetchAllPokemon();
  const filteredPokemons = allPokemons.filter((pokemon: Pokemon) =>
    filteredNames.includes(pokemon.name)
  );

  return filteredPokemons;
}
