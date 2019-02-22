import styled from "styled-components";

import { SvgWrapper } from "../icons";

export const FooterContainer = styled.div`
  margin-top: 2rem;
  padding: 26px 16px 0 16px;
  background-color: #f8f8f8;
`;
export const FooterGrid = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1080px;
  display: grid;
  grid-template-columns: auto 1fr minmax(150px, auto);
  grid-template-areas:
    "brand . privacy"
    "creator creator creator";
  grid-template-rows: 1fr auto;
  align-items: flex-start;
  justify-items: flex-start;
  flex: 1 1 auto;
  grid-gap: 1rem;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "brand" "privacy"
      "creator";
    grid-template-rows: auto;
  }
`;
export const BrandArea = styled.div`
  grid-area: brand;
  display: flex;
  flex-direction: column;
  svg {
    height: 23px;
  }
  ${SvgWrapper} {
    color: #454545;
    width: 21px;
    transition: color 0.2s ease-in;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`;
export const PrivacyArea = styled.div`
  grid-area: privacy;
  display: flex;
  flex-direction: column;
  span {
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 0.4rem;
    position: relative;
    &::before {
      transition: all 0.2s ease-in-out 0s;
      content: "";
      background-color: #16171a;
      width: 0;
      height: 4px;
      position: absolute;
      bottom: -6px;
      opacity: 0;
    }
    &:hover {
      &::before {
        width: 104%;
        opacity: 1;
      }
    }
  }
`;
export const CreatorArea = styled.div`
  grid-area: creator;
  justify-self: center;
  font-size: 0.8rem;
  a {
    text-decoration: underline;
    padding: 3px;
  }
`;

export const SocialIcons = styled.div`
  margin-top: 0.6rem;
  a {
    margin-left: 0.25rem;
  }
`;
