module.exports = (sequelize, Sequelize) => {
    const Faculties = sequelize.define("faculties", {
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
    return Faculties;
}