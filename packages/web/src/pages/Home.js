import React from "react";
import { HomeGrid } from "../components/style";
import Questions from "../components/questions";
import Aside from "../components/aside";

const Home = () => (
  <HomeGrid>
    <Questions />
    <Aside />
  </HomeGrid>
);

export default Home;
