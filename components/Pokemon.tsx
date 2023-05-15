"use client";

import React, { useEffect, useState } from "react";
import { fetchPokemonByName } from "@/app/_actions";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

  if (!pokemon) {
    return <></>;
  }

  const pokemonTypes = pokemon.types.map((type) => type.type.name).join(", ");
  const pokemonAbilities = pokemon.abilities
    .map((ability) => ability.ability.name)
    .join(", ");
  const pokemonIndex = pokemon.id;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`;

  const pokemonDetails = [
    { name: "Type", value: pokemonTypes },
    { name: "Abilities", value: pokemonAbilities },
  ];

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          #{pokemon.id} {pokemon.name}
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <Image
          className="mx-auto"
          priority={true}
          src={imageUrl}
          alt={pokemon.name}
          width="256"
          height="256"
        />
        <Separator className="my-4" />
        <div>
          <div>
            {pokemonDetails.map((detail) => (
              <>
                <div>
                  <div className="text-lg font-semibold leading-none tracking-tight">
                    {detail.name}
                  </div>
                  <p>{detail.value}</p>
                </div>
                <Separator className="my-4" />
              </>
            ))}
          </div>
          <div>
            <div className="text-lg font-semibold leading-none tracking-tight">
              Stats
            </div>
            {pokemon.stats.map((stat, index) => (
              <div key={index}>
                <div className="space-y-1">
                  <p>
                    {stat.stat.name}: {stat.base_stat}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
