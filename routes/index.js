var express = require('express');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
var router = express.Router();


const CLIENT_ID = '605273485972-fpg2n0t2giee7knus91n0slknv2ja6f3.apps.googleusercontent.com';
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

/* GET home page. */
router.use(function (req, res, next) {
  if ('email' in req.session) {
    req.loginStatus = true;
  } else {

    req.loginStatus = false;
  }
  next();
});

router.get('/isLoggedIn', function (req, res, next) {
  res.json({ success: req.loginStatus });
});

router.post('/signup', async function (req, res, next) {
  var emailID = null;
  var first = null;
  var last = null;
  var pass = null;

  if ('client_id' in req.body) {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    emailID = payload['email'];
    first = payload['given_name'];
    last = payload['family_name'];
    pass = "placeholder";
  }
  else {
    emailID = req.body.email;
  }

  // Check if the email already exists in the database
  req.pool.getConnection(function (cerr, connection) {
    function saveUserToDatabase() {
      // Establishing a query for adding the user
      req.pool.getConnection(function (verr, connection2) {
        if (verr) {
          res.sendStatus(401);
          return;
        }
        let query2 = "INSERT INTO User (UserID, FirstName, LastName, Password) VALUES (?, ?, ?, ?)";
        // Add a new user to the database
        connection2.query(query2, [emailID, first, last, pass], function (qerr1, rows1, fields1) {
          connection2.release();
          if (qerr1) {
            res.sendStatus(401);
            return;
          }
          // Setting the session
          req.session.email = emailID;
          res.sendStatus(200);
        });
      });
    }

    if (cerr) {
      res.sendStatus(401);
      console.log("Error0");
      return;
    }

    // Defining a query for checking if the user already exists in the database
    let query1 = "SELECT * FROM User WHERE UserID = ?;";

    // Establishing a query for checking if the user exists
    connection.query(query1, [emailID], function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        res.sendStatus(401);
        console.log("Error1");
        return;
      }

      // User exists, cannot sign up
      if (rows.length > 0) {
        res.sendStatus(401); // Email already exists
        console.log("Error2");
        return;
      }

      // Establishing a query for adding the user
      if (first === null) first = req.body.firstName;
      if (last === null) last = req.body.lastName;
      if (pass === null) pass = req.body.password;

      bcrypt.hash(pass, 10, function (err, hashedPassword) {
        if (err) {
          res.sendStatus(500);
          return;
        }

        pass = hashedPassword;
        console.log(pass);
        saveUserToDatabase();
      });
    });
  });
});

router.post('/login', async function (req, res, next) {
  var emailID;
  var pass = "placeholder";

  if ('client_id' in req.body) {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    emailID = payload['email'];
  }
  else {
    emailID = req.body.email;
    pass = req.body.password;
  }

  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(401);
      return;
    }

    // Defining a query for checking if the user already exists in the database
    let query = 'SELECT * FROM User WHERE UserID = ?;';

    // Establishing a query for retrieving the hashed password from the database
    connection.query(query, [emailID], function (qerr, rows, fields) {
      if (qerr) {
        connection.release();
        res.sendStatus(401);
        return;
      }

      if (rows.length > 0) {
        const hashedPassword = rows[0].Password;

        // Compare the provided password with the hashed password using bcrypt
        bcrypt.compare(pass, hashedPassword, function (berr, result) {
          connection.release();
          if (berr) {
            res.sendStatus(401);
            return;
          }

          if (result) {
            req.session.email = emailID;
            res.sendStatus(200); // User exists and password matches
          } else {
            res.sendStatus(401); // User exists, but password does not match
          }
        });
      } else {
        connection.release();
        res.sendStatus(401); // User does not exist
      }
    });
  });
});


const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com.au",
  port: 465,
  secure: true,
  auth: {
    user: "clubhaus@zohomail.com.au",
    pass: "L7nisQ1WMh7G",
  },
});

router.post('/sendEmail', function (req, res, next) {
  const { heading, recipients, description } = req.body;

  console.log(recipients);

  const mailOptions = {
    from: '"clubhaus" <clubhaus@zohomail.com.au>',
    to: recipients,
    subject: heading,
    text: description,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.sendStatus(500);
    } else {
      console.log('Email sent:', info.response);
      res.sendStatus(200);
    }
  });
});

router.get('/getUsers', function (req, res, next) {
  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      console.log('Error connecting to the database:', cerr);
      res.sendStatus(500);
      return;
    }

    let query = 'SELECT UserID FROM NotificationPreference WHERE ReceiveEmails = 1;';
    connection.query(query, function (qerr, rows) {
      connection.release();
      if (qerr) {
        console.log('Error executing database query:', qerr);
        res.sendStatus(500);
        return;
      }

      const recipients = rows.map((row) => row.UserID);
      res.json(recipients);
    });
  });
});

router.get('/getManagers', function (req, res, next) {
  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      console.log('Error connecting to the database:', cerr);
      res.sendStatus(500);
      return;
    }

    let query = 'SELECT ManagerID FROM Manager;';
    connection.query(query, function (qerr, rows) {
      connection.release();
      if (qerr) {
        console.log('Error executing database query:', qerr);
        res.sendStatus(500);
        return;
      }

      const recipients = rows.map((row) => row.ManagerID);
      console.log(recipients);
      res.json(recipients);
    });
  });
});


/*router.use('/', function (req, res, next) {


  next();
});
*/

