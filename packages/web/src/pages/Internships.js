import React from "react";
import InternshipList from "../components/internships";
import { HomeGrid } from "../components/style";
import ScrollTop from "../components/scrollTop";

const Internships = props => (
  <ScrollTop>
    <HomeGrid>
      <InternshipList tagParam={props.tag && props.tag} />
    </HomeGrid>
  </ScrollTop>
);

export default Internships;
