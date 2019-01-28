import React from "react";
import InternshipList from "../components/internships";
import { HomeGrid } from "../components/style";
import Aside from "../components/aside";
import ScrollTop from "../components/scrollTop";

const Internships = () => (
  <ScrollTop>
    <HomeGrid>
      <InternshipList />
      <Aside />
    </HomeGrid>
  </ScrollTop>
);

export default Internships;
