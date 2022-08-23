const userSeeder = require("./users")
const facultySeeder = require("./faculty")
const facultyMajorSeeder = require("./faculty-major/index")
const assessmentSeeder = require("./assessment/index")
const assessmentConditionSeeder = require("./assessment-condition/index")
const roleSeeder = require("./roles/index")

module.exports = async function() {
    try {
        await roleSeeder();
        await userSeeder();
        await facultySeeder();
        await facultyMajorSeeder();
        await assessmentSeeder();
        await assessmentConditionSeeder();
    }catch(err) { console.log(err)}
}