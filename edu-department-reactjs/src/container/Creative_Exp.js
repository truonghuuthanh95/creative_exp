import React, { Component } from "react";
import Header from "../component/Header";
import { Col } from "react-bootstrap";
import Experience_Creative from "../component/Experience_Creative";

class Creative_Exp extends Component {
  
  render() {
    return (
      <div>
        <Header />
        <Col mdOffset={2} md={8} xs={12}>
          {" "}
          <Experience_Creative />
        </Col>
        {/* <Footer/> */}
      </div>
    );
  }
}
export default Creative_Exp;
