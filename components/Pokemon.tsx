"use client";
import React, { useEffect, useState } from "react";
import { fetchPokemonByName } from "@/app/_actions";
import Image from "next/Image";

interface PokemonData {
  image: string;
  name: string;
  id: number;
  abilities: Abilities[];
  stats: Stats[];
  types: Types[];
}

interface Abilities {
  ability: {
    name: string;
  };
}

interface Stats {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Types {
  type: {
    name: string;
  };
}

export default function Pokemon({ name }: any) {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonData = await fetchPokemonByName(name);
      setPokemon(pokemonData);
    };

    fetchPokemon();
  }, [name]);

  // If pokemon data has not yet been fetched, render a loading message
  if (!pokemon) {
    return <div>Loading...</div>;
  }

  // Map over the nested objects and extract the names
  const pokemonTypes = pokemon.types.map((type) => type.type.name).join(", ");
  const pokemonAbilities = pokemon.abilities
    .map((ability) => ability.ability.name)
    .join(", ");
  const pokemonStats = pokemon.stats
    .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
    .join(", ");
  const pokemonIndex = pokemon.id;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`;

  return (
    <div>
      <div>{pokemon.name}</div>
      <div>{pokemon.id}</div>
      <Image
        priority={true}
        src={imageUrl}
        alt={pokemon.name}
        width="256"
        height="256"
      />
      <div>Types: {pokemonTypes}</div>
      <div>Abilities: {pokemonAbilities}</div>
      <div>Stats: {pokemonStats}</div>
    </div>
  );
}
