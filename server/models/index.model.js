const { Sequelize } = require("sequelize");
const { host_postgres, config_postgres } = require("../connection/setup-sequelize");

const sequelize = new Sequelize(host_postgres, config_postgres);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./schema/users.model")(sequelize, Sequelize);
db.Assessments = require("./schema/assessments.model")(sequelize, Sequelize);
db.AssessmentConditions = require("./schema/assessment_conditions.model")(sequelize, Sequelize);
db.Faculties = require("./schema/faculty.model")(sequelize, Sequelize);
db.FacultyMajors = require("./schema/faculty_major.model")(sequelize, Sequelize);
db.AssessmentHistories = require('./schema/assessment_history.model')(sequelize, Sequelize);
db.Roles = require("./schema/roles.model")(sequelize, Sequelize);

db.Users.hasMany(db.Assessments);
db.Assessments.belongsTo(db.Users);
db.Faculties.hasMany(db.FacultyMajors);
db.FacultyMajors.belongsTo(db.Faculties);
db.FacultyMajors.hasMany(db.Assessments);
db.Assessments.belongsTo(db.FacultyMajors);
db.AssessmentConditions.belongsTo(db.Assessments);
db.Assessments.hasMany(db.AssessmentConditions);
db.AssessmentHistories.belongsTo(db.Assessments);
db.Assessments.hasMany(db.AssessmentHistories);
db.Users.belongsTo(db.Roles);
db.Roles.hasMany(db.Users);

module.exports = db;