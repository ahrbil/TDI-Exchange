import { gql } from "apollo-boost";
import { ITEMS_ON_PAGE } from "../constants";

const QUESTION_FRAGMENT = gql`
  fragment questionFragment on Question {
    id
    header
    totalAnswers
    createdAt
    askedBy {
      userName
      avatar
      repScore
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
  query ALL_QUESTIONS($orderBy: QuestionOrderByInput,$where: QuestionWhereInput ,$skip: Int, $first: Int = ${ITEMS_ON_PAGE}) {
    allQuestions(orderBy: $orderBy,where:$where ,skip: $skip, first: $first) {
      ...questionFragment
    }
  }
  ${QUESTION_FRAGMENT}
`;

export const QUESTION_WITH_DETAILS = gql`
  query QUESTION_WITH_DETAILS($id: ID!,$orderByAnswers: AnswerOrderByInput,$skip: Int, $first: Int = ${ITEMS_ON_PAGE +
    5}) {
    question(id: $id) {
      ...questionFragment
      body
      answers(orderBy: $orderByAnswers, skip: $skip, first: $first) {
        id
        body
        createdAt
        answeredBy {
          userName
          avatar
          repScore
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

export const ALL_INTERNSHIPS = gql`
  query ALL_INTERNSHIPS {
    allInternships {
      id
      title
      location
      avatar
      tags {
        id
        tag
      }
      createdAt
    }
  }
`;
