export type Film = {
  id: number;
  title: string;
  starships: number[];
};

export type Starship = {
  id: number;
  name: string;
};

export type Character = {
  id: number;
  name: string;
  image?: string;
  homeworld: number;
  homeworldName?: string;
  films: number[];
  starships: number[];
  birth_year: string;
};

export type Planet = {
  id: number;
  name: string;
};
