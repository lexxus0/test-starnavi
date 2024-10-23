import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectFilteredCharacters,
  selectTotalCount,
} from "../../redux/characters/selectors";
import { fetchCharacters } from "../../redux/characters/operations";
import styles from "./Pagination.module.css";
import { useSearchParams } from "react-router-dom";

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectFilteredCharacters);
  const totalCount = useAppSelector(selectTotalCount);
  const perPage = 10;
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);
  const searchQuery = searchParams.get("search") || "";
  const totalPages = Math.ceil((totalCount ?? 0) / perPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setSearchParams({ page: page.toString(), search: searchQuery });
      dispatch(fetchCharacters({ page, search: searchQuery }));
    }
  };

  if (totalCount === 0 || characters.length === 0) return null;

  return characters.length === 0 ? null : (
    <div className={styles.div}>
      {pages.map((page) => (
        <button
          key={page}
          className={styles.btn}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
