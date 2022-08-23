const { Users } = require("../../../models/index.model");
const jwtFunction = require("../../../utils/jwt-function");

const resetPassword = async (password, oldPassword, userId) => {
  try {
    const result = await Users.findOne({where: {id: userId}});
    if(await jwtFunction.compareData(oldPassword, result.password)) {
        const hash = await jwtFunction.hashData(password);
        await Users.update({password: hash}, {where: {id: userId}});
        return ({status: "success", message: "Update password successfully." });
    }
    return ({ status: "fail", message: "Password is not compare!"})
  } catch (err) {
    return err;
  }
};

module.exports = resetPassword;
