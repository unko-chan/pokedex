import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PokemonCardProps {
  pokemon: {
    name: string;
    url: string;
  };
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const searchParams = useSearchParams();
  const pokemonIndex = pokemon.url.split("/")[6];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`;
  const params = new URLSearchParams(searchParams.toString());

  return (
    <Link key={pokemon.name} href={`/pokemon/${pokemon.name}?${params}`}>
      <Image
        priority={true}
        src={imageUrl}
        alt={pokemon.name}
        width="128"
        height="128"
      />
      <div>{pokemon.name}</div>
    </Link>
  );
};

export default PokemonCard;
