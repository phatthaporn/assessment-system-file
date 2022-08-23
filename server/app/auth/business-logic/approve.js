const { Users, Roles } = require("../../../models/index.model")

const approve = async (data, roleId, userCreated) => {
    try {
        let user = await Users.findAll({where: {email: data.email}});
        if(user.length === 0) {
            return ({status: "fail", message: "Not found user!" })
        }
        await Users.update({ 
            status: 1,
            roleId: roleId,
            approvedBy: userCreated.email
         }, {where: {id: data.id}});
         return ({ status: "success", result: {...user[0], status: 1, roleId, approvedBy: userCreated.email} })
    }catch(err) {
        return err
    }
}

module.exports = approve;