import React from "react";

interface PokemonModalProps {
  pokemon: PokemonData;
  onClose: () => void;
}

interface PokemonData {
  image: string;
  name: string;
  id: number;
  abilities: Ability[];
  stats: Stat[];
  types: PokemonType[];
}

interface Ability {
  name: string;
  is_hidden: boolean;
  slot: number;
}

interface Stat {
  name: string;
  base_stat: number;
}

interface PokemonType {
  type: string;
}

const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, onClose }) => {
  const pokemonTypes = pokemon.types.map((type) => type.type).join(", ");
  const pokemonAbilities = pokemon.abilities.map((ability) => ability.name).join(", ");
  const pokemonStats = pokemon.stats.map((stat) => stat.name).join(", ");
  return (
    <div>
      <div>{pokemon.name}</div>
      <div>{pokemon.id}</div>
      <div>{pokemon.image}</div>
      <div>{pokemonTypes}</div>
      <div>{pokemonAbilities}</div>
      <div>{pokemonStats}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PokemonModal;
