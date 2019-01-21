import React from "react";
import InternshipList from "../components/internships";
import { HomeGrid } from "../components/style";
import Aside from "../components/aside";

const Internships = () => (
  <HomeGrid>
    <InternshipList />
    <Aside />
  </HomeGrid>
);

export default Internships;
