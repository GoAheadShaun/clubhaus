const vue = new Vue({
  el: '#test',
  data: {
    isAdminLoggedIn: false
  },
  created() {
    this.isLoggedInStatus();
  },

  methods: {
    isLoggedInStatus: function (event) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
          var status = JSON.parse(this.responseText).success;
          vue.isAdminLoggedIn = status;
        }
      };
      xhttp.open("GET", "/admin/isLoggedIn", true);
      xhttp.send();
    }
  }
});


function sysSendEmail() {
  window.location.href = '/sys_create_email.html';
}

function goSysAdmin() {
  window.location.href = '/sys_admin_page.html';
}

function visitSpaceSysAdmin() {
  window.location.href = '/sys_admin_auss.html';
}

function visitComputerSysAdmin() {
  window.location.href = '/sys_admin_csc.html';
}

function visitChangeClubManager1() {
  window.location.href = '/change_club_manager.html';
}
function visitChangeClubManager2() {
  window.location.href = '/change_club_manager2.html';
}

function sysCreateAdmin() {
  window.location.href = '/create_sys_admin.html';
}

function goHome() {
  window.location.href = '/index.html';
}





function login(event) {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page
  const form = document.querySelector('.form-container');
  const email = form.elements['email'].value;
  const password = form.elements['password'].value;
  const data = {
    email: email,
    password: password,
    type: 'admin'
  };

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      window.location.href = '/sys_admin_page.html';
    } else if (this.readyState === 4 && this.status === 401) {
      alert('Sign In Unsuccessful');
    }
  };
  xhttp.open('POST', '/admin/login', true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function placeInfo() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var data = JSON.parse(this.responseText);
      var emailID = data.email;
      var first = data.firstName;
      var last = data.lastName;
      var nameElement = document.querySelector('.info p:nth-child(1)');
      var emailElement = document.querySelector('.info p:nth-child(2)');
      nameElement.textContent = "Name: " + first + " " + last;
      emailElement.textContent = "Email: " + emailID;
    } else if (this.readyState === 4 && this.status === 401) {
      alert("Sign in Required");
      window.location.href = '/index.html';
    }
  };
  xhttp.open("GET", "/admin/info", true);
  xhttp.send();
}

function closeEventMemberPopup() {
  var popup = document.getElementById('popupContainer');
  popup.style.display = 'none';
}

function viewrsvp(eventID) {
  var xhttp = new XMLHttpRequest();
  var popup = document.getElementById('popupContainer');
  var membersList = document.getElementById('members');
  popup.style.display = 'block';
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var members = JSON.parse(this.responseText);

      // Clear any existing members from the list
      membersList.innerHTML = '';

      // Populate the members into the list
      for (var i = 0; i < members.length; i++) {
        var member = members[i];
        var listItem = document.createElement('li');
        listItem.innerText = member.FirstName + ' ' + member.LastName + ' - ' + member.UserID;
        membersList.appendChild(listItem);
      }
    }
  };
  xhttp.open('POST', '/admin/viewrsvp', true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  const data = {
    event: eventID
  };
  xhttp.send(JSON.stringify(data));
}

function loadEvent(clubID, eventID) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var eventData = JSON.parse(this.responseText);
      var event = eventData[0];
      const eventNameElement = document.getElementById("event-name");
      const descriptionElement = document.getElementById("description");
      const dateElement = document.getElementById("date");
      const locationElement = document.getElementById("location");
      const imageElement = document.getElementById("event-image");
      const rsvpButton = document.querySelector(".rsvp-button");
      rsvpButton.addEventListener("click", function () {
        viewrsvp(eventID);
      });

      eventNameElement.innerText = event.EventName;
      descriptionElement.innerText = event.EventLongDescription;
      dateElement.innerText = "Date: " + event.EventDate;
      locationElement.innerText = "Location: " + event.EventLocation;
      imageElement.src = event.EventImageURL;
    } else if (this.readyState === 4 && this.status === 401) {
      alert("Sign in Required");
      window.location.href = '/index.html';
    }
  };
  const data = {
    club: clubID,
    event: eventID
  };
  xhttp.open("POST", "/admin/event_specific", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}


function loadEventDetails() {
  var params = new URLSearchParams(window.location.search);
  var clubID = params.get('param1');
  var eventID = params.get('param2');

  // Call the function to load the event data
  loadEvent(clubID, eventID);
}




function goToUpEvent(clubID, eventID) {

  var param1 = clubID;
  var param2 = eventID;
  var url = 'events_specific_admin.html?param1=' + encodeURIComponent(param1) + '&param2=' + encodeURIComponent(param2);
  window.open(url, '_blank');
}

