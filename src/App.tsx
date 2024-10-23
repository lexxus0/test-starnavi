import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CharactersPage = lazy(
  () => import("./pages/CharactersPage/CharactersPage")
);
const CharacterDataPage = lazy(
  () => import("./pages/CharacterDataPage/CharacterDataPage")
);
const NotFoundPage = lazy(
  () => import("./pages/NotFoundPage/NotFoundPage.tsx")
);

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route
          path="/characters/:characterId"
          element={<CharacterDataPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
