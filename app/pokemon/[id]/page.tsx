import React from "react";
import Pokemon from "@/components/Pokemon";

interface PokemonModalProps {
  params: {
    id: string;
  };
}

export default function PokemonPage({ params }: PokemonModalProps) {
  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-700">
        <Pokemon name={params.id} />
      </div>
    </div>
  );
}
