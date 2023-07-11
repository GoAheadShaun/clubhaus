const vue = new Vue({
    el: '#test',
    data: {
      isManagerLoggedIn: false
    },
    created() {
      this.isLoggedInStatus();
    },

    methods: {
      isLoggedInStatus: function (event) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
          if (this.status === 200 && this.readyState === 4) {
            var status = JSON.parse(this.responseText).success;
            vue.isManagerLoggedIn = status;
          }
        };

        xhttp.open("GET", "/users/isLoggedIn", true);
        xhttp.send();
      }
    }
});

function goHome(){
    window.location.href = 'index.html';
   }

  function goManagerHome(){
    window.location.href = '/club_manager_page.html';
   }
   function visitLogin(){
     window.location.href = '/managerLogin.html';
   }

   function visitMyAccount(){
     window.location.href = '/manager_account.html';
   }






function login(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    const form = document.querySelector('.form-container');
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;
    const data = {
        email: email,
        password: password,
        type: 'manager'
    };

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                window.location.href = '/club_manager_page.html';
            } else if (this.status === 401) {
                alert('Sign In Unsuccessful');
            }
        }
    };
    xhttp.open('POST', '/users/login', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data));
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
  xhttp.open('POST', '/users/viewrsvp', true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  const data = {
    event: eventID
  };
  xhttp.send(JSON.stringify(data));
}

function loadEvent(clubID,eventID) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var eventData = JSON.parse(this.responseText);
        var event = eventData[0];
        const eventNameElement = document.getElementById("event-name");
        const descriptionElement = document.getElementById("description");
        const dateElement = document.getElementById("date");
        const locationElement = document.getElementById("location");
        const imageElement = document.getElementById("event-image");
        const rsvpButton = document.querySelector(".rsvp-button");
        rsvpButton.addEventListener("click", function(){
          viewrsvp(eventID);
        });

        eventNameElement.innerText = event.EventName;
        descriptionElement.innerText = event.EventLongDescription;
        dateElement.innerText = "Date: " + event.EventDate;
        locationElement.innerText = "Location: " + event.EventLocation;
        imageElement.src = event.EventImageURL;

      }else if (this.readyState === 4 && this.status === 401){
        alert("Sign in Required");
        window.location.href = '/index.html';
      }
    };
    const data = {
      club: clubID,
      event: eventID
    };
    xhttp.open("POST", "/users/event_specific", true);
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
    var url = 'events_specific_manager.html?param1=' + encodeURIComponent(param1) + '&param2=' + encodeURIComponent(param2);
    window.open(url, '_blank');
}
function renderUpManagerEvents() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var events = JSON.parse(this.responseText); // Parse the JSON response
        var eventsContainer = document.querySelector('.events');
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
          eventElement.addEventListener('click', function() {
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
      }else if (this.readyState === 4 && this.status === 401){
        alert("Sign in Required");
        window.location.href = '/index.html';
      }
    };

    xhttp.open("POST", "/users/renderUpEvents", true);
    const data = {
      Tense: 'Upcoming'
    };
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data));
}

function placeInfo(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var data = JSON.parse(this.responseText);
      var emailID = data[0].ManagerID;
      var first = data[0].FirstName;
      var last = data[0].LastName;
      var nameElement = document.querySelector('.info p:nth-child(1)');
      var emailElement = document.querySelector('.info p:nth-child(2)');
      nameElement.textContent = "Name: " + first + " " + last;
      emailElement.textContent = "Email: " + emailID;
    }else if (this.readyState === 4 && this.status === 401){
      alert("Sign in Required");
      window.location.href = '/index.html';
    }
  };
  xhttp.open("GET", "/users/info", true);
  xhttp.send();

}

function create() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      window.location.href = '/club_manager_page.html';
    } else if (this.readyState === 4 && this.status === 401) {
      alert("Failed to create event");
    }
  };

  // Extract form data
  var eventName = document.getElementById("event-name").value;
  var eventTime = document.getElementById("event-time").value;
  var eventDate = document.getElementById("event-date").value;
  var eventLocation = document.getElementById("event-location").value;
  var eventShortDescription = document.getElementById("shorttextbox-description").value;
  var eventDescription = document.getElementById("textbox-description").value;

  // Create an object with the form data
  const data = {
    eventName: eventName,
    eventTime: eventTime,
    eventDate: eventDate,
    eventLocation: eventLocation,
    eventShortDescription: eventShortDescription,
    eventDescription: eventDescription,
    Tense: 'Upcoming'
  };
  xhttp.open("POST", "/users/create", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

document.getElementById('upload-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  var formData = new FormData(this); // Get form data

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/users/upload', true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        document.getElementById('status-message').textContent = 'Upload successful!';
      } else {
        document.getElementById('status-message').textContent = 'Upload failed!';
      }
    }
  };

  xhr.send(formData);
});

function logout() {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function(){
      if(req.readyState === 4 && req.status === 200){
          alert('Logged Out');
          window.location.reload();
      } else if(req.readyState === 4 && req.status === 401){
          alert('Not logged in');
      }
  };
  req.open('POST','/users/logout');
  req.send();
}
