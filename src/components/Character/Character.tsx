import styles from "./Character.module.css";

type CharacterProps = {
  image: string | undefined;
  name: string;
  birthDate: string;
  homeworld: string;
};

const Character: React.FC<CharacterProps> = ({
  name,
  birthDate,
  homeworld,
  image,
}) => {
  return (
    <>
      <img className={styles.img} src={image} alt={name} />
      <h3>{name}</h3>
      <p>Date of birth: {birthDate}</p>
      <p>Homeworld: {homeworld}</p>
    </>
  );
};

export default Character;
