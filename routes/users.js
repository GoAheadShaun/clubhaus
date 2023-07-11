var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'public/images/uploads/' });
var uploaded_images = [];
/* GET users listing. */
router.use(function(req, res, next) {
  if ('memail' in req.session) {
    req.loginManagerStatus = true;
  } else {
    req.loginManagerStatus = false;
  }
  next();
});

router.get('/isLoggedIn', function (req, res, next) {
  res.json({ success: req.loginManagerStatus });
});

router.post('/upload', upload.single('file'), function (req, res, next) {
  // req.file contains the uploaded image file
  // req.body will contain the text fields, if there were any

  if (req.file) {
    // Store the name of the uploaded file
    uploaded_images.push(req.file.filename);
  }
  res.send();
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
    let query = 'SELECT * FROM Manager WHERE ManagerID = ? AND Password = ?;';

    // Establishing a query for checking if the user exists
    connection.query(query, [emailID, pass], function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        res.sendStatus(401);
        return;
      }
      if (rows.length > 0) {
        req.session.memail = req.body.email;
        req.session.clubid = rows[0].ClubID;
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

router.post('/event_specific', function (req, res, next) {

  if (!req.loginManagerStatus) {
    console.log("User");
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

  if (!req.loginManagerStatus) {
    console.log("User");
    res.sendStatus(401);
    return;
  }

  if ('memail' in req.session){
    delete req.session.memail;
    res.end();
  } else {
    res.sendStatus(403);
  }

});
router.post('/renderUpEvents', function (req, res, next) {

  if (!req.loginManagerStatus) {
    console.log("User");
    res.sendStatus(401);
    return;
  }
  const id = req.session.clubid;
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
        res.send(JSON.stringify(rows));
      } else {
        res.sendStatus(200);
      }
    });
  });
});

router.get('/viewmembers',function(req,res,next) {
  if (!req.loginManagerStatus) {
    console.log("User");
    res.sendStatus(401);
    return;
  }
  const clubID = req.session.clubid;
  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(401);
      return;
    }
    let query = "SELECT User.UserID, User.FirstName, User.LastName FROM User JOIN Membership ON User.UserID = Membership.UserID WHERE Membership.ClubID = ?;";
    connection.query(query, [clubID], function (qerr, rows, fields) {
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

router.get('/clubinfo',function(req,res,next) {
  if (!req.loginManagerStatus) {
    console.log("User");
    res.sendStatus(401);
    return;
  }

  const clubID = req.session.clubid;
  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(401);
      return;
    }
    let query = "SELECT * FROM Club WHERE ClubID = ?;";
    connection.query(query, [clubID], function (qerr, rows, fields) {
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

router.post('/viewrsvp',function(req,res,next) {
  if (!req.loginManagerStatus) {
    console.log("User");
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
  if (!req.loginManagerStatus) {
    console.log("User");
    res.sendStatus(401);
    return;
  }
  const emailID = req.session.memail;
  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(401);
      return;
    }
    let query = 'SELECT * FROM Manager WHERE ManagerID = ?;';
    connection.query(query, [emailID], function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        res.sendStatus(401);
        return;
      }
      if (rows.length > 0) {
        res.send(JSON.stringify(rows));
      } else {
        res.sendStatus(404); // User not found or no data available
      }
    });
  });
});

router.post('/create', function (req, res, next) {
  if (!req.loginManagerStatus) {
    console.log("User");
    res.sendStatus(401);
    return;
  }
  const clubID = req.session.clubid;
  const eventData = req.body; // Assuming the request body contains the event data

  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(401);
      return;
    }
    let query = "INSERT INTO Event (ClubID, EventName, EventDate, EventTime, EventLocation, EventShortDescription, EventLongDescription,Tense,EventImageURL) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)";
    const values = [clubID, eventData.eventName, eventData.eventDate, eventData.eventTime,
      eventData.eventLocation, eventData.eventShortDescription,
       eventData.eventDescription,eventData.Tense,"images/uploads/"+uploaded_images[0]];
    connection.query(query, values, function (err, result) {
      connection.release();
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
});



module.exports = router;
