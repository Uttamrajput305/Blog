const {UserModel}=require("../models/register.model");

const saveUser = async(body, session)=>{
    try {
        const user = await new UserModel(body);
        await user.save(session);
        return user;
    } catch (error) {
      throw error;  
    }
}
const findByEmail = async(email)=>{
    try {
        return await UserModel.findOne({ email: email });
    } catch (error) {
       throw error; 
    }
}
module.exports = {
    saveUser,
    findByEmail
}