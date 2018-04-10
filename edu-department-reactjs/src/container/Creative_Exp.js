import React, { Component } from "react";
import Header from "../component/Header";
import TitleActivity from "../component/TitleActivity";
import { Grid, Col, Row } from "react-bootstrap";
import Experience_Creative from "../component/Experience_Creative";
import Footer from '../component/Footer';
class Creative_Exp extends Component {
  constructor(props) {
    super(props);
  }
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
