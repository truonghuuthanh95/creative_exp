import {
  BASE_URL,
  GET_ALL_PROGRAMS,
  GET_ALL_DISTRICT,
  GET_PROGRAM_BY_ID,
  GET_SHOOL_BY_DISTRICT_AND_SCHOOL_DEGREE,
  GET_GRADE_BY_SCHOOL_DEGREE,
  GET_ALL_POSITION,
  POST_ACTIVITY,
  GET_VALID_STUDENT_QUANTITY,
  GET_CREATIVE_EXP_REGISTED_BY_ACTIVE_ID,
  EXPORT_EXCEL_CREATIVE_EXP
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
      school_id: activityObj.schoolNameSelected,
      student_quantity: activityObj.studentQuantity,
      creator: activityObj.teacherName,
      position_id: activityObj.positionSelected,
      program_id: activityObj.activityIdSelected,
      date_registed: activityObj.dayJoinSlected,
      school_degree_id: activityObj.schoolDegreeSlected,
      class_id: activityObj.gradeSlected,
      day_session_id: activityObj.sectionADaySlected
    })
  }).then(res => res.json());
}

export function getValidStudentQuantity(program_id, sesstionADayId, time) {
  return fetch(
    `${BASE_URL +
      GET_VALID_STUDENT_QUANTITY}/${program_id}/${sesstionADayId}/${time}`
  ).then(res => res.json());
}

export function getListCreativeExpRegistedByActiveId(programId) {
  return fetch(`${BASE_URL + GET_CREATIVE_EXP_REGISTED_BY_ACTIVE_ID}/${programId}`).then(
    res => res.json()
  );
}

export function exportExcelCreaticeExp(programId){
  return fetch(`${BASE_URL + EXPORT_EXCEL_CREATIVE_EXP}/${programId}`);
}
