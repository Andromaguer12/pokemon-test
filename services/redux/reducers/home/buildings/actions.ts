/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PokemonCard } from '../../../../../typesDefs/constants/app/pokemons/pokemons.types';

type initialStateType = {
  getPokemons: {
    loadingPokemons: boolean;
    dataPokemons: PokemonCard[];
    pageInfoPokemons: any;
    errorPokemons: null | any;
  },
  getPokemonById: {
    loadingPokemonById: boolean;
    currentPokemon: PokemonCard | null;
    errorPokemonById: null | any;
  }
  createPokemon: {
    loadingCreatePokemon: boolean,
    successCreatePokemon: boolean,
    errorCreatePokemon: null | any,
  },
  updatePokemonById: {
    loadingUpdatePokemon: boolean,
    successUpdatePokemon: boolean,
    errorUpdatePokemon: null | any,
  },
  deletePokemonById: {
    loadingDeletePokemon: boolean,
    successDeletePokemon: boolean,
    errorDeletePokemon: null | any,
  }
};


const initialState: initialStateType = {
  getPokemons: {
    loadingPokemons: false,
    dataPokemons: [],
    pageInfoPokemons: null,
    errorPokemons: null,
  },
  getPokemonById: {
    loadingPokemonById: false,
    currentPokemon: null,
    errorPokemonById: null,
  },
  createPokemon: {
    loadingCreatePokemon: false,
    successCreatePokemon: false,
    errorCreatePokemon: null,
  },
  updatePokemonById: {
    loadingUpdatePokemon: false,
    successUpdatePokemon: false,
    errorUpdatePokemon: null,
  },
  deletePokemonById: {
    loadingDeletePokemon: false,
    successDeletePokemon: false,
    errorDeletePokemon: null,
  }
};

/**
 * extraReducers start
 */

export const getAllPokemons = createAsyncThunk(
  'home/getAllPokemons',
  async (params: any, { rejectWithValue }) => {
    const query = await params.context.getAllPokemons(params?.filters);
    const response = await query.json();
    if (query.status > 202) {
      return rejectWithValue(response?.message);
    }
    return response;
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
    return response;
  }
);

export const createPokemon = createAsyncThunk(
  'pokemons/createPokemon',
  async (params: any, { rejectWithValue }) => {
    const response = await params.context.createPokemon(params.body);
    const data = await response.json();
    if (response.status > 202) {
      return rejectWithValue(data?.message);
    }
    return data;
  }
);

export const updatePokemonById = createAsyncThunk(
  'pokemons/updatePokemonById',
  async (params: any, { rejectWithValue }) => {
    const response = await params.context.updatePokemonById(params.projectId, params.body);
    const data = await response.json();
    if (response.status > 202) {
      return rejectWithValue(data?.message);
    }
    return data;
  }
);

export const deletePokemonById = createAsyncThunk(
  'pokemons/deletePokemonById',
  async (params: any, { rejectWithValue }) => {
    const response = await params.context.deletePokemonById(params.projectId);
    if (response.status > 202) {
      return rejectWithValue('Error al eliminar el edificio');
    }
    return response;
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
      state.getPokemons = initialState.getPokemons
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPokemons.pending, (state) => {
      state.getPokemons.loadingPokemons = true;
    });
    builder.addCase(getAllPokemons.fulfilled, (state, action) => {
      const { projects, ...rest } = action.payload;

      state.getPokemons.loadingPokemons = false;
      state.getPokemons.dataPokemons = projects;
      state.getPokemons.pageInfoPokemons = rest;
      state.getPokemons.errorPokemons = '';
    });
    builder.addCase(getAllPokemons.rejected, (state, action) => {
      state.getPokemons.loadingPokemons = false;
      state.getPokemons.errorPokemons = action.payload as string;
    });

    builder.addCase(getPokemonById.pending, (state) => {
      state.getPokemonById.loadingPokemonById = true;
    });
    builder.addCase(getPokemonById.fulfilled, (state, action) => {
      state.getPokemonById.loadingPokemonById = false;
      state.getPokemonById.currentPokemon = action.payload;
      state.getPokemonById.errorPokemonById = '';
    });
    builder.addCase(getPokemonById.rejected, (state, action) => {
      state.getPokemonById.loadingPokemonById = false;
      state.getPokemonById.errorPokemonById = action.payload as string;
    });

    // Casos para createPokemon
    builder.addCase(createPokemon.pending, (state) => {
      state.createPokemon.loadingCreatePokemon = true;
    });
    builder.addCase(createPokemon.fulfilled, (state, action) => {
      state.createPokemon.loadingCreatePokemon = false;
      state.createPokemon.successCreatePokemon = action.payload;
      state.createPokemon.errorCreatePokemon = '';
    });
    builder.addCase(createPokemon.rejected, (state, action) => {
      state.createPokemon.loadingCreatePokemon = false;
      state.createPokemon.errorCreatePokemon = action.payload as string;
    });

    // Casos para updatePokemonById
    builder.addCase(updatePokemonById.pending, (state) => {
      state.updatePokemonById.loadingUpdatePokemon = true;
    });
    builder.addCase(updatePokemonById.fulfilled, (state, action) => {
      state.updatePokemonById.loadingUpdatePokemon = false;
      state.updatePokemonById.successUpdatePokemon = action.payload;
      state.updatePokemonById.errorUpdatePokemon = '';
    });
    builder.addCase(updatePokemonById.rejected, (state, action) => {
      state.updatePokemonById.loadingUpdatePokemon = false;
      state.updatePokemonById.errorUpdatePokemon = action.payload as string;
    });

    // Casos para deletePokemonById
    builder.addCase(deletePokemonById.pending, (state) => {
      state.deletePokemonById.loadingDeletePokemon = true;
    });
    builder.addCase(deletePokemonById.fulfilled, (state, action) => {
      state.deletePokemonById.loadingDeletePokemon = false;
      state.deletePokemonById.successDeletePokemon = action.payload;
      state.deletePokemonById.errorDeletePokemon = '';
    });
    builder.addCase(deletePokemonById.rejected, (state, action) => {
      state.deletePokemonById.loadingDeletePokemon = false;
      state.deletePokemonById.errorDeletePokemon = action.payload as string;
    });
  }
});

export const { clearPokemons } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
