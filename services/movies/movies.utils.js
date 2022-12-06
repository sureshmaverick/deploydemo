const otpGenerator = require('otp-generator');

const getOtp = (digits = 6) => otpGenerator.generate(digits, {
    specialChars: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false
});

module.exports = {
    getOtp
};
