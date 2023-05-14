"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import Filter from "./Filter";
import { fetchFilteredPokemonByTypes } from "../_actions";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListProps {
  pokemonData: Pokemon[];
  types: { name: string }[];
}

const POKEMON_PER_PAGE = 10;

export default function PokemonList({ pokemonData, types }: PokemonListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPageNumber = parseInt(searchParams.get("page") || "1");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] =
    useState<Pokemon[]>(pokemonData);
  const [page, setPage] = useState(currentPageNumber);

  const totalPages = useMemo(
    () => Math.ceil(filteredPokemonList.length / POKEMON_PER_PAGE),
    [filteredPokemonList]
  );

  const pokemonList = useMemo(
    () =>
      filteredPokemonList.slice(
        (page - 1) * POKEMON_PER_PAGE,
        page * POKEMON_PER_PAGE
      ),
    [filteredPokemonList, page]
  );

  useEffect(() => {
    router.replace(`/?page=${page}`);
  }, [page]);

  useEffect(() => {
    if (selectedTypes.length > 0) {
      fetchFilteredPokemonByTypes(selectedTypes).then(
        (filteredPokemon: Pokemon[]) => {
          setFilteredPokemonList(filteredPokemon);
          setPage(1);
        }
      );
    } else {
      setFilteredPokemonList(pokemonData);
      setPage(1);
    }
  }, [selectedTypes]);

  return (
    <div>
      <Filter
        types={types}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      {pokemonList.map((pokemon: Pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}
