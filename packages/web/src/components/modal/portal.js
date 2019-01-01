import React from "react";
import { createPortal } from "react-dom";

const portalRoot = document.getElementById("portal");

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.el.classList.add("portal");
  }

  componentDidMount() {
    portalRoot.appendChild(this.el);
    document.getElementById("root").style.overflow = "hidden";
  }

  componentWillUnmount() {
    portalRoot.removeChild(this.el);
    document.getElementById("root").style.overflow = "auto";
  }

  render() {
    const { children } = this.props;
    return createPortal(children, this.el);
  }
}

export default Portal;
