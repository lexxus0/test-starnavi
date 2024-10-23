import { CharactersReducer, clearCharacter } from "./slice";
import { fetchCharacters } from "./operations";
import { mockCharacter } from "../mock";

describe("charactersSlice", () => {
  it("should handle initial state", () => {
    expect(CharactersReducer(undefined, { type: "unknown" })).toEqual({
      item: null,
      list: [],
      planets: {},
      films: {},
      starships: {},
      isLoading: false,
      error: null,
      currentPage: 1,
      totalCount: null,
    });
  });

  it("should handle clearCharacter", () => {
    const initialState = {
      item: mockCharacter,
      list: [],
      planets: {},
      films: {},
      starships: {},
      isLoading: false,
      error: null,
      currentPage: 1,
      totalCount: null,
    };
    const newState = CharactersReducer(initialState, clearCharacter());
    expect(newState.item).toBeNull();
  });

  it("should handle fetchCharacters.fulfilled", () => {
    const action = {
      type: fetchCharacters.fulfilled.type,
      payload: { characters: [mockCharacter], currentPage: 1, totalCount: 1 },
    };
    const newState = CharactersReducer(undefined, action);
    expect(newState.list).toEqual([mockCharacter]);
  });
});
