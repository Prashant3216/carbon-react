import { Routes, Route } from "react-router-dom";
import Home from "../page/home/home";
import Repo from "../page/repo/repo";

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repos" element={<Repo />} />
    </Routes>
  );
};

export default routes;
