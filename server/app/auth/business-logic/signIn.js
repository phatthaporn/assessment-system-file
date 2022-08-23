const { Users } = require("../../../models/index.model");
const jwtFunction = require("../../../utils/jwt-function");

const signIn = async (data) => {
  try {
    const result = await Users.findOne({ where: { email: data.email } });
    if (result === null) return { status: "UnAuthenticated" };
    if (result.status === 0) return { status: "Un Auth by status!" };
    if (await jwtFunction.compareData(data.password, result.password)) {
      const user_profile = {
        id: result.id,
        email: result.email,
        firstname: result.firstname,
        lastname: result.lastname,
        roleId: result.roleId,
      };
      const response = await jwtFunction.jwtEncode(user_profile);
      return ({ status: "Authenticated", token: response, user_profile: user_profile });
    }
  } catch (err) {
    return err;
  }
};

module.exports = signIn;
