import React, { Component } from "react";
import { PageHeader, Button, Glyphicon } from "react-bootstrap";
import { Link } from "react-router-dom";
class NotFound extends Component {
  render() {
    return (
      <div>
        <PageHeader className="text-center text-danger">Oops!</PageHeader>
        <PageHeader className="text-center text-danger">KHÔNG TÌM THẤY TRANG</PageHeader>
        <p className="text-center">
          {" "}
          Xin lỗi, có lỗi vừa xảy ra, Yêu cầu trang không tìm thấy!
        </p>
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

export default NotFound;
