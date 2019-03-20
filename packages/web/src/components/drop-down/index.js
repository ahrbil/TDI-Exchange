import React from "react";

import {
  DropDownWrapper,
  DropDownContent,
  DropDownItemStyle,
  Header
} from "./style";
import Icon from "../icons";

const DropDown = ({ children, overlay }) => {
  let timeOutID;
  const [expend, setExpend] = React.useState(false);
  const toggle = () => {
    setExpend(!expend);
  };
  React.useEffect(() => {
    return () => {
      clearTimeout(timeOutID);
    };
  }, [expend]);

  return (
    <DropDownWrapper
      onFocus={toggle}
      onBlur={() => {
        timeOutID = setTimeout(toggle, 200);
      }}
    >
      <Header active={expend}>{children}</Header>
      {expend && (
        <DropDownContent>
          <ul>{overlay}</ul>
        </DropDownContent>
      )}
    </DropDownWrapper>
  );
};

export const DropDownItem = ({ children, icon, ...rest }) => (
  <DropDownItemStyle {...rest}>
    {icon && <Icon iconName={icon} />}
    {children}
  </DropDownItemStyle>
);

export default DropDown;
