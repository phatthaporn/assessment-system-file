module.exports = (sequelize, Sequelize) => {
  const Assessments = sequelize.define(
    "assessments",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
      },
      sub_title: {
        type: Sequelize.TEXT,
      },
      publish: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      }
    },
    {
      deletedAt: "deletedAt",
      paranoid: true,
      timestamps: true,
    }
  );
  return Assessments;
};
