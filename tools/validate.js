var rules = require('./rules.js')

function check(users) {
  var result = []
  for (var i = 0; i < users.length; i++) {
    var user = users[i].node
    user['at-check'] = checkUser(users[i].node)
    result.push(user)
  }
  // return rules.validateEmail("tientunit@gmail.com")
  // console.log(result);
  return result
}

function checkUser(user) {
  var objects = [
    {
      name: 'email',
      value: user.email,
      rules: [rules.validateNonPublicEmail]
    }, {
      name: 'login',
      value: user.login,
      rules: [rules.validateIdFormat]
    }, {
      name: 'company',
      value: user.company,
      rules: [rules.validateCompany]
    }, {
      name: 'name',
      value: user.name,
      rules: [rules.validateDisplayName]
    }
  ]
  return checkRules(objects)
}

function checkRules(objects) {
  for (var i = 0; i < objects.length; i++) {
    var reports = []
    for (var j = 0; j < objects[i].rules.length; j++) {
      const report = checkRule(objects[i].value, objects[i].rules[j])
      if (report) {
        reports.push(report)
      }
    }
    objects[i]['reports'] = reports
  }
  return objects
}

function checkRule(value, rule) {
  const result = rule(value)
  if (result != true) {
    var report = {
      // 'value': value,
      'message': result
    }
    return report
  }
}

module.exports.check = check;
