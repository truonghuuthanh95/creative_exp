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
import { LinkContainer } from 'react-router-bootstrap';
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
    const style = {
      menucolor: { height: 100 }
    };
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
        >
          <Modal.Header closeButton>
            <Modal.Title>Liên hệ</Modal.Title>
          </Modal.Header>
          <Modal.Body />
          <Modal.Footer>
            <Button onClick={this.handleCloseContact}>Đóng</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default Header;
