import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCharacterById } from "../../redux/characters/operations";
import Graph from "../../components/Graph/Graph";
import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./CharacterDataPage.module.css";
import { clearCharacter } from "../../redux/characters/slice";
import { selectIsLoading } from "../../redux/characters/selectors";
import Loader from "../../components/Loader/Loader";

const CharacterDataPage: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useAppSelector(selectIsLoading);
  const backLinkRef = useRef(location.state?.from ?? "/characters");

  const handleGoBack = () => {
    navigate(backLinkRef.current);
  };

  useEffect(() => {
    if (characterId) {
      dispatch(fetchCharacterById(characterId));
    }
  }, [dispatch, characterId]);

  useEffect(() => {
    return () => {
      dispatch(clearCharacter());
    };
  }, [dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      <Link to={backLinkRef.current}>
        <button
          type="button"
          className={styles.goBackButton}
          onClick={handleGoBack}
        >
          <IoMdArrowRoundBack className={styles.goBackIcon} />
        </button>
      </Link>
      <h1 className={styles.heading}>Details</h1>
      <Graph />
    </div>
  );
};

export default CharacterDataPage;
