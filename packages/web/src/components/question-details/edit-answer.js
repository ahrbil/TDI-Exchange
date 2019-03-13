import React from "react";

import CreateQuestion from "../create-question";

const EditQuestion = props => (
  <>
    <h1>Edit your questions</h1>
    <CreateQuestion {...props} />
  </>
);

export default EditQuestion;
