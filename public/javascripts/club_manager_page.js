
function handleSearch(event) {
    if (event.key === "Enter") {
        const searchTerm = event.target.value;
        window.location.href = `search_results.html?query=${searchTerm}`;
    }
  }

  const searchInput = document.querySelector('.search input');
  searchInput.addEventListener('keydown', handleSearch);

  document.addEventListener('DOMContentLoaded', function () {
    var logo = document.querySelector('.logo');
    logo.addEventListener('click', function () {
        window.location.href = 'club_manager_page.html';
    });
  });

function goManagerHome(){
window.location.href = '/club_manager_page.html';
}

function openClubMemberPopup() {
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
  xhttp.open('GET', '/users/viewmembers', true);
  xhttp.send();
}

function closeClubMemberPopup() {
  var popup = document.getElementById('popupContainer');
  popup.style.display = 'none';
}

function clubinfo() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var clubele = document.getElementById("club-button");
      var club = JSON.parse(this.responseText);
      clubele.innerText = club[0].ClubName;
    }
  };
  xhttp.open('GET', '/users/clubinfo', true);
  xhttp.send();
}


function goCreateEvent() {
  window.location.href = '/create_event.html';
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("create-event-button").addEventListener("click", function () {
        window.open("create_event.html", "_blank");
    });

    document.getElementById("send-announcement-button").addEventListener("click", function () {
        window.open("create_announcement.html", "_blank");
    });

    document.getElementById("write-email-button").addEventListener("click", function () {
        window.open("create_email.html", "_blank");
    });

    var dropdownBtn = document.querySelector(".dropdown-btn");
    var dropdownContent = document.querySelector(".dropdown-content");

    dropdownBtn.addEventListener("click", function () {
        dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
    });

    document.addEventListener("view-rsvps-button", function () {
        var rsvpsBtn = document.querySelector(".rsvp-button");
        var popUp = document.querySelector(".popup-container");

        rsvpsBtn.addEventListener("click", function () {
            popUp.style.display = (popUp.style.display === "block") ? "none" : "block";
        });
    });
});

function sendEmail() {
 window.location.href = '/create_email.html';
}