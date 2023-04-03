import { useEffect, useState } from "react";
import "./App.css";

import Card, { Pokemon } from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import { Url, getAllPokemon, getPokemon } from "./utils/pokemon";

type Result = {
  name: string;
  url: Url;
};

type Res = {
  next: Url;
  previous: Url;
  results: Result[];
};

const App = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [nextURL, setNextURL] = useState<Url>();
  const [prevURL, setPrevURL] = useState<Url>();
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemoData = async () => {
      //すべてのポケモンデータを取得
      let res = (await getAllPokemon(initialURL)) as Res;
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      //URLを取得
      setNextURL(res.next);
      setLoading(false);
    };
    fetchPokemoData();
  }, []);

  const loadPokemon = async (data: Result[]) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon: Result) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      }),
    ) as Pokemon[];
    setPokemonData(_pokemonData);
  };

  // console.log(pokemonData);
  const handleNextPage = async () => {
    if (!nextURL) return;
    setLoading(true);
    let data = await getAllPokemon(nextURL) as Res;
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL) as Res;
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
