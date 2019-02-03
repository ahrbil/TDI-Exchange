import { UserInputError } from "apollo-server-express";

const throwListError = errorList => {
  const errorConstr = new UserInputError();
  errorConstr.errors = errorList.inner.map(error => ({
    path: error.path,
    message: error.message
  }));
  throw errorConstr;
};

export default throwListError;
