import React from "react";
import { HomeGrid } from "../components/style";
import Questions from "../components/questions";
import Aside from "../components/aside";
import ScrollTop from "../components/scrollTop";

const Home = () => (
  <ScrollTop>
    <HomeGrid>
      <Questions />
      <Aside />
    </HomeGrid>
  </ScrollTop>
);

export default Home;
