import { PokemonClient, Constants } from "pokenode-ts";

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

export { getPokemon, getPokemonList, getTypes };
