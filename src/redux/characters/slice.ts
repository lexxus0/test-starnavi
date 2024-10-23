import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCharacters,
  fetchCharacterById,
  fetchPlanetById,
  fetchMovieById,
  fetchStarshipById,
} from "./operations";
import { Character, Film, Starship } from "../types";

export interface CharactersState {
  item: Character | null;
  list: Character[];
  isLoading: boolean;
  planets: { [key: string]: string };
  films: { [key: number]: Film };
  starships: { [key: number]: Starship };
  error: unknown;
  currentPage: number;
  totalCount: number | null;
}

const handlePending = (state: CharactersState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (
  state: CharactersState,
  action: PayloadAction<unknown>
) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState: CharactersState = {
  item: null,
  list: [],
  planets: {},
  films: {},
  starships: {},
  isLoading: false,
  error: null,
  currentPage: 1,
  totalCount: null,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    clearCharacter: (state) => {
      state.item = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, handlePending)
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.list = action.payload.characters;
        state.currentPage = action.payload.currentPage;
        state.totalCount = action.payload.totalCount;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCharacters.rejected, handleRejected)

      .addCase(fetchCharacterById.pending, handlePending)
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.item = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCharacterById.rejected, handleRejected)

      .addCase(fetchPlanetById.fulfilled, (state, action) => {
        const { planetId, name } = action.payload;
        state.planets[planetId] = name;
      })
      .addCase(fetchPlanetById.rejected, handleRejected)

      .addCase(fetchMovieById.fulfilled, (state, action) => {
        const film = action.payload;
        state.films[film.id] = film;
      })
      .addCase(fetchMovieById.rejected, handleRejected)

      .addCase(fetchStarshipById.fulfilled, (state, action) => {
        const starship = action.payload;
        state.starships[starship.id] = starship;
      })
      .addCase(fetchStarshipById.rejected, handleRejected);
  },
});

export const { clearCharacter } = charactersSlice.actions;
export const CharactersReducer = charactersSlice.reducer;
