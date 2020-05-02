import stateActions from './stateActions';

export const myReducer = (state, action) => {
    switch(action.type) {
        case stateActions.CAPTURE:
            return capturePokemon(state, action.pokemon);
        case stateActions.RELEASE:
            return releasePokemon(state, action.pokemon);
        case stateActions.ADD_POKEMON:
            return addPokemon(state, action.pokemon);
        case stateActions.ADD_POKEMONS:
            return addPokemons(state, action.pokemons);
        default:
            return state;
    }
};

const capturePokemon = (state, capturedPokemon) => ({
    wildPokemon: state.wildPokemon.filter(pokemon => pokemon !== capturedPokemon),
    capturedPokemon: [...state.capturedPokemon, capturedPokemon]
});

const releasePokemon = (state, releasedPokemon) => ({
    wildPokemon: [...state.wildPokemon, releasedPokemon],
    capturedPokemon: state.capturedPokemon.filter(pokemon => pokemon !== releasedPokemon)
});

const addPokemon = (state, newPokemon) => ({
    ...state,
    wildPokemon: [...state.wildPokemon, newPokemon],
});

const addPokemons = (state, newPokemons) => ({
    ...state,
    wildPokemon: newPokemons
});