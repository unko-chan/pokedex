import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

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
    <Card className="max-w-fit aspect-square">
      <Link key={pokemon.name} href={`/pokemon/${pokemon.name}?${params}`}>
        <CardContent>
          <Image
            priority={true}
            src={imageUrl}
            alt={pokemon.name}
            width="180"
            height="180"
          />
        </CardContent>
        <CardFooter className="justify-center">
          <CardTitle>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </CardTitle>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default PokemonCard;
