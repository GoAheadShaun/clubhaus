var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    if ('aemail' in req.session) {
      req.loginAdminStatus = true;
    } else {
      req.loginAdminStatus = false;
    }
    next();
});

router.get('/isLoggedIn', function (req, res, next) {
    res.json({ success: req.loginAdminStatus });
});


router.post('/login', function (req, res, next) {
    const emailID = req.body.email;
    const pass = req.body.password;
    req.pool.getConnection(function (cerr, connection) {
      if (cerr) {
        res.sendStatus(401);
        return;
      }

      // Defining a query for checking if the user already exists in the database
      let query = 'SELECT * FROM Admin WHERE AdminID = ? AND Password = ?;';

      // Establishing a query for checking if the user exists
      connection.query(query, [emailID, pass], function (qerr, rows, fields) {
        connection.release();
        if (qerr) {
          res.sendStatus(500);
          return;
        }
        if (rows.length > 0) {
          req.session.aemail = req.body.email;
          res.sendStatus(200); // User exists
        } else {
          res.sendStatus(401); // User does not exist
        }
      });
    });
});

/*router.use('/',function (req, res, next) {


    next();
});
*/

router.post('/viewrsvp',function(req,res,next) {
  if (!req.loginAdminStatus) {
    res.sendStatus(401);
    return;
  }
    const eventID = req.body.event;
    req.pool.getConnection(function (cerr, connection) {
      if (cerr) {
        res.sendStatus(401);
        return;
      }
      let query = "SELECT User.UserID, User.FirstName, User.LastName FROM User JOIN RSVP ON User.UserID = RSVP.UserID WHERE RSVP.EventID = ?;";
      connection.query(query, [eventID], function (qerr, rows, fields) {
        connection.release();
        if (qerr) {
          res.sendStatus(401);
          return;
        }
        if (rows.length > 0) {
          res.send(JSON.stringify(rows));
        } else {
          res.sendStatus(200);
        }
      });
    });
});

router.get('/info', function (req, res, next) {
  if (!req.loginAdminStatus) {
    res.sendStatus(401);
    return;
  }
    const emailID = req.session.aemail;
    req.pool.getConnection(function (cerr, connection) {
      if (cerr) {
        res.sendStatus(401);
        return;
      }
      let query = 'SELECT * FROM Admin WHERE AdminID = ?;';
      connection.query(query, [emailID], function (qerr, rows, fields) {
        connection.release();
        if (qerr) {
          res.sendStatus(401);
          return;
        }
        if (rows.length > 0) {
          const first = rows[0].FirstName;
          const last = rows[0].LastName;
          const data = {
            email: emailID,
            firstName: first,
            lastName: last
          };
          res.send(JSON.stringify(data));
        } else {
          res.sendStatus(404); // User not found or no data available
        }
      });
    });
});

router.post('/renderUpEvents', function (req, res, next) {
  if (!req.loginAdminStatus) {
    res.sendStatus(401);
    return;
  }
    const id = req.body.clubId;
    const status = req.body.Tense;
    req.pool.getConnection(function (cerr, connection) {
      if (cerr) {
        res.sendStatus(401);
        return;
      }
      let query = "SELECT * FROM Event WHERE ClubID = ? AND Tense = ?;";
      connection.query(query, [id, status], function (qerr, rows, fields) {
        connection.release();
        if (qerr) {
          res.sendStatus(401);
          return;
        }
        if (rows.length > 0) {
            console.log("Ramin");
          res.send(JSON.stringify(rows));
        } else {
          res.sendStatus(200);
        }
      });
    });
});

router.post('/event_specific', function (req, res, next) {
  if (!req.loginAdminStatus) {
    res.sendStatus(401);
    return;
  }
    const eventid = req.body.event;
    const clubid = req.body.club;
    req.pool.getConnection(function (cerr, connection) {
      if (cerr) {
        res.sendStatus(401);
        return;
      }
      let query = "SELECT * FROM Event WHERE ClubID = ? AND EventID = ?;";
      connection.query(query, [clubid, eventid], function (qerr, rows, fields) {
        connection.release();
        if (qerr) {
          res.sendStatus(500);
          return;
        }
        if (rows.length > 0) {
          res.send(JSON.stringify(rows));
        } else {
          res.sendStatus(200);
        }
      });
    });
});

router.post('/logout', function(req,res,next){
  if (!req.loginAdminStatus) {
    res.sendStatus(401);
    return;
  }
    if ('aemail' in req.session){
      delete req.session.aemail;
      res.end();
    } else {
      res.sendStatus(403);
    }
});

router.post('/createadmin', function(req,res,next){
  if (!req.loginAdminStatus) {
    res.sendStatus(401);
    return;
  }

    req.pool.getConnection(function (cerr, connection) {
        if (cerr) {
          res.sendStatus(401);
          return;
        }
        let query = 'INSERT INTO Admin (AdminID, FirstName, LastName, Password) VALUES (?,?,?,?);';
        connection.query(query, [req.body.email,req.body.firstName,req.body.lastName,req.body.password], function (qerr, rows, fields) {
            connection.release();
            if (qerr) {
              res.sendStatus(401);
              return;
            }
            res.sendStatus(200);
        });
    });
});

router.post('/createmanager', function(req,res,next){
  if (!req.loginAdminStatus) {
    res.sendStatus(401);
    return;
  }
  req.pool.getConnection(function (cerr, connection) {
        if (cerr) {
          res.sendStatus(401);
          return;
        }
        let query = 'UPDATE Manager SET ManagerID = ?, FirstName = ?, LastName = ?, Password = ? WHERE ClubID = ?;';
        connection.query(query, [req.body.email,req.body.firstName,req.body.lastName,req.body.password,req.body.clubID], function (qerr, rows, fields) {
            connection.release();
            if (qerr) {
              res.sendStatus(401);
              return;
            }
            res.sendStatus(200);
        });
    });
});

router.post('/managerinfo', function(req, res, next) {
  if (!req.loginAdminStatus) {
    res.sendStatus(401);
    return;
  }
  req.pool.getConnection(function(cerr, connection) {
    if (cerr) {
      res.sendStatus(401);
      return;
    }
    console.log(req.body.manager);
    let query = 'SELECT * FROM Manager WHERE ClubID = ?;';
    const num = req.body.manager;
    connection.query(query,[num], function(qerr, rows, fields) {
      connection.release();
      if (qerr) {
        res.sendStatus(401);
        return;
      }
      if (rows.length > 0) {
        res.send(JSON.stringify(rows));
      } else {
        res.sendStatus(404); // Manager not found
      }
    });
  });
});




module.exports = router;

