import {
  BASE_URL,
  GET_ALL_PROGRAMS,
  GET_ALL_DISTRICT,
  GET_PROGRAM_BY_ID,
  GET_SHOOL_BY_DISTRICT_AND_SCHOOL_DEGREE,
  GET_GRADE_BY_SCHOOL_DEGREE,
  GET_ALL_POSITION,
  POST_ACTIVITY,
  GET_VALID_STUDENT_QUANTITY
} from "./baseUrl";

export function getAllActivity() {
  return fetch(`${BASE_URL + GET_ALL_PROGRAMS}`).then(res => res.json());
}

export function getActivityById(id) {
  return fetch(`${BASE_URL + GET_PROGRAM_BY_ID}/${id}`).then(res => res.json());
}

export function getAllDistrict() {
  return fetch(`${BASE_URL + GET_ALL_DISTRICT}`).then(res => res.json());
}

export function getSchoolBySchoolDegreeAndDistrict(schoolDegreeId, districtId) {
  return fetch(
    `${BASE_URL +
      GET_SHOOL_BY_DISTRICT_AND_SCHOOL_DEGREE}/${districtId}/${schoolDegreeId}`
  ).then(res => res.json());
}

export function getGradeBySchoolDegree(schoolDegreeId) {
  return fetch(
    `${BASE_URL + GET_GRADE_BY_SCHOOL_DEGREE}/${schoolDegreeId}`
  ).then(res => res.json());
}

export function getallPosition() {
  return fetch(`${BASE_URL + GET_ALL_POSITION}`).then(res => res.json());
}

export function postActivity(activityObj) {
  return fetch(`${BASE_URL + POST_ACTIVITY}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      
        school_id: 500,
        student_quantity: 20,
        grade_id: 9,
        creator: "sample string 4",
        position_id: 2,
        program_id: 1,
        date_registed: "2018-04-15T13:06:35.8852006+07:00",
        school_degree_id: 4,
        class_id: 9,
        day_session_id: 2
      
    })
  }).then(res => res.json());
}

export function getValidStudentQuantity(program_id, sesstionADayId, time) {
  return fetch(
    `${BASE_URL +
      GET_VALID_STUDENT_QUANTITY}/${program_id}/${sesstionADayId}/${time}`
  ).then(res => res.json());
}
