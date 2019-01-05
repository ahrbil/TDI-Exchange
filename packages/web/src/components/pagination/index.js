import React from "react";
import { Query } from "react-apollo";
import { Pagination } from "antd";

import "./style.css";
import { ITEMS_ON_PAGE } from "../../constants";
import { QUESTIONS_COUNT } from "../../queries";

const CustomPagination = ({ onChange, currentPage }) => (
  <Query query={QUESTIONS_COUNT}>
    {({ data, loading }) => {
      if (loading) {
        return null;
      }
      if (data && data.questionsCount) {
        const { questionsCount } = data;
        return (
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            total={questionsCount}
            pageSize={ITEMS_ON_PAGE}
            onChange={onChange}
          />
        );
      }
      return null;
    }}
  </Query>
);

export default CustomPagination;
