import { Url } from "../../utils/pokemon";
import "./Card.css";

type PokemonType = {
  type: { name: string; url: Url };
};

export type Pokemon = {
  name: string;
  weight: number;
  height: number;
  sprites: any; //TODO:適切な型定義
  types: any; //TODO:適切な型定義
  abilities: any; //TODO:適切な型定義
};

const Card = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        {pokemon.types.map((type: PokemonType) => {
          return (
            <div key={type.type.name}>
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">weight：{pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">height：{pokemon.height}</p>
        </div>
        <div className="cardData">
          <p className="title">ability：{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
