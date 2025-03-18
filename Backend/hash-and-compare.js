const bcrypt = require('bcrypt');

const originalPassword = "123456"; // The password you're testing
const storedHashedPassword = "$2b$10$zoEYTP/PDNLk.BdIE0T1GutmOMJSoVNW3B8L8hyeIQmtAyATOm/fS"; // The hash from MongoDB

// Step 1: Hash the password again
bcrypt.hash(originalPassword, 10, (err, newHash) => {
    if (err) throw err;
    
    console.log("New Hashed Password:", newHash);
    console.log("Stored Hash Length:", storedHashedPassword.length);


    // Step 2: Compare the new hash with the stored hash
    bcrypt.compare(originalPassword, storedHashedPassword, (err, match) => {
        if (err) throw err;
        
        console.log("Password Match:", match);
        if (match) {
            console.log("✅ Password Match: Login Successful");
        } else {
            console.log("❌ Password Mismatch: Login Failed");
        }
    });
});
