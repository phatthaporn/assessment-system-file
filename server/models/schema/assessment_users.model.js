module.exports = (sequelize, Sequelize) => {
    const AssessmentUsers = sequelize.define("assessment_users", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        point: {
            type: Sequelize.INTEGER,
        },
    })
    return AssessmentUsers;
}