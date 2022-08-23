module.exports = (sequelize, Sequelize) => {
  const AssessmentConditions = sequelize.define(
    "assessment_conditions",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      examinations: {
        type: Sequelize.ARRAY(Sequelize.JSON),
      },
    },
  );
  return AssessmentConditions;
};
