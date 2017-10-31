var request = require('request');
var users = []
/**
* This function is used to get all members in organization
*
**/
function getUsers(orgName, token, onFinish) {
  getUsersApi(orgName, token, null, onFinish)
}

function getUsersApi(orgName, token, cursor, onFinish) {

  var endCursor = ""
  if (cursor) {
    endCursor = `, after:"${cursor}"`
  } else {
    users = []
  }
  var options = {
    uri: 'https://api.github.com/graphql',
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'user-agent': 'at-git-tool'
    },
    json: {
      "query": `{
                  organization(login: "${orgName}") {
                    members(first: 100${endCursor}) {
                      pageInfo {
                        hasNextPage
                        endCursor
                      }
                      edges {
                        node {
                          url
                          login
                          name
                          email
                          avatarUrl
                          company
                          websiteUrl
                          location
                        }
                      }
                    }
                  }
                }`
    }
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      users = users.concat(body.data.organization.members.edges)
      if (body.data.organization.members.pageInfo.hasNextPage) {
        console.log(`Get next page with cursor: ${body.data.organization.members.pageInfo.endCursor}`);
        getUsersApi(orgName, token, body.data.organization.members.pageInfo.endCursor, onFinish)
      } else {
        onFinish(users)
      }
    } else {
      console.log(body);
    }
  });
}

module.exports.getUsers = getUsers;
