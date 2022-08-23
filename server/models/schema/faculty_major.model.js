module.exports = (sequelize, Sequelize) => {
    const FacultyMajors = sequelize.define("faculty_majors", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
        }
    })
    return FacultyMajors;
}