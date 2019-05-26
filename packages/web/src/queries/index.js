import { gql } from "apollo-boost";
import { ITEMS_ON_PAGE } from "../constants";

const QUESTION_FRAGMENT = gql`
  fragment questionFragment on Question {
    id
    header
    body
    isOwner
    totalAnswers
    createdAt
    askedBy {
      userName
      avatar
      repScore
    }
  }
`;

const INTERNSHIP_FRAGMENT = gql`
  fragment internshipFragment on Internship {
    id
    title
    location
    avatar
    description
    createdAt
    tags {
      id
      name
    }
  }
`;

const NOTIFICATION_FRAGMENT = gql`
  fragment notificationFragment on Notification {
    id
    payload
    seen
    read
    createdAt
    actors {
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

export const QUESTIONS_FEED = gql`
  query QUESTIONS_FEED($orderBy: QuestionOrderByInput,$where: QuestionWhereInput ,$skip: Int, $first: Int = ${ITEMS_ON_PAGE}) {
    questionsFeed(orderBy: $orderBy,where:$where ,skip: $skip, first: $first) {
      count
      items {
      ...questionFragment
      }
    }
  }
  ${QUESTION_FRAGMENT}
`;

export const QUESTION_WITH_DETAILS = gql`
  query QUESTION_WITH_DETAILS($id: ID!,$orderByAnswers: AnswerOrderByInput,$skip: Int, $first: Int = ${ITEMS_ON_PAGE +
    5}) {
    question(id: $id) {
      ...questionFragment
      answers(orderBy: $orderByAnswers, skip: $skip, first: $first) {
        id
        body
        isOwner
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

export const INTERNSHIPS_FEED = gql`
  query INTERNSHIPS_FEED ($orderBy: InternshipOrderByInput,$where: InternshipWhereInput ,$skip: Int, $first: Int = ${ITEMS_ON_PAGE}) {
    internshipsFeed (orderBy: $orderBy,where:$where ,skip: $skip, first: $first){
      count
      items {
        ...internshipFragment
      }
    }
  }
  ${INTERNSHIP_FRAGMENT}
`;

export const TAGS = gql`
  query TAGS($where: TagWhereInput, $first: Int) {
    tags(where: $where, first: $first) {
      id
      name
    }
  }
`;

export const CREATE_TAG = gql`
  mutation createTag($name: String!) {
    createTag(name: $name) {
      id
      name
    }
  }
`;

export const CREATE_INTERNSHIP = gql`
  mutation createInternship(
    $title: String!
    $location: String!
    $description: String
    $imgFile: Upload!
    $tags: [TagInput!]!
  ) {
    createInternship(
      title: $title
      location: $location
      description: $description
      imgFile: $imgFile
      tags: $tags
    ) {
      ...internshipFragment
    }
  }
  ${INTERNSHIP_FRAGMENT}
`;

export const LOGOUT = gql`
  mutation LOGOUT {
    logout
  }
`;

export const UPDATE_QUESTION = gql`
  mutation UPDATE_QUESTION($questionId: ID!, $header: String!, $body: String) {
    updateQuestion(questionId: $questionId, header: $header, body: $body) {
      id
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DELETE_QUESTION($questionId: ID!) {
    deleteQuestion(questionId: $questionId)
  }
`;

export const UPDATE_ANSWER = gql`
  mutation UPDATE_ANSWER($answerId: ID!, $body: String!) {
    updateAnswer(answerId: $answerId, body: $body) {
      id
    }
  }
`;

export const DELETE_ANSWER = gql`
  mutation DELETE_ANSWER($answerId: ID!) {
    deleteAnswer(answerId: $answerId)
  }
`;

export const NEW_NOTIFICATION_SUBSCRIBE = gql`
  subscription NEW_NOTIFICATION_SUBSCRIBE {
    newNotification {
      ...notificationFragment
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const ALL_NOTIFICATIONS = gql`
  query ALL_NOTIFICATIONS {
    allNotifications {
      ...notificationFragment
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;
