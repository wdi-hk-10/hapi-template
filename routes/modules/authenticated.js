module.exports = function(request, callback) {
  var db = request.server.plugins['hapi-mongodb'].db;
  var session = request.yar.get('hapi_template_session'); // CHANGE-ME

  if (!session) {
    return callback({ "authenticated": false, "message": "Unauthorized" });
  }

  db.collection('sessions').findOne({ "session_id": session.session_id }, function(err, result) {
    if (err) { return reply(err).code(400); }

    if (result === null) {
      return callback({
        "authenticated": false,
        "message": "Unauthorized"
      });
    } else {
      return callback({
        "authenticated": true,
        "message": "Authorized"
      });
    }
  });
};
