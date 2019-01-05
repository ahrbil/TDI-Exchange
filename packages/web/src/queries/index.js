import { gql } from "apollo-boost";

const QUESTION_FRAGMENT = gql`
  fragment questionFragment on Question {
    id
    header
    totalAnswers
    createdAt
    askedBy {
      userName
      avatar
    }
  }
`;

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
      ...questionFragment
    }
  }
  ${QUESTION_FRAGMENT}
`;

export const QUESTION_WITH_DETAILS = gql`
  query QUESTION_WITH_DETAILS($id: ID!) {
    question(id: $id) {
      ...questionFragment
      body
      answers {
        id
        body
        createdAt
        answeredBy {
          userName
          avatar
        }
      }
    }
  }
  ${QUESTION_FRAGMENT}
`;

export const CREATE_ANSWER = gql`
  mutation creatAnswer($questionId: ID!, $body: String!) {
    createAnswer(questionId: $questionId, body: $body) {
      id
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation createQuestion($header: String!, $body: String) {
    createQuestion(header: $header, body: $body) {
      id
    }
  }
`;

export const QUESTIONS_COUNT = gql`
  query questionsCount {
    questionsCount
  }
`;
