const { Roles } = require("../../index.model")

module.exports = () => {
    return Roles.bulkCreate([
        {
            "id": "fbb84c66-5916-45bb-bc70-d1785fa5d14c",
            "name": "admin",
            "display_name": "ผู้พัฒนาระบบ"
        },
        {
            "id": "23e5eba9-ead3-40d4-a1eb-daf08165a788",
            "name": "stuff",
            "display_name": "เจ้าหน้าที่"
        }
    ])
}