router.post('/checkJoin', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
    res.sendStatus(401);
    return;
  }
  const emailID = req.session.email;
  const clubID = req.body.clubId;
  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }
    let query = 'SELECT * FROM Membership WHERE UserID = ? AND ClubID = ?;';
    connection.query(query, [emailID, clubID], function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        res.sendStatus(500);
        return;
      }
      if (rows.length > 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    });
  });
});


router.post('/joinClub', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
    res.sendStatus(401);
    return;
  }

  const emailID = req.session.email;
  const clubID = req.body.clubId;

  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }
    let query = 'INSERT INTO Membership (UserID, ClubID, JoinDate) VALUES (?, ?, NOW())';
    connection.query(query, [emailID, clubID], function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});

router.get('/info', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
    res.sendStatus(401);
    return;
  }
  const emailID = req.session.email;
  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(401);
      return;
    }
    let query = 'SELECT * FROM User WHERE UserID = ?;';
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

router.get('/renderClub', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
    res.sendStatus(401);
    return;
  }
  const emailID = req.session.email;
  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(401);
      return;
    }
    let query = 'SELECT * FROM Club WHERE ClubID IN ( SELECT ClubID FROM Membership WHERE UserID = ? );';
    connection.query(query, [emailID], function (qerr, rows, fields) {
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

router.post('/renderUpEvents', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
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
        res.send(JSON.stringify(rows));
      } else {
        res.sendStatus(200);
      }
    });
  });
});

router.post('/renderPastEvents', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
    res.sendStatus(401);
    return;
  }
  const id = req.body.clubId;
  const state = req.body.Tense;

  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(401);
      return;
    }
    let query = "SELECT * FROM Event WHERE ClubID = ? AND Tense = ?;";
    connection.query(query, [id, state], function (qerr, rows, fields) {
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


router.post('/event_specific', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
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

router.post('/rsvp', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
    res.sendStatus(401);
    return;
  }
  const userID = req.session.email; // Assuming you have a session with a user ID
  const eventID = req.body.event;
  const joinDate = new Date();

  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(401);
      return;
    }

    let query = "INSERT INTO RSVP (UserID, EventID, JoinDate) VALUES (?, ?, ?);";
    connection.query(query, [userID, eventID, joinDate], function (qerr, result) {
      connection.release();
      if (qerr) {
        if (qerr.code === "ER_DUP_ENTRY") {
          // User already RSVP'd for the event
          res.sendStatus(500);
        } else {
          res.sendStatus(500);
        }
        return;
      }
      res.sendStatus(200);
    });
  });
});

router.post('/checkRSVP', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
    res.sendStatus(401);
    return;
  }
  if (!req.loginStatus) {
    res.sendStatus(401);
    return;
  }
  const emailID = req.session.email;
  const eventID = req.body.event;

  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }

    let query = 'SELECT * FROM RSVP WHERE UserID = ? AND EventID = ?;';
    connection.query(query, [emailID, eventID], function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        res.sendStatus(500);
        return;
      }
      if (rows.length > 0) {
        res.sendStatus(200); // User has RSVP'd for the event
      } else {
        res.sendStatus(401); // User has not RSVP'd for the event
      }
    });
  });
});

router.post('/checkMember', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
    res.sendStatus(401);
    return;
  }
  const clubID = req.body.club;
  const emailID = req.session.email;

  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }
    let query = "SELECT * FROM Membership WHERE UserID = ? AND ClubID = ?;";
    connection.query(query, [emailID, clubID], function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        res.sendStatus(500);
        return;
      }
      if (rows.length > 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    });
  });
});

router.get('/renderMyEvents', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
    res.sendStatus(401);
    return;
  }
  const emailID = req.session.email;
  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }
    let query = "SELECT E.ClubID, E.EventID, E.EventName, E.EventDate, E.EventLocation, E.EventShortDescription, E.EventLongDescription, E.EventImageURL, E.Tense FROM Event E JOIN RSVP R ON E.EventID = R.EventID WHERE R.UserID = ?;";
    connection.query(query, [emailID], function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        res.sendStatus(500);
        return;
      }
      if (rows.length > 0) {
        res.status(200).json(rows);
      }
    });
  });
});

router.use('/preference', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
    res.sendStatus(401);
    return;
  }
  const user = req.session.email;
  const club = req.body.clubID;
  const pref = req.body.preference;
  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }
    let query = "INSERT INTO NotificationPreference (UserID, ClubID, ReceiveEmails) VALUES (?, ?, ?)";
    connection.query(query, [user, club, pref], function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});

router.use('/updatepreference', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
    res.sendStatus(401);
    return;
  }
  const user = req.session.email;
  const club = req.body.clubID;
  const pref = req.body.preference;
  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }
    let query = "UPDATE NotificationPreference SET ReceiveEmails = ? WHERE UserID = ? AND ClubID = ?";
    connection.query(query, [pref, user, club], function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});

router.use('/checkpref', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
    res.sendStatus(401);
    return;
  }
  const user = req.session.email;
  const club = req.body.clubID;
  req.pool.getConnection(function (cerr, connection) {
    if (cerr) {
      res.sendStatus(500);
      return;
    }
    let query = "SELECT * FROM NotificationPreference WHERE UserID = ? AND ClubID = ?";
    connection.query(query, [user, club], function (qerr, rows, fields) {
      connection.release();
      if (qerr) {
        res.sendStatus(500);
        return;
      }
      res.send(JSON.stringify(rows));
    });
  });
});

router.post('/logout', function (req, res, next) {
  if (!req.loginStatus) {
    console.log("Index");
    res.sendStatus(401);
    return;
  }
  if ('email' in req.session) {
    delete req.session.email;
    res.end();
  } else {
    res.sendStatus(403);
  }

});

module.exports = router;
