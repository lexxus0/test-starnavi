import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectFilteredCharacters,
  selectPlanets,
} from "../../redux/characters/selectors";
import Character from "../Character/Character";
import { Link, useLocation } from "react-router-dom";
import styles from "./CharactersList.module.css";
import { useEffect } from "react";
import { fetchPlanetById } from "../../redux/characters/operations";

const CharactersList: React.FC = () => {
  const location = useLocation();
  const characters = useAppSelector(selectFilteredCharacters);
  const planets = useAppSelector(selectPlanets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    characters.forEach((character) => {
      if (character.homeworld && !planets[character.homeworld])
        dispatch(fetchPlanetById(character.homeworld));
    });
  }, [characters, dispatch, planets]);

  return (
    <div className="container">
      <ul className={styles.charactersList}>
        {characters.map((character) => (
          <li key={character.id} className={styles.charactersListItem}>
            <Link to={`/characters/${character.id}`} state={{ from: location }}>
              <Character
                name={character.name}
                image={character.image}
                birthDate={character.birth_year}
                homeworld={planets[character.homeworld]}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersList;
