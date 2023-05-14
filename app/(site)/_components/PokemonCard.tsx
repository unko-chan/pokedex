import React from "react";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: {
    name: string;
    url: string;
  };
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const pokemonIndex = pokemon.url.split("/")[6];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`;

  return (
    <div>
      <Image priority={true} src={imageUrl} alt={pokemon.name} width="128" height="128" />
      <div>{pokemon.name}</div>
    </div>
  );
};

export default PokemonCard;
