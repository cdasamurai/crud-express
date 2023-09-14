const connection = require("./db");

async function insertClassAndCourse(data) {
    const classSql = "INSERT INTO class (name) VALUES (?)";
    const courseSql = "INSERT INTO course (name) VALUES (?)";
    const classCourseSql = "INSERT INTO class_course (course_id, class_id) VALUES (?, ?)";

    return connection.promise().query(classSql, Object.values(data.class))
        .then(async ([rows]) => {
            return rows.insertId;
        })
        .then(async (classId) => {
            return connection
                .promise()
                .query(courseSql, Object.values(data.course))
                .then(async ([rows]) => {
                    return {course_id: rows.insertId, class_id: classId}
                });
        })
        .then(response => {
            return connection
                .promise()
                .query(classCourseSql, Object.values(response))
                .then(async ([rows]) => {
                    return {status: 201, message: "Super"}
                });
        })
        .catch(error => {
            return {status: 500, error: error}
        })
}

module.exports = {insertClassAndCourse};