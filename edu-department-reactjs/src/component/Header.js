import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  Image,
  Glyphicon,
  Modal,
  Button
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalContact: false
    };

    this.handelShowContact = this.handelShowContact.bind(this);
    this.handleCloseContact = this.handleCloseContact.bind(this);
  }

  handelShowContact() {
    this.setState({ showModalContact: true });
  }

  handleCloseContact() {
    this.setState({ showModalContact: false });
  }

  render() {
    return (
      <div>
        <Navbar collapseOnSelect className="header-color">
          <Navbar.Header>
            <Navbar.Brand className="logo-style-padding-top">
              <NavLink to="/index">
                <Image
                  src={require("../resourse/image/logo_so.png")}
                  rounded
                  className="logo-style"
                />
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullLeft className="nav-link">
              <LinkContainer to="/" activeClassName="nothing">
                <NavItem eventKey={1}>
                  <Glyphicon glyph="home" /> Trang chủ
                </NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight className="nav-link">
              <NavItem eventKey={1} href="#" onClick={this.handelShowContact}>
                <Glyphicon glyph="earphone" /> Liên Hệ
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Modal
          show={this.state.showModalContact}
          onHide={this.handleCloseContact}
          bsSize="large"
        >
          <Modal.Header closeButton>
            <Modal.Title>Liên hệ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <h4><b>Trải nghiệm sáng tạo</b></h4>
                <ul>
                  <li><b>Ông Hồ Tấn Minh</b> 
                  <div className="contact-info">
                    <p>Chuyên viên phòng Giáo dục Trung Học - Sở GD-ĐT TP.HCM </p>
                    <p><Glyphicon glyph="envelope" /><a href='mailto:htminh@hcm.edu.vn'> htminh@hcm.edu.vn</a>.</p>
                    <p><Glyphicon glyph="earphone" /><a href="tel:0909881283"> 0909881283</a></p>
                  </div>
                  </li>
                  <li><b>Ông Trần Đình Thế</b> 
                  <div className="contact-info">
                    <p>Giám đốc Trung tâm - Trung Tâm Giáo dục Vườn thú, Thảo cầm viên Sài Gòn </p>
                    <p><Glyphicon glyph="envelope" /><a href='mailto:htminh@hcm.edu.vn'> trungtamgiaoducvuonthutcvsg@gmail.com</a>.</p>
                    <p><Glyphicon glyph="earphone" /><a href="tel:0907427329"> 0907427329</a></p>
                  </div>
                  </li>
                  <li><b>Ông Nguyễn Quang Phúc</b> 
                  <div className="contact-info">
                    <p>Ban điều hành chương trình - Trung Tâm Giáo dục Vườn thú, Thảo cầm viên Sài Gòn </p>
                    <p><Glyphicon glyph="envelope" /><a href='mailto:htminh@hcm.edu.vn'> info@dulichquoctedaongoc.com</a>.</p>
                    <p><Glyphicon glyph="earphone" /><a href="tel:0937886722"> 0937886722</a></p>
                  </div>
                  </li>
                </ul>
              <h4><b>Hỗ trợ kĩ thuật</b></h4>
              <ul>
                  <li><b>Trương Hữu Thành.</b> 
                  <div className="contact-info">                  
                    <p><Glyphicon glyph="envelope" /><a href='mailto:truonghuuthanh95@gmail.com'> truonghuuthanh95@gmail.com</a>.</p>
                    <p><Glyphicon glyph="earphone" /><a href='tel:0988670449'> 0988670449</a></p>
                  </div>
                  </li>
                </ul>
            </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseContact}>Đóng</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default Header;
