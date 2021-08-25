const bcrypt = require('bcrypt');

module.exports = {
  async isPasswordCorrect(currentUserPassword,passwordToCompare){
    const isCorrectPassword = await bcrypt.compare(
      passwordToCompare,
      currentUserPassword
    );
    
    // * if password is incorrect
    if(!isCorrectPassword) { return false };
    
    // * if password is correct
    return true
  }
}