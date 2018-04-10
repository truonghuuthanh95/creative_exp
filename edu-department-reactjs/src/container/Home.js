import React, { Component } from "react";
import Header from "../component/Header";
import TitleActivity from "../component/TitleActivity";
import { Grid, Col, Row, Thumbnail, Button } from "react-bootstrap";
import Experience_Creative from "../component/Experience_Creative";
import Footer from '../component/Footer';
// import { withRouter } from 'react-router-dom';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityThumbnail: [
        {
          id: 1,
          name: "Trải nghiệm sáng tạo",
          image: "../resourse/image/picnic.jpeg",
          link: "/trainghiemsangtao"
        },

        {
          id: 2,
          name: "Đăng kí khác",
          image: '../resourse/image/picnic.jpeg',
          link: "abc"
        }
      ]
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.history.push(event);
  }

  render() {
    const { activityThumbnail } = this.state;
    return (
      <div>
        <Header />
        <Grid>
          <Row>
            {activityThumbnail.map(activity => (
              <Col md={4} key={activity.id}>
                <Thumbnail src={require(`../resourse/image/picnic.jpeg`)} alt="242x200">
                  <h3 className="text-center">{activity.name}</h3>
                  <p className="text-center">
                    <Button
                      bsStyle="primary"
                      onClick={() => this.handleClick(activity.link)}
                    >
                      Đăng kí
                    </Button>&nbsp;
                  </p>
                </Thumbnail>
              </Col>
            ))}
          </Row>
        </Grid>
        {/* <Footer/> */}
      </div>
    );
  }
}
export default Home;
