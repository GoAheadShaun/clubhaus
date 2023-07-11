function handleSearch(event) {
  if (event.key === "Enter") {
    const searchTerm = event.target.value;
    window.location.href = `search_results.html?query=${searchTerm}`;
  }
}

const searchInput = document.querySelector('.search input');
searchInput.addEventListener('keydown', handleSearch);

document.addEventListener('DOMContentLoaded', function () {
  var logo = document.getElementByID('logo');
  logo.addEventListener('click', function () {
    window.location.href = 'index.html';
  });
});

const vue = new Vue({
  el: '#test',
  data: {
    isLoggedIn: false
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
          vue.isLoggedIn = status;
        }
      };

      xhttp.open("GET", "/isLoggedIn", true);
      xhttp.send();
    }
  }
});

function goHome() {
  window.location.href = '/index.html';
}
function visitLogin() {
  window.location.href = '/login.html';
}
function visitManagerLogin() {
  window.location.href = '/managerLogin.html';
}
function visitAdminLogin() {
  window.location.href = '/sys_admin_login.html';
}
function visitRegister() {
  window.location.href = '/sign_up.html';
}

function visitMyAccount() {
  window.location.href = '/my_account.html';
}

function visitMyEvent() {
  window.location.href = '/my_events.html';
}

function visitSpace() {
  window.location.href = '/auss_club_page.html';
}

function visitComputer() {
  window.location.href = '/csc_club_page.html';
}

function visitSpaceEvents() {
  window.location.href = '/auss_events.html';
}

function visitComputerEvents() {
  window.location.href = '/csc_events.html';
}


function closeEmailPreferencePopup() {
  // Remove the popup element
  const popup = document.querySelector(".email-popup");
  if (popup) {
    document.body.removeChild(popup);
  }
  window.location.reload();
}

function emailPref(clubid, pref) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 401) {
      alert("Sign in Required");
    }
  };
  xhttp.open("POST", "/preference", true);
  const data = {
    clubID: clubid,
    preference: pref
  };
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function updateEmailPref(clubid, pref) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 401) {
      alert("Sign in Required");
    }
  };
  xhttp.open("POST", "/updatepreference", true);
  const data = {
    clubID: clubid,
    preference: pref
  };
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function showEmailPreferencePopup(clubId) {
  // Create the popup element
  const popup = document.createElement("div");
  popup.classList.add("email-popup");

  // Create the message element
  const message = document.createElement("p");
  message.textContent = "Would you like to receive emails from this club?";

  // Create the buttons
  const yesButton = document.createElement("button");
  yesButton.classList.add("red");
  yesButton.textContent = "Yes";
  yesButton.classList.add("green");
  yesButton.addEventListener("click", function () {
    emailPref(clubId, true);
    closeEmailPreferencePopup();
  });

  const noButton = document.createElement("button");
  noButton.classList.add("red");
  noButton.textContent = "No";
  noButton.classList.add("green");
  noButton.addEventListener("click", function () {
    emailPref(clubId, false);
    closeEmailPreferencePopup();
  });

  // Append the elements to the popup
  popup.appendChild(message);
  popup.appendChild(yesButton);
  popup.appendChild(noButton);

  // Append the popup to the document body`
  document.body.appendChild(popup);
}


function seeSignInOptions() {
  var loginUserBtn = document.getElementById("loginUserBtn");
  var loginManagerBtn = document.getElementById("loginManagerBtn");
  var loginAdminBtn = document.getElementById("loginAdminBtn");
  var loginBtn = document.getElementById('loginBtn');

  if (getComputedStyle(loginBtn).backgroundColor === 'rgb(149, 149, 149)') {
    loginUserBtn.style.display = 'none';
    loginManagerBtn.style.display = 'none';
    loginAdminBtn.style.display = 'none';
    loginBtn.style.backgroundColor = '#D8405C';
  } else {
    loginUserBtn.style.display = 'block';
    loginManagerBtn.style.display = 'block';
    loginAdminBtn.style.display = 'block';
    loginBtn.style.backgroundColor = '#959595';
  }
}

