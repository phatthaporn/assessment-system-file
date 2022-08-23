const { Users } = require("../../../models/index.model")
const jwtFunction = require("../../../utils/jwt-function");

const signUp = async (data) => {
    try {
        const oldUser = await Users.findAll({where: {email: data.email}});
        if(oldUser.length !== 0) {
            return ({ status: "fail", data: 'Users already has!'})
        }
        const hash = await jwtFunction.hashData(data.password);
        const result = await Users.create({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: hash,
            approvedBy: null,
            roleId: null,
       });
       return ({ status: "success", data: result })
    }catch(err) {return err}
}

module.exports = signUp;