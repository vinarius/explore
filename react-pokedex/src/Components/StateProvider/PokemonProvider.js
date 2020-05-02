import React, { createContext, useReducer, useEffect } from 'react';
import { myReducer } from './myReducer';
import stateActions from './stateActions';

export const MyContext = createContext();
export const PokemonProvider = (props) => {

    const defaultState = {
        wildPokemon: [
            { id: 1, name: 'Bulbasaur'},
            { id: 2, name: 'Squirtle'},
            { id: 3, name: 'Charmander'}
        ],
        capturedPokemon: []
    };

    useEffect(() => {

        async function fetchPokemon () {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon");
            const data = await response.json();
            const sanitizedData = data.results.map((pokemon, index) => {
                return {
                    ...pokemon,
                    id: index + 1
                }
            });
            addPokemons(sanitizedData);
        }

        fetchPokemon();
    }, []);

    const [state, dispatch] = useReducer(myReducer, defaultState);

    const capture = (pokemon) => () => {
        dispatch({ type: stateActions.CAPTURE, pokemon });
    };

    const release = (pokemon) => () => {
        dispatch({ type: stateActions.RELEASE, pokemon });
    };

    const addPokemon = (pokemon) => {
        dispatch({ type: stateActions.ADD_POKEMON, pokemon });
    }

    const addPokemons = (pokemons) => {
        dispatch({ type: stateActions.ADD_POKEMONS, pokemons });
    };

    const { wildPokemon, capturedPokemon } = state;

    const providerValue = {
        wildPokemon,
        capturedPokemon,
        capture,
        release,
        addPokemon,
        addPokemons
    };

    return (
        <MyContext.Provider value={providerValue}>
            {props.children}
        </MyContext.Provider>
    );
};