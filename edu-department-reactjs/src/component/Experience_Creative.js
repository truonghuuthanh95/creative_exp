import React, { Component } from "react";
import {
  Checkbox,
  Radio,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  HelpBlock,
  Panel,
  Col,
  Glyphicon,
  Label,
  Grid,
  Row
} from "react-bootstrap";
import DatePicker from "react-16-bootstrap-date-picker";
import {
  getAllActivity,
  getActivityById,
  getAllDistrict,
  getSchoolBySchoolDegreeAndDistrict,
  getGradeBySchoolDegree,
  getallPosition,
  postActivity
} from "../api/creative_exp_api";
class Experience_Creative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listActivity: [],
      listDistrict: [],
      listDistrictNotRequired: [],
      listSchool: [],
      listGrade: [],
      listPosition: [],
      listSchoolDegree: [],
      listSectionAday: [],
      //This is information which will sent to server
      activityIdSelected: undefined,
      sectionADaySlected: undefined,
      dayJoinSlected: undefined,
      studentQuantity: undefined,
      schoolDegreeSlected: undefined,
      districtSlected: undefined,
      schoolNameSelected: undefined,
      gradeSlected: undefined,
      teacherName: undefined,
      positionSelected: undefined,
      email: undefined,
      phoneNumber: undefined,
      activityTitle: undefined,
      //
      error: {
        error: true,
        dayJoinError: undefined,
        teacherNameError: undefined,
        emailError: undefined,
        phoneNumberError: undefined,
        activityTitleError: undefined,
        studentQuantityError: undefined
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handelchangeDate = this.handelchangeDate.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  async componentDidMount() {
    //load all activity (program) from server
    const listActivities = await getAllActivity();

    //set state for list activity, activeSlected is set default at 0 index of list
    this.setState({
      listActivity: listActivities,
      activityIdSelected: listActivities[0].id
    });

    // load activity detail
    this._loadActivityDetail(this.state.activityIdSelected);

    //load all position
    this._loadPosition();
  }

  async _loadActivityDetail(activityId) {
    const activity = await getActivityById(activityId);
    this.setState({
      listSchoolDegree: activity.Program_Required_School_Degree,
      schoolDegreeSlected:
        activity.Program_Required_School_Degree[0].School_Degee.id,
      listSectionAday: activity.Day_Type_Enable.Day_Type_Enable_Section_A_Day,
      sectionADaySlected:
        activity.Day_Type_Enable.Day_Type_Enable_Section_A_Day[0].Session_A_Day
          .id
    });

    // program is not required district, so we need to load from all district from server
    if (!activity.Program_Required_District.length > 0) {
      const listDistrictNotRequired = await getAllDistrict();
      this.setState({
        listDistrictNotRequired,
        districtSlected: listDistrictNotRequired[0].id,
        schoolDegreeSlected:
          activity.Program_Required_School_Degree[0].School_Degee.id
      });
      this._loadSchool(
        activity.Program_Required_School_Degree[0].School_Degee.id,
        listDistrictNotRequired[0].id
      );

      // program required district, so district will contain in program which returned from server
    } else {
      const listDistrict = activity.Program_Required_District;
      this.setState({
        listDistrict: listDistrict,
        districtSlected: listDistrict[0].District.id
      });
      this._loadSchool(
        activity.Program_Required_School_Degree[0].School_Degee.id,
        listDistrict[0].District.id
      );
    }
    if (this.state.schoolDegreeSlected !== undefined) {
      this._loadGrade(this.state.schoolDegreeSlected);
    }
  }

  //load all position
  async _loadPosition() {
    const listPosition = await getallPosition();
    this.setState({
      listPosition: listPosition,
      positionSelected: listPosition[0].id
    });
  }
  //load grade by school degree
  async _loadGrade(schoolDegreeId) {
    const listGrade = await getGradeBySchoolDegree(schoolDegreeId);
    this.setState({ listGrade: listGrade, gradeSlected: listGrade[0].id });
  }
  //load school by schood degree and district
  async _loadSchool(schoolDegreeId, districtId) {
    const listSchool = await getSchoolBySchoolDegreeAndDistrict(
      this.state.schoolDegreeSlected,
      this.state.districtSlected
    );
    this.setState({
      listSchool
    });
  }
  async handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    const { activityIdSelected } = this.state;
    //check action is click to choose activity
    if (name === "activityIdSelected" && activityIdSelected !== value) {
      //load active detail
      this._loadActivityDetail(this.state.activityIdSelected);
    }
    //check action is choose school degree or district
    if (name === "schoolDegreeSlected" || name === "districtSlected") {
      this._loadSchool(
        this.state.schoolDegreeSlected,
        this.state.districtSlected
      );
    }
    if (name === "schoolDegreeSlected") {
      debugger;
      this._loadGrade(value);
      debugger;
    }
  }
  handelchangeDate(evt) {
    this.setState({ dayJoinSlected: evt });
  }
  //Notify error
  _getValidationStateDayJoined() {
    const { dayJoinSlected, error } = this.state;

    if (dayJoinSlected === undefined) {
      let error = { ...this.state.error };
      error.dayJoinError = "Vui lòng chọn ngày!";
      this.setState({ error: error });
    } else {
      let error = { ...this.state.error };
      error.dayJoinError = undefined;
      (error.error = false), this.setState({ error: error });
    }
    return null;
  }
  _getValidationStateStudentQuantity() {
    const { studentQuantity, error } = this.state;

    if (studentQuantity === undefined) {
      let error = { ...this.state.error };
      error.studentQuantityError = "Vui lòng điền số lượng học sinh tham gia!";
      this.setState({ error: error });
    } else {
      let error = { ...this.state.error };
      error.studentQuantityError = undefined;
      this.setState({ error: error });
    }
    return null;
  }
  //
  _getValidationStateTeacherName() {
    const { teacherName, error } = this.state;

    if (teacherName === undefined) {
      let error = { ...this.state.error };
      error.teacherNameError = "Vui lòng điền tên người hướng dẫn!";
      this.setState({ error: error });
    } else {
      let error = { ...this.state.error };
      error.teacherNameError = undefined;
      this.setState({ error: error });
    }
    return null;
  }
  //
  _getValidationStatePhoneNumber() {
    const { phoneNumber, error } = this.state;

    if (phoneNumber === undefined) {
      let error = { ...this.state.error };
      error.studentQuantityError = "Vui lòng điền số diện thoại!";
      this.setState({ error: error });
    } else {
      let error = { ...this.state.error };
      error.phoneNumberError = undefined;
      this.setState({ error: error });
    }
    return null;
  }
  //
  _getValidationStateActivityTitile() {
    const { activityTitle, error } = this.state;

    if (activityTitle === undefined) {
      let error = { ...this.state.error };
      error.activityTitleError = "Vui lòng điền tên chủ đề!";
      this.setState({ error: error });
    } else {
      let error = { ...this.state.error };
      error.activityTitleError = undefined;
      this.setState({ error: error });
    }
    return null;
  }
  //send data to server
  async handleSubmitForm() {
    const {
      studentQuantityError,
      teacherNameError,
      dayJoinError,
      emailError,
      phoneNumberError,
      activityTitleError,
      error
    } = this.state.error;

    this._getValidationStateDayJoined();
    this._getValidationStateActivityTitile();
    // this._getValidationStateStudentQuantity();
    // this._getValidationStatePhoneNumber();
    // this._getValidationStateTeacherName();
    if (
      studentQuantityError === undefined &&
      teacherNameError === undefined &&
      dayJoinError === undefined &&
      emailError === undefined &&
      phoneNumberError === undefined &&
      activityTitleError === undefined &&
      error === false
    ) {
      const activityPost = await postActivity(this.state);
    }
  }
  render() {
    const {
      listActivity,
      activity,
      listSchoolDegree,
      listDistrict,
      listDistrictNotRequired,
      listSchool,
      listGrade,
      listPosition,
      listSectionAday
    } = this.state;
    // console.log(listSchool);
    return (
      <Panel>
        <Panel.Heading>
          <h4>Trải nghiệm sáng tạo</h4>
        </Panel.Heading>
        <Panel.Body>
          <p className="text-waring text-warning">
            Lưu ý! Vui lòng điền thông tin theo thứ tự
          </p>
          <form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>
                1.Nội dung đăng kí{" "}
                <Label bsClass="text-danger">
                  <Glyphicon glyph="star" />
                </Label>
              </ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                name="activityIdSelected"
                value={this.state.activityIdSelected}
                onChange={this.handleInputChange}
              >
                {listActivity.length > 0
                  ? listActivity.map((activity, index) => (
                      <option
                        key={activity.id}
                        value={activity.id}
                      >{`${(index += 1)}. ${activity.name}`}</option>
                    ))
                  : null}
              </FormControl>
            </FormGroup>
            <Row>
              <Col md={4}>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>
                    2.Cấp trường tham gia{" "}
                    <Label bsClass="text-danger">
                      <Glyphicon glyph="star" />
                    </Label>
                  </ControlLabel>
                  <FormControl
                    componentClass="select"
                    value={this.state.schoolDegreeSlected}
                    name="schoolDegreeSlected"
                    onChange={this.handleInputChange}
                  >
                    {listSchoolDegree.length > 0
                      ? listSchoolDegree.map(schoolDegree => (
                          <option
                            key={schoolDegree.School_Degee.id}
                            value={schoolDegree.School_Degee.id}
                          >
                            {schoolDegree.School_Degee.name}
                          </option>
                        ))
                      : null}
                  </FormControl>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>
                    3.Quận{" "}
                    <Label bsClass="text-danger">
                      <Glyphicon glyph="star" />
                    </Label>
                  </ControlLabel>
                  <FormControl
                    componentClass="select"
                    name="districtSlected"
                    value={this.state.districtSlected}
                    onChange={this.handleInputChange}
                  >
                    {listDistrict.length > 0
                      ? listDistrict.map(districts => (
                          <option
                            key={districts.District.id}
                            value={districts.District.id}
                          >{`${districts.District.name}`}</option>
                        ))
                      : listDistrictNotRequired.length > 0
                        ? listDistrictNotRequired.map(districts => (
                            <option key={districts.id} value={districts.id}>{`${
                              districts.name
                            }`}</option>
                          ))
                        : null}
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>
                    4.Trường{" "}
                    <Label bsClass="text-danger">
                      <Glyphicon glyph="star" />
                    </Label>
                  </ControlLabel>
                  <FormControl
                    componentClass="select"
                    name="schoolNameSelected"
                    value={this.state.schoolNameSelected}
                    onChange={this.handleInputChange}
                  >
                    {listSchool.length > 0
                      ? listSchool.map(schools => (
                          <option key={schools.id} value={schools.id}>{`${
                            schools.name
                          }`}</option>
                        ))
                      : null}
                  </FormControl>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>
                    5.Khối lớp{" "}
                    <Label bsClass="text-danger">
                      <Glyphicon glyph="star" />
                    </Label>
                  </ControlLabel>
                  <FormControl
                    componentClass="select"
                    onChange={this.handleInputChange}
                    value={this.state.gradeSlected}
                    name="gradeSlected"
                  >
                    {listGrade.length > 0
                      ? listGrade.map(grades => (
                          <option key={grades.id} value={grades.id}>{`${
                            grades.name
                          }`}</option>
                        ))
                      : null}
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>
                    6.Tham gia vào buổi{" "}
                    <Label bsClass="text-danger">
                      <Glyphicon glyph="star" />
                    </Label>
                  </ControlLabel>
                  {/* <Col sm={4} > */}
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    name="sectionADaySlected"
                    value={this.state.sectionADaySlected}
                  >
                    {listSectionAday.length > 0
                      ? listSectionAday.map(sessions => (
                          <option
                            key={sessions.Session_A_Day.id}
                            value={sessions.Session_A_Day.id}
                          >{`${sessions.Session_A_Day.name}`}</option>
                        ))
                      : null}
                  </FormControl>
                  {/* </Col> */}
                </FormGroup>
              </Col>
              <Col sm={8}>
                <FormGroup
                  validationState={
                    this.state.error.dayJoinError !== undefined ? "error" : null
                  }
                >
                  <ControlLabel>
                    7.Ngày tham gia{" "}
                    <Label bsClass="text-danger">
                      <Glyphicon glyph="star" />
                    </Label>
                  </ControlLabel>
                  <DatePicker
                    onChange={this.handelchangeDate}
                    name="dayJoinSlected"
                    value={this.state.dayJoinSlected}
                    id="example-datepicker"
                    cellPadding="10px"
                    showTodayButton={true}
                    todayButtonLabel={"Hôm nay"}
                    dateFormat={"DD/MM/YYYY"}
                    dayLabels={["CN", "T2", "T3", "T4", "T5", "T6", "T7"]}
                    monthLabels={[
                      "Tháng 1",
                      "Tháng 2",
                      "Tháng 3",
                      "Tháng 4",
                      "Tháng 5",
                      "Tháng 6",
                      "Tháng 7",
                      "Tháng 8",
                      "Tháng 9",
                      "Tháng 10",
                      "Tháng 11",
                      "Tháng 12"
                    ]}
                  />
                  <FormControl.Feedback />
                  <HelpBlock bsStyle>{this.state.error.dayJoinError}</HelpBlock>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup
                  controlId="formBasicText"
                  validationState={
                    this.state.error.studentQuantityError !== undefined
                      ? "error"
                      : null
                  }
                >
                  <ControlLabel>
                    8.Số lượng hoc sinh tham gia{" "}
                    <Label bsClass="text-danger">
                      <Glyphicon glyph="star" />
                    </Label>
                  </ControlLabel>
                  <FormControl
                    type="number"
                    placeholder="Số lượng"
                    onChange={this.handleInputChange}
                    name="studentQuantity"
                    value={this.state.studentQuantity}
                  />
                  <FormControl.Feedback />
                  <HelpBlock bsClass={"text-warning"}>
                    Tối đa hoc sinh có thể đăng kí 100
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={6} md={6}>
                <FormGroup
                  controlId="formBasicText"
                  validationState={
                    this.state.error.teacherNameError !== undefined
                      ? "error"
                      : null
                  }
                >
                  <ControlLabel>
                    9.Người phụ trách <i>(Ghi rõ họ và tên)</i>{" "}
                    <Label bsClass="text-danger">
                      <Glyphicon glyph="star" />
                    </Label>
                  </ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Người phụ trách"
                    onChange={this.handleInputChange}
                    name="teacherName"
                    value={this.state.teacherName}
                  />
                  <FormControl.Feedback />
                  <HelpBlock bsStyle>
                    {this.state.error.teacherNameError}
                  </HelpBlock>
                </FormGroup>
              </Col>
              <Col sm={6} md={6}>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>
                    10.Chức vụ{" "}
                    <Label bsClass="text-danger">
                      <Glyphicon glyph="star" />
                    </Label>
                  </ControlLabel>
                  <FormControl
                    componentClass="select"
                    onChange={this.handleInputChange}
                    name="positionSelected"
                    value={this.state.positionSelected}
                  >
                    {listPosition.length > 0
                      ? listPosition.map(positions => (
                          <option key={positions.id} value={positions.id}>{`${
                            positions.name
                          }`}</option>
                        ))
                      : null}
                  </FormControl>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup
                  controlId="formBasicText"
                  validationState={
                    this.state.error.emailError !== undefined ? "error" : null
                  }
                >
                  <ControlLabel>
                    11.Email{" "}
                    <Label bsClass="text-danger">
                      <Glyphicon glyph="star" />
                    </Label>
                  </ControlLabel>
                  <FormControl
                    type="email"
                    placeholder="email"
                    onChange={this.state.handleInputChange}
                    value={this.state.email}
                    name="email"
                  />
                  <FormControl.Feedback />
                  <HelpBlock bsStyle>{this.state.error.emailError}</HelpBlock>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup
                  controlId="formBasicText"
                  validationState={
                    this.state.error.phoneNumberError !== undefined
                      ? "error"
                      : null
                  }
                >
                  <ControlLabel>
                    12.Số điện thoại{" "}
                    <Label bsClass="text-danger">
                      <Glyphicon glyph="star" />
                    </Label>
                  </ControlLabel>
                  <FormControl
                    type="number"
                    placeholder="Số điện thoại"
                    onChange={this.handleInputChange}
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                  />
                  <FormControl.Feedback />
                  <HelpBlock bsStyle>
                    {this.state.error.phoneNumberError}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup
              controlId="formBasicText"
              validationState={
                this.state.error.activityTitleError !== undefined
                  ? "error"
                  : null
              }
            >
              <ControlLabel>
                13.Tên chủ đề đăng kí{" "}
                <Label bsClass="text-danger">
                  <Glyphicon glyph="star" />
                </Label>
              </ControlLabel>
              <FormControl
                type="text"
                placeholder="Tên chủ đề đăng kí"
                onChange={this.handleInputChange}
                name="activityTitle"
                value={this.state.activityTitle}
              />
              <FormControl.Feedback />
              <HelpBlock bsStyle>
                {this.state.error.activityTitleError}
              </HelpBlock>
            </FormGroup>
          </form>
        </Panel.Body>
        <Panel.Footer>
          <Button bsStyle="primary" block onClick={this.handleSubmitForm}>
            Đăng kí
          </Button>
        </Panel.Footer>
      </Panel>
    );
  }
}

export default Experience_Creative;
