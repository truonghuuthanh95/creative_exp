import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  HelpBlock,
  Panel,
  Col,
  Glyphicon,
  Label,
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
  postActivity,
  getValidStudentQuantity
} from "../api/creative_exp_api";
import moment from "moment";
import { withRouter } from "react-router-dom";
class Experience_Creative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      validStudentQuantity: "",
      listActivity: [],
      listDistrict: [],
      listDistrictNotRequired: [],
      listSchool: [],
      listGrade: [],
      listPosition: [],
      listSchoolDegree: [],
      listSectionAday: [],
      //This is information which will sent to server
      activityIdSelected: "",
      sectionADaySlected: "",
      dayJoinSlected: "",
      studentQuantity: "",
      schoolDegreeSlected: "",
      districtSlected: "",
      schoolNameSelected: "",
      gradeSlected: "",
      teacherName: "",
      positionSelected: "",
      emailEntered: "",
      phoneNumber: "",
      activityTitle: "",
      //
      error: {
        error: true,
        dayJoinError: undefined,
        teacherNameError: undefined,
        emailEnteredError: undefined,
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
    await this._loadActivityDetail(this.state.activityIdSelected);

    //load all position
    await this._loadPosition();
  }

  async _loadActivityDetail(activityId) {
    const activity = await getActivityById(activityId);
    await this.setState({
      listSchoolDegree: activity.Program_Required_School_Degree,
      schoolDegreeSlected:
        activity.Program_Required_School_Degree[0].School_Degee.id,
      listSectionAday: activity.Day_Type_Enable.Day_Type_Enable_Section_A_Day,
      sectionADaySlected:
        activity.Day_Type_Enable.Day_Type_Enable_Section_A_Day[0].Session_A_Day
          .id
    });

    // program is not required district, so we need to load all district from server
    if (!activity.Program_Required_District.length > 0) {
      const listDistrictNotRequired = await getAllDistrict();
      await this.setState({
        listDistrictNotRequired,
        districtSlected: listDistrictNotRequired[0].id,
        schoolDegreeSlected:
          activity.Program_Required_School_Degree[0].School_Degee.id,
        listDistrict: []
      });
      await this._loadSchool(
        activity.Program_Required_School_Degree[0].School_Degee.id,
        listDistrictNotRequired[0].id
      );

      // program required district, so district will contain in program which returned from server
    } else {
      const listDistrict = activity.Program_Required_District;
      await this.setState({
        listDistrict: listDistrict,
        listDistrictNotRequired: [],
        districtSlected: listDistrict[0].District.id
      });
      await this._loadSchool(
        activity.Program_Required_School_Degree[0].School_Degee.id,
        listDistrict[0].District.id
      );
    }
    if (this.state.schoolDegreeSlected !== undefined) {
      await this._loadGrade(this.state.schoolDegreeSlected);
    }
  }

  //load all position
  async _loadPosition() {
    const listPosition = await getallPosition();
    await this.setState({
      listPosition: listPosition,
      positionSelected: listPosition[0].id
    });
  }
  //load grade by school degree
  async _loadGrade(schoolDegreeId) {
    const listGrade = await getGradeBySchoolDegree(schoolDegreeId);
    await this.setState({
      listGrade: listGrade,
      gradeSlected: listGrade[0].id
    });
  }
  //load school by schood degree and district
  async _loadSchool(schoolDegreeId, districtId) {
    const listSchool = await getSchoolBySchoolDegreeAndDistrict(
      this.state.schoolDegreeSlected,
      this.state.districtSlected
    );
    await this.setState({
      listSchool: listSchool,
      schoolNameSelected: listSchool[0].id
    });
  }
  async _loadValidStudentQuantity(programId, sessionADayId, time) {
    const validStudentQuantity = await getValidStudentQuantity(
      programId,
      sessionADayId,
      time
    );
    await this.setState({ validStudentQuantity });
  }
  async handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    await this.setState({
      [name]: value
    });
    const { activityIdSelected } = this.state;
    //check action is click to choose activity

    if (name === "activityIdSelected") {
      //load active detail
      debugger;
      await this._loadActivityDetail(this.state.activityIdSelected);
    }
    //check action is choose school degree or district
    if (name === "schoolDegreeSlected" || name === "districtSlected") {
      await this._loadSchool(
        this.state.schoolDegreeSlected,
        this.state.districtSlected
      );
    }
    if (name === "schoolDegreeSlected") {
      await this._loadGrade(value);
    }
    if (name === "sectionADaySlected" && this.state.dayJoinSlected !== "") {
      await this._loadValidStudentQuantity(
        this.state.activityIdSelected,
        this.state.sectionADaySlected,
        this.state.dayJoinSlected
      );
    }
  }
  async handelchangeDate(evt) {
    const time = moment(evt).format("YYYY-MM-DD");
    await this.setState({ dayJoinSlected: time });
    await this._loadValidStudentQuantity(
      this.state.activityIdSelected,
      this.state.sectionADaySlected,
      this.state.dayJoinSlected
    );
  }
  //Notify error
  _getValidationStateDayJoined() {
    const { dayJoinSlected, error } = this.state;

    if (dayJoinSlected === "") {
      let error = { ...this.state.error };
      error.dayJoinError = "Vui lòng chọn ngày!";
      this.setState({ error: error });
    } else {
      let error = { ...this.state.error };
      error.dayJoinError = undefined;
      (error.error = false), this.setState({ error: error });
    }
  }
  _getValidationStateStudentQuantity() {
    const { studentQuantity, error, validStudentQuantity } = this.state;

    if (studentQuantity === "") {
      let error = { ...this.state.error };
      error.studentQuantityError = "Vui lòng điền số lượng học sinh tham gia!";
      this.setState({ error: error });
    } else if (studentQuantity > validStudentQuantity) {
      let error = { ...this.state.error };
      error.studentQuantityError = "Số lượng học sinh tham gia không hợp lệ!";
      this.setState({ error: error });
    } else {
      let error = { ...this.state.error };
      error.studentQuantityError = undefined;
      this.setState({ error: error });
    }
  }
  //
  _getValidationStateTeacherName() {
    const { teacherName, error } = this.state;
    console.log("aaa");
    if (teacherName === "") {
      let error = { ...this.state.error };
      error.teacherNameError = "Vui lòng điền tên người hướng dẫn!";
      this.setState({ error: error });
    } else {
      let error = { ...this.state.error };
      error.teacherNameError = undefined;
      this.setState({ error: error });
    }
  }
  //
  _getValidationStateEmail() {
    const { emailEntered, error } = this.state;

    if (emailEntered === "") {
      let error = { ...this.state.error };
      error.emailEnteredError = "Vui lòng điền địa chỉ email!";
      this.setState({ error: error });
    } else {
      let error = { ...this.state.error };
      error.emailEnteredError = undefined;
      this.setState({ error: error });
    }
  }
  //
  _getValidationStatePhoneNumber() {
    const { phoneNumber, error } = this.state;

    if (phoneNumber === "") {
      let error = { ...this.state.error };
      error.phoneNumberError = "Vui lòng điền số diện thoại!";
      this.setState({ error: error });
    } else {
      let error = { ...this.state.error };
      error.phoneNumberError = undefined;
      this.setState({ error: error });
    }
  }
  //
  _getValidationStateActivityTitile() {
    const { activityTitle, error } = this.state;

    if (activityTitle === "") {
      let error = { ...this.state.error };
      error.activityTitleError = "Vui lòng điền tên chủ đề!";
      this.setState({ error: error });
    } else {
      let error = { ...this.state.error };
      error.activityTitleError = undefined;
      this.setState({ error: error });
    }
  }
  async validateData() {
    await this._getValidationStateDayJoined();
    await this._getValidationStateActivityTitile();
    await this._getValidationStateStudentQuantity();
    await this._getValidationStatePhoneNumber();
    await this._getValidationStateTeacherName();
    await this._getValidationStateEmail();
  }
  //send data to server
  async handleSubmitForm() {
    const {
      studentQuantityError,
      teacherNameError,
      dayJoinError,
      emailEnteredError,
      phoneNumberError,
      activityTitleError,
      error
    } = this.state.error;

    // await this._getValidationStateDayJoined();
    // await this._getValidationStateActivityTitile();
    // await this._getValidationStateStudentQuantity();
    // await this._getValidationStatePhoneNumber();
    // await this._getValidationStateTeacherName();
    // await this._getValidationStateEmail();
    await this.validateData().then(async () => {
      if (
        studentQuantityError === undefined &&
        teacherNameError === undefined &&
        dayJoinError === undefined &&
        emailEnteredError === undefined &&
        phoneNumberError === undefined &&
        activityTitleError === undefined &&
        error === false
      ) {
        debugger;
        this.setState({ isloading: true });
        await postActivity(this.state).then(res => {
          localStorage.setItem('activityKey', res.id);
          this.setState({ isloading: false });
          this.props.history.push("/dangkitrainghiem_thanhcong");
        });
      }
    });
    debugger;
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
      listSectionAday,
      loading
    } = this.state;
    console.log(this.state.validStudentQuantity);
    if (loading === true) {
      return <div className="loader" />;
    }
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
                    onChange={this.handleInputChange}
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
                  {/* <Row> */}
                  {/* <Col md={6}> */}
                  <HelpBlock bsClass={"text-warning"}>
                    Tối đa hoc sinh có thể đăng kí{" "}
                    {this.state.validStudentQuantity}
                  </HelpBlock>
                  {/* </Col> */}
                  {/* <Col md={6}> */}
                  <HelpBlock>{this.state.error.studentQuantityError}</HelpBlock>
                  {/* </Col> */}
                  {/* </Row> */}
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
                    this.state.error.emailEnteredError !== undefined
                      ? "error"
                      : null
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
                    placeholder="Email"
                    onChange={this.handleInputChange}
                    value={this.state.emailEntered}
                    name="emailEntered"
                  />
                  <FormControl.Feedback />
                  <HelpBlock bsStyle>
                    {this.state.error.emailEnteredError}
                  </HelpBlock>
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
          <Button
            bsStyle="primary"
            block
            onClick={() => this.handleSubmitForm()}
          >
            Đăng kí
          </Button>
        </Panel.Footer>
      </Panel>
    );
  }
}

export default withRouter(Experience_Creative);
