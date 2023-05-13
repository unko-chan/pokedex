const API_URL = "https://pokeapi.co/api/v2/";

async function getAllPokemon(): Promise<any> {
  try {
    const response = await fetch(`${API_URL}pokemon?limit=810`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getPokemonDetails(pokemon: string | number): Promise<any> {
  try {
    const response = await fetch(`${API_URL}pokemon/${pokemon}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getAllPokemonTypes(): Promise<any> {
  try {
    const response = await fetch(`${API_URL}type`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { getAllPokemon, getPokemonDetails, getAllPokemonTypes };
