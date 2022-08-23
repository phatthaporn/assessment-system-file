module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define("roles", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
        },
        display_name: {
            type: Sequelize.STRING,
        }
    })
    return Roles;
}