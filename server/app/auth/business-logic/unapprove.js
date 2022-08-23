const { Users } = require("../../../models/index.model")

const unApprove = async (data) => {
    try {
        await Users.destroy({where: {id: data.id}});
         return ({ status: "success", result: "Destroy this user successfully" })
    }catch(err) {
        return err
    }
}

module.exports = unApprove;