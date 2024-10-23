import { RootState } from "../store";

export const selectNameFilter = (state: RootState) => state.filter.name;
