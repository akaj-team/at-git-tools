var app = require('./index.js')

const TOKEN = ""
const ORG = "akaj-team";

app.checkUsers(ORG, TOKEN, function(users) {
  console.log(users);
})
