import './App.css';
import Navbar from './components/Navbar/index.js';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import { getPokemonData, getPokemons } from './api';
import {useState, useEffect} from "react";
import { FavoriteProvider } from './contexts/favoritesContext';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(["raichu"]);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(25, 25 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 25))
    } catch(err){

    }
  }

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const updateFavoritePokemons = (name) => {
    const updated = [...favorites];
    const isFavorite = favorites.indexOf(name);
    if(isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }
    setFavorites(updated);

    };

  return (
    <FavoriteProvider value={{
      favoritePokemons: favorites, 
      updateFavoritePokemons: updateFavoritePokemons,
       }}>
    <div>
      <Navbar/>
    
      <div className="App">
        <Searchbar />
        <Pokedex loading={loading} pokemons={pokemons} page={page} setPage={setPage} total={total}/>
      </div>
    </div>
    </FavoriteProvider>
  );
}

export default App;
