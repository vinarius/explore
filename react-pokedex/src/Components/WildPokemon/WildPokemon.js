import React, { useContext } from 'react';
import { MyContext } from '../StateProvider/PokemonProvider';
import './WildPokemon.css';

const WildPokemon = () => {

    const {
      wildPokemon,
      capture
    } = useContext(MyContext);

    return (
        <div className="container">
          <h3>Wild Pokemon</h3>
            {wildPokemon.map((pokemon) =>
              <div key={`${pokemon.id}-${pokemon.name}`} style={{display: 'flex'}}>
                <p className="margin-right-half">{pokemon.id}</p>
                <p className="margin-right-half">{pokemon.name}</p>
                <button className="capture-button" onClick={capture(pokemon)}>+</button>
              </div>
            )}
        </div>
    );
}

export default WildPokemon;