import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectNameFilter } from "../filter/selectors";

export const selectCharacters = (state: RootState) => state.characters.list;
export const selectCharacter = (state: RootState) => state.characters.item;
export const selectIsLoading = (state: RootState) => state.characters.isLoading;
export const selectIsError = (state: RootState) => state.characters.error;
export const selectCurrentPage = (state: RootState) =>
  state.characters.currentPage;
export const selectTotalCount = (state: RootState) =>
  state.characters.totalCount;
export const selectPlanets = (state: RootState) => state.characters.planets;

export const selectFilteredCharacters = createSelector(
  [selectCharacters, selectNameFilter],
  (characters, filter) => {
    if (!Array.isArray(characters)) return [];
    const updatedFilter = filter.toLowerCase();
    return characters.filter((character) =>
      character.name.toLowerCase().includes(updatedFilter)
    );
  }
);
