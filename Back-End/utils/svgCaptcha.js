const code = require("svg-captcha"); // 引入图片验证码

function svgCaptcha() {
    return code.create({
        size: 4,
        ignoreChars: "0o1iIl",
        noise: 3,
        color: true,
        background: "#000",
        fontSize: 60
    });
}
module.exports = svgCaptcha;