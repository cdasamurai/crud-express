const {insertClassAndCourse} = require('../../model/ClassManager');

async function createClassAndCourseController(req, res) {
    const {status, message} = await insertClassAndCourse(req.body);

    return res.status(status).json(message)
}

module.exports = createClassAndCourseController;