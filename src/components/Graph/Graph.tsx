import { useEffect, useState, useCallback } from "react";
import { ReactFlow, Node, Edge, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import "reactflow/dist/style.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchMovieById,
  fetchStarshipById,
  fetchCharacterById,
} from "../../redux/characters/operations";
import { useParams } from "react-router-dom";
import { selectCharacter } from "../../redux/characters/selectors";
import { Character, Film, Starship } from "../../redux/types";
import styles from "./Graph.module.css";
import React from "react";

const Graph: React.FC = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const dispatch = useAppDispatch();
  const character = useAppSelector(selectCharacter);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const notFoundPic =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";

  useEffect(() => {
    if (characterId) {
      dispatch(fetchCharacterById(characterId));
    }
  }, [characterId, dispatch]);

  const buildGraphData = useCallback(
    async (character: Character) => {
      const filmNodes: Node[] = [];
      const starshipNodes: Node[] = [];
      const newEdges: Edge[] = [];

      const screenWidth = window.innerWidth;
      const heroPositionX = screenWidth / 2 - 100;

      filmNodes.push({
        id: `hero-${character.id}`,
        type: "default",
        position: { x: heroPositionX, y: 50 },
        draggable: true,
        data: {
          label: (
            <div className={styles.nodeContainer}>
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${character.id}.jpg`}
                alt={character.name}
                className={styles.nodeImage}
              />
              <strong>{character.name}</strong>
            </div>
          ),
        },
      });

      const filmY = 300;
      const filmXStart = heroPositionX - (character.films.length * 150) / 2;
      const filmXStep = 250;
      const starshipYStart = 450;
      const starshipBlockHeight = 250;
      const minStarshipGap = 150;

      for (let i = 0; i < character.films.length; i++) {
        const filmId = character.films[i];
        const film: Film = await dispatch(fetchMovieById(filmId)).unwrap();

        filmNodes.push({
          id: `film-${film.id}`,
          type: "default",
          position: { x: filmXStart + i * filmXStep, y: filmY },
          draggable: true,
          data: {
            label: (
              <div className={styles.nodeContainer}>
                <img
                  src={`https://starwars-visualguide.com/assets/img/films/${film.id}.jpg`}
                  alt={film.title}
                  className={styles.nodeImage}
                />
                <div>{film.title}</div>
              </div>
            ),
          },
        });

        newEdges.push({
          id: `edge-hero-${film.id}`,
          source: `hero-${character.id}`,
          target: `film-${film.id}`,
          type: "step",
          animated: true,
        });

        const numberOfStarships = film.starships.length;
        if (numberOfStarships > 0) {
          const starshipVerticalGap = Math.max(
            minStarshipGap,
            starshipBlockHeight / (numberOfStarships + 1)
          );

          for (let j = 0; j < numberOfStarships; j++) {
            const starshipId = film.starships[j];
            if (character.starships.includes(starshipId)) {
              const starship: Starship = await dispatch(
                fetchStarshipById(starshipId)
              ).unwrap();

              const starshipImageUrl = `https://starwars-visualguide.com/assets/img/starships/${starship.id}.jpg`;
              const defaultImageUrl = notFoundPic;

              starshipNodes.push({
                id: `starship-${starship.id}`,
                type: "default",
                position: {
                  x: filmXStart + i * filmXStep,
                  y: starshipYStart + (j + 1) * starshipVerticalGap,
                },
                draggable: true,
                data: {
                  label: (
                    <div className={styles.nodeContainer}>
                      <img
                        src={starshipImageUrl}
                        onError={(e) => {
                          e.currentTarget.src = defaultImageUrl;
                        }}
                        alt={starship.name}
                        className={styles.nodeImage}
                        style={{ width: "80px", height: "80px" }}
                      />
                      <div>{starship.name}</div>
                    </div>
                  ),
                },
              });

              newEdges.push({
                id: `edge-film-${film.id}-starship-${starship.id}`,
                source: `film-${film.id}`,
                target: `starship-${starship.id}`,
                type: "smoothstep",
              });
            }
          }
        }
      }

      setNodes([...filmNodes, ...starshipNodes]);
      setEdges(newEdges);
    },
    [dispatch]
  );

  useEffect(() => {
    if (character) {
      buildGraphData(character);
    }
  }, [character, buildGraphData]);

  return (
    <div className={styles.graphContainer}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Graph;
