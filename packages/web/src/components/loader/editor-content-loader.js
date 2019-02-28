import React from "react";

import ContentLoader from "react-content-loader";

const EditorContentLoader = props => (
  <ContentLoader
    height={70}
    width={700}
    speed={2}
    primaryColor="#F4F5F7"
    style={{ width: "100%", padding: "16px" }}
    {...props}
  >
    <rect x="0" y="40" width="100%" height="19" />
    <rect x="0.881104" y="0" width="549.051" height="25" />
  </ContentLoader>
);

export default EditorContentLoader;
