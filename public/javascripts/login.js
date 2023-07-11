function login(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    const form = document.querySelector('.form-container');
    const email = form.elements['email'].value;
    const password = form.elements['password'].value;
    const data = {
        email: email,
        password: password,
        type: 'user'

    };

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                window.location.href = '/index.html';
            } else if (this.status === 401) {
                alert('Sign In Unsuccessful');
            }
        }
    };
    xhttp.open('POST', '/login', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data));
}

function doGoogleLogin(response) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                window.location.href = '/index.html';
            } else if (this.status === 401) {
                alert('Sign In with Google Unsuccessful');
            }
        }
    };
    xhttp.open('POST', '/login', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(response));
}
