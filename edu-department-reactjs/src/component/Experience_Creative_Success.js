import React, { Component } from "react";
import { PageHeader, Image, Button, Glyphicon } from "react-bootstrap";
import { Link } from 'react-router-dom';
class Experience_Creative_Success extends Component {
  
  render() {
    return (
      <div>
        <p className="text-center">
          <Image
            className="success-image"
            src={require("../resourse/image/OK.png")}
          />
        </p>
        <PageHeader bsClass="text-success text-center">
          ĐĂNG KÍ THÀNH CÔNG
        </PageHeader>;
        <p className="text-center">
          <Link to="/">
            <Button bsSize="large" bsStyle="info">
              <Glyphicon glyph="home" /> VỀ TRANG CHỦ
            </Button>
          </Link>
        </p>
      </div>
    );
  }
}

export default Experience_Creative_Success;
