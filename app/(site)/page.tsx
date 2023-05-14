'use client';
import React, { useEffect, useState } from 'react';
import { getPokemonList } from './utils/pokeapi';
import PokemonCard from './components/PokemonCard';

interface Pokemon {
  name: string;
  url: string;
}

const Home: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const limit = 10

  useEffect(() => {
    getPokemonList(offset, limit).then(response => {
      console.log(response);
      setPokemonList(response.results);
    });
  }, []);

  return (
    <div>
      <h1>Pokédex</h1>
      <div className="pokemon-list">
        {pokemonList.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Home;
