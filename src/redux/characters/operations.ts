import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "../tools/handleError";
import { Character, Film, Starship } from "../types";

const instance = axios.create({
  baseURL: "https://sw-api.starnavi.io",
});

export const fetchCharacters = createAsyncThunk(
  "people/getAll",
  async (
    { page = 1, search = "" }: { page: number; search: string },
    thunkAPI
  ) => {
    try {
      const { data } = await instance.get(
        `/people/?page=${page}&search=${search}`
      );

      const characters = data.results.map((character: Character) => ({
        ...character,
        image: `https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`,
        homeworldName: "",
      }));

      return {
        characters,
        currentPage: page,
        totalCount: data.count,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(
        handleError(e, "Failed to fetch characters.")
      );
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  "movies/getById",
  async (id: number, thunkAPI) => {
    try {
      const { data } = await instance.get(`/films/${id}/`);
      return data as Film;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        handleError(e, `Failed to fetch film with ID: ${id}.`)
      );
    }
  }
);

export const fetchStarshipById = createAsyncThunk(
  "starships/getById",
  async (id: number, thunkAPI) => {
    try {
      const { data } = await instance.get(`/starships/${id}/`);
      return data as Starship;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        handleError(e, `Failed to fetch starship with ID: ${id}.`)
      );
    }
  }
);

export const fetchCharacterById = createAsyncThunk(
  "people/getById",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await instance.get(`/people/${id}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        handleError(e, `Failed to fetch character with ID: ${id}.`)
      );
    }
  }
);

export const fetchPlanetById = createAsyncThunk(
  "planets/getById",
  async (planetId: string, thunkAPI) => {
    try {
      const { data } = await instance.get(`/planets/${planetId}`);
      return { planetId, name: data.name };
    } catch (e) {
      return thunkAPI.rejectWithValue(
        handleError(e, `Failed to fetch planet with ID: ${planetId}.`)
      );
    }
  }
);
