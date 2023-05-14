"use client";
import React, { use, useEffect, useState } from "react";
import {
  getPokemonList,
  getAllPokemon,
  getPokemonByType,
  getTypes,
} from "./utils/pokeapi";
import PokemonCard from "./components/PokemonCard";
import Pagination from "./components/Pagination";
import Filter from "./components/Filter";

interface Pokemon {
  name: string;
  url: string;
  types: [{ name: string }];
}

interface Types {
  name: string;
  url: string;
}

interface PokemonItem {
  pokemon: {
    name: string;
  };
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
    getAllPokemon().then((response) => {
      setPokemonList(response.results);
      setFilteredPokemonList(response.results);
      setCount(response.count);
      setTotalPages(Math.ceil(response.count / POKEMON_PER_PAGE));
    });

    getTypes().then((response) => {
      setTypes(response.results);
    });
  }, []);

  useEffect(() => {
    if (selectedTypes.length > 0) {
      const promises = selectedTypes.map((type) => getPokemonByType(type));

      Promise.all(promises).then((typeResponses) => {
        const filteredNamesSet = new Set();

        typeResponses.forEach((response) => {
          response.forEach((pokemonItem: PokemonItem) =>
            filteredNamesSet.add(pokemonItem.pokemon.name)
          );
        });

        const filteredNames = Array.from(filteredNamesSet);

        const filteredPokemon = pokemonList.filter((pokemon) =>
          filteredNames.includes(pokemon.name)
        );
        setFilteredPokemonList(filteredPokemon);
      });
    } else {
      setFilteredPokemonList(pokemonList);
    }
  }, [selectedTypes]);

  useEffect(() => {
    const pokemonOnPage = filteredPokemonList.slice(offset, offset + POKEMON_PER_PAGE);
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