function joinClub1() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var joinClub1Button = document.getElementsByClassName('green join-button');
      joinClub1Button[0].innerText = "Joined";
      showEmailPreferencePopup(1);
    } else if (this.readyState === 4 && this.status === 401) {
      alert("Sign in Required");
    } else if (this.readyState === 4 && this.status === 500) {
      alert("Already Joined");

    }
  };
  xhttp.open("POST", "/joinClub", true);
  const data = {
    clubId: 1
  };
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function joinClubSpec1() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var joinClub1Button = document.getElementsByClassName('green join-button');
      joinClub1Button[0].innerText = "Joined";
      showEmailPreferencePopup(1);
    } else if (this.readyState === 4 && this.status === 401) {
      alert("Sign in Required");
    } else if (this.readyState === 4 && this.status === 500) {
      alert("Already Joined");

    }
  };
  xhttp.open("POST", "/joinClub", true);
  const data = {
    clubId: 1
  };
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}



function joinClub2() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var joinClub2Button = document.getElementsByClassName('green join-button');
      joinClub2Button[1].innerText = "Joined";
      showEmailPreferencePopup(2);
    } else if (this.readyState === 4 && this.status === 401) {
      alert("Sign in Required");
    } else if (this.readyState === 4 && this.status === 500) {
      alert("Already Joined");
    }
  };
  xhttp.open("POST", "/joinClub", true);
  const data = {
    clubId: 2
  };
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function joinClubSpec2() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var joinClub1Button = document.getElementsByClassName('green join-button');
      joinClub1Button[0].innerText = "Joined";
      showEmailPreferencePopup(2);
    } else if (this.readyState === 4 && this.status === 401) {
      alert("Sign in Required");
    } else if (this.readyState === 4 && this.status === 500) {
      alert("Already Joined");

    }
  };
  xhttp.open("POST", "/joinClub", true);
  const data = {
    clubId: 2
  };
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function checkJoin1() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var joinClub1ButtonJoined = document.getElementsByClassName('green join-button');
      joinClub1ButtonJoined[0].innerText = "Joined";
      const labelElement = document.getElementsByClassName('switch');
      labelElement[0].style.display = "block";
    } else if (this.readyState === 4 && this.status === 401) {
      var joinClub1ButtonJoin = document.getElementsByClassName('green join-button');
      joinClub1ButtonJoin[0].innerText = "Join Club";
    }
  };
  xhttp.open("POST", "/checkJoin", true);
  const data = {
    clubId: 1
  };
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function checkJoin2() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var joinClub2ButtonJoined = document.getElementsByClassName('green join-button');
      joinClub2ButtonJoined[1].innerText = "Joined";
      const labelElement = document.getElementsByClassName('switch');
      labelElement[0].style.display = "block";
    } else if (this.readyState === 4 && this.status === 401) {
      var joinClub2ButtonJoin = document.getElementsByClassName('green join-button');
      joinClub2ButtonJoin[1].innerText = "Join Club";
    }
  };
  xhttp.open("POST", "/checkJoin", true);
  const data = {
    clubId: 2
  };
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}


function checkJoinSpec2() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var joinClub2ButtonJoined = document.getElementsByClassName('green join-button');
      joinClub2ButtonJoined[0].innerText = "Joined";
      const labelElement = document.getElementsByClassName('switch');
      labelElement[0].style.display = "block";
    } else if (this.readyState === 4 && this.status === 401) {
      var joinClub2ButtonJoin = document.getElementsByClassName('green join-button');
      joinClub2ButtonJoin[0].innerText = "Join Club";
    }
  };
  xhttp.open("POST", "/checkJoin", true);
  const data = {
    clubId: 2
  };
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function checkJoinSpec1() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var joinClub2ButtonJoined = document.getElementsByClassName('green join-button');
      joinClub2ButtonJoined[0].innerText = "Joined";
      const labelElement = document.getElementsByClassName('switch');
      labelElement[0].style.display = "block";
    } else if (this.readyState === 4 && this.status === 401) {
      var joinClub2ButtonJoin = document.getElementsByClassName('green join-button');
      joinClub2ButtonJoin[0].innerText = "Join Club";
    }
  };
  xhttp.open("POST", "/checkJoin", true);
  const data = {
    clubId: 1
  };
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
  xhttp.open("GET", "/info", true);
  xhttp.send();
}

