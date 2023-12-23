const email = document.querySelector("input#email");
const country = document.querySelector("select#countries");
const zip = document.querySelector("input#zip");
const password = document.querySelector("input#password");
const confirmPassword = document.querySelector("input#confirm-password");
const submitBtn = document.querySelector("button#submit");
const greet = document.querySelector(".greet");

// Add eventlisters to form fields
email.addEventListener("input", validateEmail);
country.addEventListener("change", validateCountry);
zip.addEventListener("input", validateZip);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    validateEmail() &
    validateCountry() &
    validateZip() &
    validatePassword() &
    validateConfirmPassword()
  ) {
    greet.style.display = "block";
  }
});

function addMessage(element, text) {
  removeMessage(element);
  const message = document.createElement("span");
  message.className = "error";
  message.innerText = text;
  element.parentElement.appendChild(message);
}

function removeMessage(element) {
  element.parentElement.querySelector("span.error")?.remove();
}

function validateEmail() {
  if (email.value == "") {
    email.classList = "invalid";
    addMessage(email, "enter a Email");
    return false;
  }
  if (email.validity.typeMismatch) {
    email.classList = "invalid";
    addMessage(email, "enter correct Email");
    return false;
  } else if (email.value != "") {
    removeMessage(email);
    email.classList = "valid";
    return true;
  }
}

function validateCountry() {
  if (country.value == "default" || country.value == "CS") {
    addMessage(country, "please select a country");
    country.classList = "invalid";
    return false;
  } else {
    removeMessage(country);
    country.classList = "valid";
    return true;
  }
}

function validateZip() {
  if (zip.value.length >= 3 && zip.value.length <= 6) {
    zip.classList = "valid";
    removeMessage(zip);
    return true;
  } else {
    addMessage(zip, "enter correct zip code ");
    zip.classList = "invalid";
    return false;
  }
}

function validatePassword() {
  const value = password.value;
  const hasCapital = RegExp("(?=.*?[A-Z])").test(value);
  const hasSmall = RegExp("(?=.*?[a-z])").test(value);
  const hasDigit = RegExp("(?=.*?[0-9])").test(value);
  const hasSpecialCh = RegExp("(?=.*?[#?!@$ %^&*-])").test(value);
  const hasEightCh = RegExp(".{8,}").test(value);

  const valid =
    hasCapital && hasDigit && hasEightCh && hasSmall && hasSpecialCh;

  let messageText = "should have ";

  if (!hasCapital) {
    messageText += "at least one Caiptal letter ";
  } else if (!hasSmall) {
    messageText += "at least one small letter ";
  } else if (!hasDigit) {
    messageText += "at least one digit b/w 0-9";
  } else if (!hasSpecialCh) {
    messageText += "at least one special character ";
  } else if (!hasEightCh) {
    messageText += "at least 8 character";
  }

  if (!valid) {
    addMessage(password, messageText);
    password.classList = "invalid";
    return false;
  } else {
    removeMessage(password);
    password.classList = "valid";
    return true;
  }
}

function validateConfirmPassword() {
  if (confirmPassword.value == password.value && confirmPassword.value != "") {
    confirmPassword.classList = "valid";
    removeMessage(confirmPassword);
    return true;
  } else {
    addMessage(confirmPassword, "enter same passowrd as above");
    confirmPassword.classList = "invalid";
    return false;
  }
}
