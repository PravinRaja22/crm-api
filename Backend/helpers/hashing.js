//bcrypt is used to encrypt the given user password
const bcrypt = require("bcryptjs")
//saltRounds is defined for difficulty level of decoding the password
//if we give more value means it will take more time to generate the encrypted word (10 is enough)
const saltRounds =10;
console.log("inside hashing")
const hashGenerate =async (plainPassword)=>{
    try{
        console.log("plain password ",plainPassword)
        const salt =  await bcrypt.genSalt(saltRounds)
        console.log("salt ",salt);
        console.log("after salt ",plainPassword)
        const hash=await bcrypt.hash(plainPassword,salt)
        console.log("hash ",hash)
        return hash;
    }
    catch(error)
    {
    console.log(error)
    }
}
const hashValidator=async (plainPassword,hashedPassword)=>{
    try{
        console.log("inside hash validator")
        console.log("plain password is ====>>>")
        console.log(plainPassword)
        console.log("hashedpassword is ====>>>>")
        console.log(hashedPassword)
        console.log(bcrypt)
        const result = await bcrypt.compare(plainPassword,hashedPassword)
        return result;
    }
    catch(error){
        return false
    }
}

module.exports.hashGenerate=hashGenerate;
module.exports.hashValidator=hashValidator;
