import React, { useState, useContext } from 'react';
import './CapturedPokemon.css';
import { MyContext } from '../StateProvider/PokemonProvider';

const CapturedPokemon = () => {

    const {
        capturedPokemon,
        release
    } = useContext(MyContext);

    return (
        <div className="container">
            <h3>Captured Pokemon</h3>
            {capturedPokemon.map((pokemon) =>
              <div key={`${pokemon.id}-${pokemon.name}`} style={{display: 'flex'}}>
                <p className="margin-right-half">{pokemon.id}</p>
                <p className="margin-right-half">{pokemon.name}</p>
                <button className="release-button" onClick={release(pokemon)}>-</button>
              </div>
            )}
          </div>
    );
}

export default CapturedPokemon;