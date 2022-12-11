import { useEffect } from "react";
import "./App.css";
import { getAllPokemon } from "./utils/pokemon";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchPokemoData = async () => {
      //すべてのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      console.log(res);
    };
    fetchPokemoData();
  }, []);

  return <div className="App"></div>;
}

export default App;
