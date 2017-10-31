var fs = require('fs')
var configs = JSON.parse(fs.readFileSync('./at-git-configs.json', 'utf8'))
var excepts = null
if (configs.excepts) {
  excepts = configs.excepts
}
module.exports = {
  validateEmailFormat: function(value) {
    const except = getExceptList("email");
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (except.indexOf(value) >= 0 || re.test(value)) {
      return true
    }
    return `Email '${value}' không đúng cú pháp.`;
  },

  validateEmailAt: function(value) {
    const except = getExceptList("email");
    var re = /^([a-z]+\.[a-z]+\d*@asiantech.vn)$/;
    if (except.indexOf(value) >= 0 || re.test(value)) {
      return true
    }
    return `Email '${value}' không phải là email công ty.`;
  },

  validateIdFormat: function(value) {
    const except = getExceptList("login");
    var re = /^at-[a-z]+\d*$/;
    if (except.indexOf(value) >= 0 || re.test(value)) {
      return true
    }
    return `Github ID '${value}' không đúng chuẩn.`;
  },

  validateCompany: function(value) {
    const except = getExceptList("company");
    var re = /Asian Tech Co., Ltd./;
    if (except.indexOf(value) >= 0 || re.test(value)) {
      return true
    }
    return `Tên công ty '${value}' chưa đúng.`;
  },

  validateDisplayName: function(value) {
    const except = getExceptList("name");
    var re = /^(\b[A-Z][a-z]*\s*)+(\b[A-Z].\s*)+$/;
    if (except.indexOf(value) >= 0 || re.test(value)) {
      return true
    }
    console.log(`Tên hiển thị '${value}' chưa đúng.`);
    return `Tên hiển thị '${value}' chưa đúng.`;
  }
}


function getExceptList(name){
  if (configs.excepts[name]) {
    return configs.excepts[name]
  }
  return []
}
