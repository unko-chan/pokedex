'use client';
import React, { useEffect, useState } from 'react';
import { getPokemonList } from './utils/pokeapi';
import PokemonCard from './components/PokemonCard';
import Pagination from './components/Pagination';

interface Pokemon {
  name: string;
  url: string;
}

const POKEMON_PER_PAGE = 10;

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [count, setCount] = useState(0);
  const offset = (page - 1) * POKEMON_PER_PAGE

  useEffect(() => {
    getPokemonList(offset, POKEMON_PER_PAGE).then(response => {
      console.log(response);
      setCount(response.count);
      setPokemonList(response.results);
      setTotalPages(Math.ceil(response.count / POKEMON_PER_PAGE));
    });
  }, [page]);

  return (
    <div>
      <h1>Pokédex</h1>
      <div>Showing {offset + 1} - {offset + pokemonList.length} of {count}</div>
      <Pagination page={page} totalPages={totalPages} handlePageChange={setPage} />
      <div className="pokemon-list">
        {pokemonList.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Home;
