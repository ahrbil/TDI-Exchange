import React from "react";
import { HomeGrid } from "../components/style";
import Questions from "../components/questions";
import ScrollTop from "../components/scrollTop";

const Home = () => (
  <ScrollTop>
    <HomeGrid>
      <Questions />
    </HomeGrid>
  </ScrollTop>
);

export default Home;
