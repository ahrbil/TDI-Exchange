import { gql } from "apollo-boost";

export const CURRENT_USER = gql`
  query CURRENT_USER {
    me {
      userName
      avatar
    }
  }
`;

export const ALL_QUESTIONS = gql`
  query ALL_QUESTIONS {
    allQuestions {
      id
      header
      updatedAt
      askedBy {
        userName
        avatar
      }
    }
  }
`;
