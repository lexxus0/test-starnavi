import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Search.module.css";
import { changeFilter } from "../../redux/filter/slice";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const search = searchParams.get("search") || "";
  const [query, setQuery] = useState<string>(search);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(changeFilter(query));
    navigate(`?search=${query}`);
  };

  return (
    <div className={styles.searchWrapper}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          className={styles.input}
          onChange={handleChange}
          placeholder="Search characters..."
        />
      </form>
    </div>
  );
};

export default Search;