var functions = {
  0: visitSpace,
  1: visitComputer
};

function executeFunction(index) {
  var func = functions[index];
  if (typeof func === 'function') {
    func();
  }
}

function renderMyClubs() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var clubs = JSON.parse(this.responseText); // Parse the JSON response

      var container = document.querySelector('.grid-content'); // Get the container element

      clubs.forEach(function (club, index) {
        var clubBox = document.createElement('div');
        clubBox.classList.add('club-box');
        clubBox.classList.add('white-container');

        var clubLogo = document.createElement('div');
        clubLogo.classList.add('club-logo');
        clubLogo.onclick = function () {
          executeFunction(index); // Call the function based on the index
        };

        var clubLogoImage = document.createElement('img');
        clubLogoImage.src = club.ClubImage;
        clubLogoImage.alt = club.ClubName + ' Image';

        clubLogo.appendChild(clubLogoImage);
        clubBox.appendChild(clubLogo);

        var clubDetails = document.createElement('div');
        clubDetails.classList.add('club-details');
        clubDetails.onclick = function () {
          executeFunction(index); // Call the function based on the index
        };

        var clubName = document.createElement('h2');
        clubName.textContent = club.ClubName;

        var clubDescription = document.createElement('p');
        clubDescription.textContent = club.ClubDescription;

        var clubCategory = document.createElement('p');
        clubCategory.classList.add('club-category');
        clubCategory.textContent = club.Category;

        clubDetails.appendChild(clubName);
        clubDetails.appendChild(clubDescription);
        clubDetails.appendChild(clubCategory);
        clubBox.appendChild(clubDetails);

        container.appendChild(clubBox); // Append the club box to the container
      });
    }
  };

  xhttp.open('GET', '/renderClub', true);
  xhttp.send();
}

