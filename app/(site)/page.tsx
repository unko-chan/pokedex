"use client";

import React, { useEffect, useState } from "react";
import {
  fetchAllPokemon,
  fetchAllTypes,
  fetchFilteredPokemonByTypes,
} from "./_actions";
import PokemonCard from "./_components/PokemonCard";
import Pagination from "./_components/Pagination";
import Filter from "./_components/Filter";

interface Pokemon {
  name: string;
  url: string;
}

interface Types {
  name: string;
  url: string;
}

const POKEMON_PER_PAGE = 10;

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [currentPokemonList, setCurrentPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<Types[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [count, setCount] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const offset = (page - 1) * POKEMON_PER_PAGE;

  useEffect(() => {
    fetchAllPokemon().then((pokemon) => {
      setPokemonList(pokemon);
      setFilteredPokemonList(pokemon);
      setCount(pokemon.length);
      setTotalPages(Math.ceil(pokemon.length / POKEMON_PER_PAGE));
    });

    fetchAllTypes().then((types) => {
      setTypes(types);
    });
  }, []);

  useEffect(() => {
    if (selectedTypes.length > 0) {
      fetchFilteredPokemonByTypes(selectedTypes).then(
        (filteredPokemon: Pokemon[]) => {
          setFilteredPokemonList(filteredPokemon);
        }
      );
    } else {
      setFilteredPokemonList(pokemonList);
    }
  }, [selectedTypes]);

  useEffect(() => {
    const pokemonOnPage = filteredPokemonList.slice(
      offset,
      offset + POKEMON_PER_PAGE
    );
    setCurrentPokemonList(pokemonOnPage);
  }, [page, offset, filteredPokemonList]);

  return (
    <div>
      <h1>Pokédex</h1>
      <Filter
        types={types}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
      />
      <div>
        Showing {offset + 1} - {offset + currentPokemonList.length} of {count}
      </div>
      <div>
        Page {page} of {totalPages}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePageChange={setPage}
      />
      <div className="pokemon-list">
        {currentPokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Home;
