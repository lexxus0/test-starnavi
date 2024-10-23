import { configureStore, Reducer } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { CharactersReducer } from "./characters/slice";
import { CharactersState } from "./characters/slice";
import { filterReducer } from "./filter/slice";

const charactersPersistedConfig = { key: "characters", storage };

type PersistedCharactersState = CharactersState & PersistPartial;

const persistedCharactersReducer = persistReducer<PersistedCharactersState>(
  charactersPersistedConfig,
  CharactersReducer as unknown as Reducer<PersistedCharactersState>
);

export const store = configureStore({
  reducer: {
    characters: persistedCharactersReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
