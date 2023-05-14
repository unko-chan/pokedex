import { PokemonClient } from "pokenode-ts";
import axios from "axios";

async function getPokemonList(offset: number, limit: number): Promise<any> {
  const api = new PokemonClient();
  try {
    const response = await api.listPokemons(offset, limit);
    const data = await response;
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getAllPokemon(): Promise<any> {
  const api = new PokemonClient();
  try {
    const response = await api.listPokemons(0, -1);
    const data = await response;
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getPokemonByType(type: string): Promise<any> {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.data.pokemon;
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getPokemon(id: number): Promise<any> {
  const api = new PokemonClient();
  try {
    const response = await api.getPokemonById(id);
    const data = await response;
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getTypes(): Promise<any> {
  const api = new PokemonClient();
  try {
    const response = await api.listTypes();
    const data = await response;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export {
  getPokemon,
  getPokemonList,
  getTypes,
  getAllPokemon,
  getPokemonByType,
};
