document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".logo");
  const cancelButton = document.querySelector(".login_rego_button[type='submit']");
  logo.addEventListener("click", function () {
    window.location.href = "index.html";
  });
});

function isValidEmail(email) {
  // Email must be in the form of <string>@<string>.<string>
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  // Password must have at least one: capital letter, number and special character.
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
  return passwordRegex.test(password);
}

function signUp() {
  const emailInput = document.querySelector('input[name="e-mail"]');
  const confirmEmailInput = document.querySelector('input[name="confirm-email"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const confirmPasswordInput = document.querySelector('input[name="confirm-password"]');
  const emailError = document.getElementById('email-error');
  const confirmEmailError = document.getElementById('confirm-email-error');
  const passwordError = document.getElementById('password-error');
  const confirmPasswordError = document.getElementById('confirm-password-error');

  // Email validation
  if (!isValidEmail(emailInput.value)) {
    emailError.textContent = 'Invalid Email';
    emailInput.classList.add('invalid');
  } else {
    emailError.textContent = '';
    emailInput.classList.remove('invalid');
  }

  // Confirm Email validation
  if (emailInput.value !== confirmEmailInput.value) {
    confirmEmailError.textContent = 'Emails do not match';
    confirmEmailInput.classList.add('invalid');
  } else {
    confirmEmailError.textContent = '';
    confirmEmailInput.classList.remove('invalid');
  }

  // Password validation
  if (!isValidPassword(passwordInput.value)) {
    passwordError.textContent = 'Invalid Password';
    passwordInput.classList.add('invalid');
  } else {
    passwordError.textContent = '';
    passwordInput.classList.remove('invalid');
  }

  // Confirm Password validation
  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordError.textContent = 'Passwords do not match';
    confirmPasswordInput.classList.add('invalid');
  } else {
    confirmPasswordError.textContent = '';
    confirmPasswordInput.classList.remove('invalid');
  }

  // Continue with form submission if all validations pass
  if (
    !emailError.textContent &&
    !confirmEmailError.textContent &&
    !passwordError.textContent &&
    !confirmPasswordError.textContent
  ) {
    const email = emailInput.value;
    const firstName = document.querySelector('input[name="first_name"]').value;
    const lastName = document.querySelector('input[name="last_name"]').value;
    const password = passwordInput.value;
    const data = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    };

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.status === 200 && this.readyState === 4) {
        window.location.href = '/index.html';
      } else if (xhttp.readyState === 4 && xhttp.status === 401) {
        alert("Sign Up Unsuccessful");
      }
    };
    xhttp.open('POST', '/signup', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data));
  }
}

function doGoogleSignUp(response) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.status === 200 && this.readyState === 4) {
      window.location.href = '/index.html';
    } else if (xhttp.readyState === 4 && xhttp.status === 401) {
      alert("Sign Up with Google Unsuccessful");
    }
  };
  xhttp.open('POST', '/signup', true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(response));
}
