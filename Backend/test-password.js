const bcrypt = require('bcrypt');

const enteredPassword = "123456"; // This is what the user is entering
const storedHashedPassword = "$2b$10$zoEYTP/PDNLk.BdIE0T1GutmOMJSoVNW3B8L8hyeIQmtAyATOm/fS"; // This is from MongoDB

console.log("Comparing entered password with stored hash...");

bcrypt.compare(enteredPassword, storedHashedPassword)
  .then(match => {
    if (match) {
      console.log("✅ Password Match: Login Successful");
    } else {
      console.log("❌ Password Mismatch: Login Failed");
    }
  })
  .catch(err => console.error("Error:", err));
