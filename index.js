var request = require('./tools/request.js')
var validate = require('./tools/validate.js')

exports.checkUsers = function(org, token, check) {
  request.getUsers(org, token, function(users) {
    console.log(users.length);
    check(validate.check(users))
  })
}
