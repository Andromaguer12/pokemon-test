/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPokemon } from '../../../../../typesDefs/constants/app/pokemons/pokemons.types';

type initialStateType = {
  getPokemons: {
    loadingPokemons: boolean;
    dataPokemons: IPokemon[];
    pageInfoPokemons: any;
    errorPokemons: null | any;
  };
  getPokemonById: {
    loadingPokemonById: boolean;
    currentPokemon: IPokemon | null;
    errorPokemonById: null | any;
  };
};

const initialState: initialStateType = {
  getPokemons: {
    loadingPokemons: false,
    dataPokemons: [],
    pageInfoPokemons: null,
    errorPokemons: null
  },
  getPokemonById: {
    loadingPokemonById: false,
    currentPokemon: null,
    errorPokemonById: null
  }
};

/**
 * extraReducers start
 */

export const getAllPokemons = createAsyncThunk(
  'home/getAllPokemons',
  async (params: any, { rejectWithValue }) => {
    const page =
      (params?.offset - 1 === -1 ? 0 : params?.offset - 1) * 15 +
      (params?.offset > 0 ? 1 : 0);

    console.log('entro aqui offset', params?.offset);

    const query = await params.context.getAllPokemons(page);
    const response = await query.json();
    if (query.status > 202) {
      return rejectWithValue(response?.message);
    }

    const resultsPromises = response.results.map(
      (pok: { name: string; url: string }) => {
        return new Promise((res, rej) => {
          params.context
            .getDataFromCompleteURL(pok.url)
            .then((pkm) => {
              pkm
                .json()
                .then((responsepkm) => {
                  params.context
                    .getDataFromCompleteURL(responsepkm.species.url)
                    .then((result) => result.json())
                    .then((responsesp) => {
                      res({
                        ...responsepkm,
                        species: responsesp
                      });
                    })
                    .catch((errsp) => {
                      rej(errsp);
                    });
                })
                .catch((errpkm) => {
                  rej(errpkm);
                });
            })
            .catch((err) => {
              rej(err);
            });
        });
      }
    );

    const results = await Promise.all(resultsPromises);

    const totalPages = Math.round(response.count / 15);

    return {
      ...response,
      results,
      totalPages
    };
  }
);

export const getPokemonById = createAsyncThunk(
  'home/getPokemonById',
  async (params: { context: any; pokemonId: string }, { rejectWithValue }) => {
    const query = await params.context.getPokemonById(params.pokemonId);
    const response = await query.json();
    if (query.status > 202) {
      return rejectWithValue(response?.message);
    }
    const types = response.types.map((type) => type.type.name);
    const weaknesses = {};

    Promise.all(
      types.map((type) =>
        params.context.getDataFromCompleteURL(
          `https://pokeapi.co/api/v2/type/${type}`
        )
      )
    )
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((typeData) => {
        typeData.forEach((data, i) => {
          weaknesses[types[i]] = data.damage_relations.double_damage_from.map(
            (type) => type.name
          );
        });
      });

    const speciesPromise = await params.context.getDataFromCompleteURL(
      response.species.url
    );
    const species = await speciesPromise.json();

    return {
      ...response,
      species,
      weaknesses: Object.values(weaknesses).flat()
    };
  }
);

/**
 * extraReducers end
 */

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    clearPokemons: (state) => {
      state.getPokemons = initialState.getPokemons;
    },
    clearPokemonById: (state) => {
      state.getPokemonById = initialState.getPokemonById;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPokemons.pending, (state) => {
      state.getPokemons.loadingPokemons = true;
      state.getPokemons.dataPokemons = [];
    });
    builder.addCase(getAllPokemons.fulfilled, (state, action) => {
      const { results, ...rest } = action.payload;

      state.getPokemons.loadingPokemons = false;
      state.getPokemons.dataPokemons = results;
      state.getPokemons.pageInfoPokemons = rest;
      state.getPokemons.errorPokemons = '';
    });
    builder.addCase(getAllPokemons.rejected, (state, action) => {
      state.getPokemons.loadingPokemons = false;
      state.getPokemons.errorPokemons = action.payload as string;
    });

    builder.addCase(getPokemonById.pending, (state) => {
      state.getPokemonById.loadingPokemonById = true;
      state.getPokemonById.currentPokemon = null;
    });
    builder.addCase(getPokemonById.fulfilled, (state, action) => {
      state.getPokemonById.loadingPokemonById = false;
      state.getPokemonById.currentPokemon = action.payload;
      state.getPokemons.dataPokemons = [action.payload];
      state.getPokemonById.errorPokemonById = '';
    });
    builder.addCase(getPokemonById.rejected, (state, action) => {
      state.getPokemonById.loadingPokemonById = false;
      state.getPokemonById.errorPokemonById = action.payload as string;
    });
  }
});

export const { clearPokemons, clearPokemonById } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
