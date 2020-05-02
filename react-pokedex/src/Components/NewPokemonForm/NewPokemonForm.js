import React, { useState, useContext } from 'react';
import { MyContext } from '../StateProvider/PokemonProvider';

const NewPokemonForm = () => {
    const [pokemonName, setPokemonName] = useState();
    const { addPokemon } = useContext(MyContext);

    const generateID = () => {
        const a = Math
          .random()
          .toString(36)
          .substring(2, 15)
      
        const b = Math
          .random()
          .toString(36)
          .substring(2, 15)
      
        return a + b;
      };

    const handleNameOnChange = (event) => {
        setPokemonName(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        addPokemon({
            id: generateID(),
            name: pokemonName
        });
    };

    return (
        <div className="container">
            <h3>Create New Pokemon</h3>
            <form onSubmit={handleFormSubmit} >
                <input type="text" placeholder="Pokemon name" onChange={handleNameOnChange} />
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default NewPokemonForm;