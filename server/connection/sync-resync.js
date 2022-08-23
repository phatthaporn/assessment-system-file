const seeder = require("../models/seeders/index.seeder");

module.exports = (reSync, db) => {
    const alter = false;
    if(reSync) {
        db.sequelize.sync({ force: true })
        .then(async () => {
            await seeder();
            console.log("re-sync successfully.");
        })
    }else {
        db.sequelize.sync({ alter }).then(() => console.log("sync successfully."))
    }
}