require('dotenv').config({ path: '../../.env' });

const email = process.env.EMAIL
const pass = process.env.EMAIL_PASSWORD

module.exports = {
    email: email,
    name: '数通中台',
    pass: pass
}