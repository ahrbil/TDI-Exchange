import React from "react";

import { AsideContainer, Sticky } from "./style";

const Aside = ({ children }) => (
  <AsideContainer>
    <Sticky>{children}</Sticky>
  </AsideContainer>
);

export default Aside;
