import React from "react";
import ContentLoader from "react-content-loader";

const AnswerContentLoader = props => (
  <ContentLoader
    height={20}
    width={100}
    speed={2}
    primaryColor="#F4F5F7"
    secondaryColor="#DFE1E6"
    style={{ width: "100%", padding: "16px 16px 0px 16px" }}
    {...props}
  >
    <circle cx="4%" cy="20%" r="5%" />
    <rect x="10%" y="4%" width="14%" height="15%" />
    <rect x="10%" y="25%" width="5%" height="15%" />
    <rect x="85%" y="15%" width="14%" height="15%" />
    <rect x="2%" y="48%" width="70%" height="20%" />
    <rect x="2%" y="73%" width="80%" height="20%" />
  </ContentLoader>
);

export default AnswerContentLoader;
