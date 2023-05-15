"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import Filter from "./Filter";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListProps {
  pokemonData: Pokemon[];
  types: { name: string }[];
  filteredPokemon: Pokemon[];
}

const POKEMON_PER_PAGE = 9;

export default function Client({
  pokemonData,
  types,
  filteredPokemon,
}: PokemonListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [pokemonList, setPokemonList] = useState<Pokemon[]>(pokemonData);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const filterFromUrl = searchParams.get("filter");
    const selectedTypesFromUrl = filterFromUrl ? filterFromUrl.split(",") : [];
    setSelectedTypes(selectedTypesFromUrl);

    const pageNumberFromUrl = parseInt(searchParams.get("page") || "1");
    setPage(pageNumberFromUrl);

    if (filterFromUrl) {
      setPokemonList(filteredPokemon);
    } else {
      setPokemonList(pokemonData);
    }
  }, [searchParams, filteredPokemon, pokemonData]);

  const totalPages = useMemo(() => {
    return Math.ceil(pokemonList.length / POKEMON_PER_PAGE);
  }, [pokemonList]);

  const displayedPokemon = useMemo(() => {
    const start = (page - 1) * POKEMON_PER_PAGE;
    const end = start + POKEMON_PER_PAGE;
    return pokemonList.slice(start, end);
  }, [pokemonList, page]);

  const updateURLParams = useCallback(
    (params: string | URLSearchParams) => {
      router.replace(pathname + "?" + params.toString());
    },
    [router, pathname]
  );

  const updateSearchParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      const newSelectedTypes = updateSelectedTypes(selectedTypes, value);
      setSelectedTypes(newSelectedTypes);

      if (newSelectedTypes.length === 0) {
        params.delete("filter");
      } else {
        params.set(name, newSelectedTypes.join(","));
      }
      params.set("page", "1");

      updateURLParams(params);
    },
    [searchParams, selectedTypes, updateURLParams]
  );

  const updatePageParam = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      updateURLParams(params);
    },
    [searchParams, updateURLParams]
  );

  return (
    <div>
      <Filter
        types={types}
        selectedTypes={selectedTypes}
        updateSearchParam={updateSearchParam}
      />
      <div className="text-lg font-semibold leading-none tracking-tight">
        Page {page} of {totalPages}
        <br />
        Showing {POKEMON_PER_PAGE} of {pokemonList.length}
      </div>
      <div className="justify-items-center items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 auto-rows-max gap-3 m-1">
        {displayedPokemon.map((pokemon: Pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Pagination
          page={page}
          setPage={updatePageParam}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

const updateSelectedTypes = (selectedTypes: string[], value: string) => {
  return selectedTypes.includes(value)
    ? selectedTypes.filter((type) => type !== value)
    : [...selectedTypes, value];
};
