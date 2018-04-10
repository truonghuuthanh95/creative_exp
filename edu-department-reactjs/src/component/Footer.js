import React, { Component } from "react";
import { Navbar, Image } from "react-bootstrap";
class Footer extends Component {
  render() {
    return (
      <div>
        <Navbar fixedBottom className="footer-style">
          <Navbar.Header>
            <Navbar.Brand>
              <Image
                src={require("../resourse/image/logo_so.png")}
                rounded
                className=""
              />
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Text>
              <Navbar.Link href="http://hcm.edu.vn">
                CỔNG THÔNG TIN ĐIỆN TỬ SỞ GIÁO DỤC VÀ ĐÀO TẠO TP.HỒ CHÍ MINH{" "}
              </Navbar.Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>;
      </div>
    );
  }
}

export default Footer;
