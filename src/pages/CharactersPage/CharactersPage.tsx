import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectIsLoading,
  selectTotalCount,
  selectFilteredCharacters,
} from "../../redux/characters/selectors";
import { fetchCharacters } from "../../redux/characters/operations";
import CharactersList from "../../components/CharactersList/CharactersList";
import Pagination from "../../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import styles from "./CharactersPage.module.css";
import Search from "../../components/Search/Search";

const CharactersPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const totalCount = useAppSelector(selectTotalCount);
  const characters = useAppSelector(selectFilteredCharacters);
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    dispatch(fetchCharacters({ page: currentPage, search: searchQuery }));
  }, [dispatch, currentPage, searchQuery]);

  if (isLoading) {
    return <Loader />;
  }

  if (characters.length === 0) {
    return (
      <>
        <Search />
        <p>No characters found.</p>
      </>
    );
  }

  return (
    <div className={styles.charactersPage}>
      <Search />
      <CharactersList />
      {totalCount && characters.length > 0 && <Pagination />}
    </div>
  );
};

export default CharactersPage;
