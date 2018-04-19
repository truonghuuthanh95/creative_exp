import React, { Component } from "react";
import Header from "../component/Header";
import {
  Panel,
  Table,
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  PageHeader,
  Glyphicon
} from "react-bootstrap";
import {
  getListCreativeExpRegistedByActiveId,
  getAllActivity,
  getallPosition,
  exportExcelCreaticeExp
} from "../api/creative_exp_api";
import moment from "moment";

class Experience_Creative_Registed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listActivityDetail: [],
      listActivityExp: [],
      activityExpSelected: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickExportCreativeExp = this.handleClickExportCreativeExp.bind(this);
  }
  componentWillMount(){
    const isRegistedSuccess = localStorage.getItem('activityKey');
    debugger
    if (isRegistedSuccess === undefined || isRegistedSuccess == '') {
      this.props.history.push('/');
    }
  }
  async componentDidMount() {
    await getAllActivity().then(res =>
      this.setState({ listActivityExp: res, activityExpSelected: res[0].id })
    );
    await getListCreativeExpRegistedByActiveId(this.state.activityExpSelected).then(res => {
      this.setState({ listActivityDetail: res });
    });
  }

  async handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    await this.setState({
      [name]: value
    });
    if (name === 'activityExpSelected') {
        await getListCreativeExpRegistedByActiveId(value).then(res => this.setState({listActivityDetail: res}))
    }
  }

  async handleClickExportCreativeExp(event){
      
      event.preventDefault();
      await exportExcelCreaticeExp(this.state.activityExpSelected);
  }

  render() {
    const { listActivityDetail, listActivityExp } = this.state;
    return (
      <div>
        <Header />
        <Col sm={10} mdOffset={1}>
          {" "}
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">Danh sách đăng kí</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Form horizontal className="select-program">
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Tên chủ đề
                  </Col>
                  <Col sm={8}>
                    <FormControl
                      componentClass="select"
                      name="activityExpSelected"
                      onChange={this.handleInputChange}
                      value={this.state.activityExpSelected}
                    >
                      {listActivityExp.length > 0
                        ? listActivityExp.map(activities => (
                            <option key={activities.id} value={activities.id}>
                              {activities.name}
                            </option>
                          ))
                        : null}
                      >
                    </FormControl>
                  </Col>
                  <Col sm={2}>
                    <Button bsSize="large" bsStyle="success" onClick={this.handleClickExportCreativeExp}>
                      <Glyphicon glyph="save" /> Tải
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
              <Table striped bordered condensed hover responsive>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên Trường</th>
                    <th>Ngày Tham Gia</th>
                    <th>Buổi</th>
                    <th>Số Lượng</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {listActivityDetail.length > 0
                    ? listActivityDetail.map((activities, index) => (
                        <tr key={activities.id}>
                          <td>{index + 1}</td>
                          <td>{activities.School.name}</td>
                          <td>
                            {moment(activities.date_registed).format(
                              "DD/MM/YYYY"
                            )}
                          </td>
                          <td>{activities.Session_A_Day.name}</td>
                          <td>{activities.student_quantity}</td>
                          <td>
                            <Button bsStyle="info" bsSize="small">
                              Chi tiết
                            </Button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
            </Panel.Body>
          </Panel>
        </Col>
      </div>
    );
  }
}

export default Experience_Creative_Registed;