function rsvp(eventID) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const rsvpButton = document.querySelector(".rsvp-button");
      rsvpButton.innerText = "RSVP'D";
    } else if (this.readyState === 4 && this.status === 401) {
      alert("Sign in Required");
      window.location.href = '/index.html';
    } else if (this.readyState === 4 && this.status === 500) {
      alert("Already RSVP'D");
    }
  };
  const data = { event: eventID };
  xhttp.open("POST", "/rsvp", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
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
      const timeElement = document.getElementById("time");
      const locationElement = document.getElementById("location");
      const imageElement = document.getElementById("event-image");
      const rsvpButton = document.querySelector(".rsvp-button");
      rsvpButton.addEventListener("click", function () {
        rsvp(eventID);
      });
      eventNameElement.innerText = event.EventName;
      descriptionElement.innerText = event.EventLongDescription;
      dateElement.innerText = "Date: " + event.EventDate;
      timeElement.innerText = "Time: " + event.EventTime;
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
  xhttp.open("POST", "/event_specific", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function loadPastEvent(clubID, eventID) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var eventData = JSON.parse(this.responseText);
      var event = eventData[0];
      const eventNameElement = document.getElementById("event-name");
      const descriptionElement = document.getElementById("description");
      const dateElement = document.getElementById("date");
      const timeElement = document.getElementById("time");
      const locationElement = document.getElementById("location");
      const imageElement = document.getElementById("event-image");
      eventNameElement.innerText = event.EventName;
      descriptionElement.innerText = event.EventLongDescription;
      dateElement.innerText = "Date: " + event.EventDate;
      timeElement.innerText = "Time: " + event.EventTime;
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
  xhttp.open("POST", "/event_specific", true);
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
function loadPastEventDetails() {
  var params = new URLSearchParams(window.location.search);
  var clubID = params.get('param1');
  var eventID = params.get('param2');

  // Call the function to load the event data
  loadPastEvent(clubID, eventID);
}

function goToUpEvent(clubID, eventID) {

  var param1 = clubID;
  var param2 = eventID;
  var url = 'events_specific.html?param1=' + encodeURIComponent(param1) + '&param2=' + encodeURIComponent(param2);
  window.open(url, '_blank');
}

function goToPastEvent(clubID, eventID) {

  var param1 = clubID;
  var param2 = eventID;
  var url = 'events_specific_past.html?param1=' + encodeURIComponent(param1) + '&param2=' + encodeURIComponent(param2);
  window.open(url, '_blank');
}

function renderUpEvents(clubId) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var events = JSON.parse(this.responseText); // Parse the JSON response
      var eventsContainer = document.querySelector('.events');

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
          const clubID = clubId; // Replace with the actual club ID
          goToUpEvent(clubID, eventID);
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
        eventInfoContent.innerHTML = "<strong>Date:</strong> " + event.EventDate + "<br>" +
          "<strong>Time:</strong>" + event.EventTime + "<br>" +
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

  xhttp.open("POST", "/renderUpEvents", true);
  const data = {
    clubId: clubId,
    Tense: 'Upcoming'
  };
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function renderPastEvents(clubId) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var events = JSON.parse(this.responseText); // Parse the JSON response
      var eventsContainer = document.querySelector('.events');

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
          const clubID = clubId; // Replace with the actual club ID
          goToPastEvent(clubID, eventID);
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
        eventInfoContent.innerHTML = "<strong>Date:</strong> " + event.EventDate + "<br>" +
          "<strong>Time:</strong>" + event.EventTime + "<br>" +
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

  xhttp.open("POST", "/renderPastEvents", true);
  const data = {
    clubId: clubId,
    Tense: 'Past'
  };
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function checkRSVPParam(eventID) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const rsvpButton = document.querySelector(".rsvp-button");
      rsvpButton.textContent = "RSVP'D";
    } else if (this.readyState === 4 && this.status === 500) {
      alert("Already RSVP'D");
    }
  };

  const data = {
    event: eventID
  };
  xhttp.open("POST", "/checkRSVP", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function checkRSVP() {
  var params = new URLSearchParams(window.location.search);
  var eventID = params.get('param2');
  checkRSVPParam(eventID);
}

function checkMember(clubID) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 500) {
      alert("You need to be a member of club");
      window.location.href = '/index.html';
    }
  };
  const data = { club: clubID };
  xhttp.open("POST", "/checkMember", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function renderMyEvents() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var events = JSON.parse(this.responseText); // Parse the JSON response
      var eventsContainer = document.querySelector('.events');

      // Clear any existing event elements
      eventsContainer.innerHTML = '';

      // Iterate over the events and create HTML elements
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        const eventID = event.EventID;
        const clubId = event.ClubID;


        var eventElement = document.createElement('div');
        eventElement.className = 'event';
        eventElement.addEventListener('click', function () {
          goToUpEvent(clubId, eventID);
        });


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
  xhttp.open("GET", "/renderMyEvents", true);
  xhttp.send();
}


function toggleNotification2() {

  const notificationSwitch = document.getElementById("notificationSwitch");
  const clubId = 2; // Replace with the appropriate club ID
  const pref = notificationSwitch.checked;
  updateEmailPref(clubId, pref);
}

function toggleNotification1() {
  const notificationSwitch = document.getElementById("notificationSwitch");
  const clubId = 1; // Replace with the appropriate club ID
  const pref = notificationSwitch.checked;
  updateEmailPref(clubId, pref);
}
function checkpref1() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      const receiveEmails = response[0] && response[0].ReceiveEmails !== undefined
        ? response[0].ReceiveEmails : false;
      const notificationSwitch = document.getElementById("notificationSwitch");
      notificationSwitch.checked = receiveEmails;
      toggleNotification1(); // Trigger the toggle function to update the slider
    }
  };
  const data = { clubID: 1 };
  xhttp.open("POST", "/checkpref", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}
function checkpref2() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      const receiveEmails = response[0] && response[0].ReceiveEmails !== undefined
        ? response[0].ReceiveEmails : false;
      const notificationSwitch = document.getElementById("notificationSwitch");
      notificationSwitch.checked = receiveEmails;
      toggleNotification2(); // Trigger the toggle function to update the slider
    }
  };
  const data = { clubID: 2 };
  xhttp.open("POST", "/checkpref", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

function logout() {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
      alert('Logged Out');
      window.location.reload();
    } else if (req.readyState === 4 && req.status === 403) {
      alert('Not logged in');
    }
  };
  req.open('POST', '/logout', true);
  req.send();
}
