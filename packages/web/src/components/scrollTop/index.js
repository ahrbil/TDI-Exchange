import React from "react";
import PropTypes from "prop-types";

class ScrollTop extends React.Component {
  componentDidMount() {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default ScrollTop;

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired
};