function renderUpAdminEvents(clubid) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var events = JSON.parse(this.responseText); // Parse the JSON response
      var eventsarray = document.getElementsByClassName('events');
      var eventsContainer = eventsarray[0];
      var clubID = events[0].ClubID;

      // Clear any existing event elements
      eventsContainer.innerHTML = '';

      // Iterate over the events and create HTML elements
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        const eventID = event.EventID;


        // Create event element
        var eventElement = document.createElement('div');
        eventElement.className = 'event';
        eventElement.addEventListener('click', function () {
          const clubIDe = clubID;
          goToUpEvent(clubIDe, eventID);
        });

        // Create event name element
        var eventNameElement = document.createElement('div');
        eventNameElement.className = 'event-name';
        var eventNameHeading = document.createElement('h2');
        eventNameHeading.innerText = event.EventName;
        eventNameElement.appendChild(eventNameHeading);

        // Create event info element
        var eventInfoElement = document.createElement('div');
        eventInfoElement.className = 'event-info';
        var eventInfoContent = document.createElement('p');
        eventInfoContent.innerHTML = "<strong>Date and time:</strong> " + event.EventDate + "<br>" +
          "<strong>Location:</strong> " + event.EventLocation + "<br>" +
          "<strong>Description:</strong> " + event.EventShortDescription;
        eventInfoElement.appendChild(eventInfoContent);

        // Create event image element
        var eventImageElement = document.createElement('div');
        eventImageElement.className = 'event-image';
        var eventImage = document.createElement('img');
        eventImage.src = event.EventImageURL;
        eventImage.alt = event.EventName;
        eventImageElement.appendChild(eventImage);

        // Append all elements to the event container
        eventElement.appendChild(eventNameElement);
        eventElement.appendChild(eventInfoElement);
        eventElement.appendChild(eventImageElement);

        // Append event element to the events container
        eventsContainer.appendChild(eventElement);
      }
    } else if (this.readyState === 4 && this.status === 401) {
      alert("Sign in Required");
      window.location.href = '/index.html';
    }
  };


  xhttp.open("POST", "/admin/renderUpEvents", true);
  const data = {
    clubId: clubid,
    Tense: 'Upcoming'
  };
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function logout() {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
      alert('Logged Out');
      window.location.reload();
    } else if (req.readyState === 4 && req.status === 403) {
      alert('Not logged in');
    }
  };
  req.open('POST', '/admin/logout');
  req.send();
}

// Client-side code
function createAdmin() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      alert("New Admin Created");
      window.location.href = '/sys_admin_page.html';
    } else if (this.readyState === 4 && this.status === 401) {
      alert("Sign in Required");
      window.location.href = '/index.html';
    }
  };

  // Retrieve the form data
  var emailID = document.querySelector('input[name="e-mail"]').value;
  var confirmEmail = document.querySelector('input[name="confirm-email"]').value;
  var FirstName = document.querySelector('input[name="first_name"]').value;
  var LastName = document.querySelector('input[name="last_name"]').value;
  var Password = document.querySelector('input[name="password"]').value;
  var confirmPassword = document.querySelector('input[name="confirm-password"]').value;

  // Prepare the data object
  var data = {
    email: emailID,
    firstName: FirstName,
    lastName: LastName,
    password: Password,
  };

  xhttp.open("POST", "/admin/createadmin", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}

function createManager(clubid) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      alert("New Manager Updated");

      window.location.href = '/sys_admin_page.html';
    } else if (this.readyState === 4 && this.status === 401) {
      alert("Sign in Required");
      window.location.href = '/index.html';
    }
  };

  var emailID = document.querySelector('input[name="e-mail"]').value;
  var confirmEmail = document.querySelector('input[name="confirm-email"]').value;
  var FirstName = document.querySelector('input[name="first_name"]').value;
  var LastName = document.querySelector('input[name="last_name"]').value;
  var Password = document.querySelector('input[name="password"]').value;
  var confirmPassword = document.querySelector('input[name="confirm-password"]').value;

  // Prepare the data object
  var data = {
    email: emailID,
    firstName: FirstName,
    lastName: LastName,
    password: Password,
    clubID: clubid
  };

  xhttp.open("POST", "/admin/createmanager", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}

function managerinfo(managerID) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var data = JSON.parse(this.responseText);
      var fullName = data[0].FirstName + ' ' + data[0].LastName;
      var ramin = document.getElementById('managerName');
      ramin.textContent = fullName;
    } else if (this.readyState === 4 && this.status === 401) {
      alert("Sign in Required");
      window.location.href = '/index.html';
    }
  };
  var data = {
    manager: managerID
  };
  xhttp.open("POST", "/admin/managerinfo", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(data));
}
