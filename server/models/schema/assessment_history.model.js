module.exports = (sequelize, Sequelize) => {
  const AssessmentHistories = sequelize.define("assessment_histories", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    detail: {
      type: Sequelize.STRING,
      defaultValue: "Unknown person",
    },
    gender: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.STRING,
    },
    points: {
      type: Sequelize.ARRAY(Sequelize.JSON),
    },
    recommend: {
      type: Sequelize.TEXT,
    },
    total_points: {
      type: Sequelize.INTEGER,
    },
  });
  return AssessmentHistories;
};
