module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      firstname: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      approvedBy: {
        type: Sequelize.STRING,
      },
    },
    {
      deletedAt: "deletedAt",
      paranoid: true,
      timestamps: true,
    }
  );
  return Users;
};
