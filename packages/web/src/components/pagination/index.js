import React from "react";
import { Pagination } from "antd";

import "./style.css";
import { ITEMS_ON_PAGE } from "../../constants";

const CustomPagination = ({ onChange }) => (
  <Pagination
    defaultCurrent={1}
    total={160}
    pageSize={ITEMS_ON_PAGE}
    onChange={onChange}
  />
);

export default CustomPagination;
