const {
  Assessments,
  AssessmentConditions,
  FacultyMajors,
  Faculties,
  Users,
  AssessmentHistories,
} = require("../../../models/index.model");
const calcuratePoint = require("../utils/calcurate-point");

const getAll = async (roleId, userId) => {
  try {
    if (roleId === "fbb84c66-5916-45bb-bc70-d1785fa5d14c") {
      const result = await Assessments.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: FacultyMajors,
            attributes: ["id", "name", "facultyId"],
            include: { model: Faculties, attributes: ["id", "name"] },
          },
          { model: Users, attributes: ["firstname", "lastname"] },
        ],
      });
      return { status: "success", result };
    } else {
      const result = await Assessments.findAll({
        where: {userId: userId},
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: FacultyMajors,
            attributes: ["id", "name", "facultyId"],
            include: { model: Faculties, attributes: ["id", "name"] },
          },
          { model: Users, attributes: ["firstname", "lastname"] },
        ],
      });
      return { status: "success", result };
    }
  } catch (err) {
    return err;
  }
};

const setPublish = async (id, publish) => {
  try {
    const result = await Assessments.update({ publish }, { where: { id } });
    return { status: "success", result };
  } catch (err) {
    return err;
  }
};

const getByFacultyMajor = async (id, roleId, userId) => {
  try {
    if (roleId === "fbb84c66-5916-45bb-bc70-d1785fa5d14c") {
      const result = await Assessments.findAll({
        where: { facultyMajorId: id },
        order: [["createdAt", "ASC"]],
        include: { model: AssessmentConditions },
      });
      return { status: "success", result };
    }else {
      const result = await Assessments.findAll({
        where: { facultyMajorId: id, userId },
        order: [["createdAt", "ASC"]],
        include: { model: AssessmentConditions },
      });
      return { status: "success", result };
    }
    
  } catch (err) {
    return err;
  }
};

const findById = async (id) => {
  try {
    const result = await Assessments.findOne({
      where: { id, publish: true },
      include: { model: AssessmentConditions },
    });
    return { status: "success", result };
  } catch (err) {
    return err;
  }
};

const create = async (body, userId) => {
  try {
    const assessmentResult = await Assessments.create({
      title: body.title,
      sub_title: body.sub_title,
      facultyMajorId: body.facultyMajorId,
      userId,
    });
    if (assessmentResult !== undefined) {
      await body.conditions?.forEach(async (element) => {
        await AssessmentConditions.create({
          description: element.description,
          examinations: element.examinations,
          assessmentId: assessmentResult.id,
        });
      });
    }
    return {
      status: "success",
      result: assessmentResult,
      message: "Add assessment form successfully.",
    };
  } catch (err) {
    return err;
  }
};

const update = async (assessment, conditions, id) => {
  try {
    await Assessments.update(assessment, { where: { id } });
    await AssessmentConditions.destroy({ where: { assessmentId: id } }).then(
      async () => {
        await conditions.forEach(async (el) => {
          await AssessmentConditions.create({
            description: el.description,
            examinations: el.examinations,
            assessmentId: id,
          });
        });
      }
    );
    return { status: "success", message: "Update assessment successfully." };
  } catch (err) {
    return err;
  }
};

const destroy = async (id) => {
  try {
    await AssessmentConditions.destroy({ where: { assessmentId: id } });
    await AssessmentHistories.destroy({ where: { assessmentId: id }});
    await Assessments.destroy({ where: { id: id } });
    return { status: "success", result: "Delete successfully." };
  } catch (err) {
    return err;
  }
};

const checkEmail = async (id, email) => {
  try {
    const result = await AssessmentHistories.findAll({
      where: { email, assessmentId: id },
    });
    if (result.length !== 0) {
      return { status: "fail", message: "You having answer in database!" };
    }
    return { status: "success", message: "Pass to do question." };
  } catch (err) {
    return err;
  }
};

const saveAnswer = async (answer, detail, id) => {
  try {
    let total_points = 0;
    let points = [];
    await answer.forEach(async (el) => {
      await el.examinations.forEach(async (element) => {
        let calPoint = await calcuratePoint(element.answer);
        total_points += calPoint;
        await points.push({
          point: calPoint,
          description: element.description,
        });
      });
    });
    const result = await AssessmentHistories.create({
      email: detail.detail === undefined ? "Unknown person" : detail.detail,
      gender: detail.gender,
      age: detail.age,
      points: points,
      total_points: total_points,
      assessmentId: id,
    });
    return { status: "success", result };
  } catch (err) {
    return err;
  }
};

const homeInfo = async (roleId, userId) => {
  try {
    if (roleId === "fbb84c66-5916-45bb-bc70-d1785fa5d14c") {
      const allDoAssessment = await AssessmentHistories.findAll({
        attributes: ["id"],
      });
      const allAssessment = await Assessments.findAll({
        order: [["createdAt", "DESC"]],
        include: { model: AssessmentConditions, attributes: ["id"] },
      });
      const tableAssessment = await Assessments.findAll({
        where: { publish: true },
        order: [["createdAt", "DESC"]],
        include: { model: AssessmentConditions, attributes: ["id"] },
      });
      const allUsers = await Users.findAll({ attributes: ["id"] });
      return {
        status: "success",
        allDoAssessment,
        allAssessment,
        allUsers,
        tableAssessment,
      };
    } else {
      const allDoAssessment = await AssessmentHistories.findAll({
        include: { model: Assessments, where: { userId: userId } },
        attributes: ["id"],
      });
      const allAssessment = await Assessments.findAll({
        where: { userId: userId },
        order: [["createdAt", "DESC"]],
        include: { model: AssessmentConditions, attributes: ["id"] },
      });
      const tableAssessment = await Assessments.findAll({
        where: { publish: true, userId: userId },
        order: [["createdAt", "DESC"]],
        include: { model: AssessmentConditions, attributes: ["id"] },
      });
      const allUsers = [];
      return {
        status: "success",
        allDoAssessment,
        allAssessment,
        allUsers,
        tableAssessment,
      };
    }
  } catch (err) {
    return err;
  }
};

const reportById = async (id) => {
  try {
    const result = await AssessmentHistories.findAll({
      where: { assessmentId: id },
      order: [["createdAt", "ASC"]],
    });
    return { status: "success", result };
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAll,
  getByFacultyMajor,
  findById,
  create,
  update,
  destroy,
  checkEmail,
  saveAnswer,
  homeInfo,
  reportById,
  setPublish,
};
