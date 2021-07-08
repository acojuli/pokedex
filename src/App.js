import './App.css';
import Navbar from './components/Navbar/index.js';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import { getPokemonData, getPokemons } from './api';
import {useState, useEffect} from "react";

function App() {
  const [pokemons, setPokemons] = useState([])

  const fetchPokemons = async () => {
    try {
      const data = await getPokemons();
      console.log(data.results);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results);
    } catch(err){

    }
  }

  useEffect(() => {
    fetchPokemons();

  }, []);


  return (
    <div className="App">
      <Navbar/>
      <Searchbar />
      <Pokedex pokemons={pokemons} />
    </div>
  );
}

export default App;
