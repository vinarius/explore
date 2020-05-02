import React from 'react';
import './App.css';

import { PokemonProvider } from './Components/StateProvider/PokemonProvider';
import WildPokemon from './Components/WildPokemon/WildPokemon';
import CapturedPokemon from './Components/CapturedPokemon/CapturedPokemon';
import NewPokemonForm from './Components/NewPokemonForm/NewPokemonForm';

function App() {

  return (
    <PokemonProvider>
      <div className="App">
        <WildPokemon />
        <CapturedPokemon />
        <NewPokemonForm />
      </div>
    </PokemonProvider>
  );
}

export default App;
