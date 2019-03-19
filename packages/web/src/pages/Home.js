import React from "react";
import { HomeGrid } from "../components/style";
import Questions from "../components/questions";
import ScrollTop from "../components/scrollTop";

const Home = props => (
  <ScrollTop>
    <HomeGrid>
      <Questions {...props} />
    </HomeGrid>
  </ScrollTop>
);

export default Home;
