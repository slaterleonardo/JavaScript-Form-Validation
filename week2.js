const form = document.querySelector("#form");

const validateName = (name) => {
  if (name.length === 0) {
    return ["Name is required", false];
  }
  
  if (name.length < 2) {
    return ["Name must be at least 2 characters", false];
  }

  if (name.length > 50) {
    return ["Name must be less than 50 characters", false];
  }

  if (!/^[a-zA-Z\s]*$/.test(name)) {
    return ["Name must contain only letters", false];
  }

  return ["", true];
};

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  const ok = re.test(email);

  if (!ok) {
    return ["Invalid email", false];
  }

  return ["", true];
};

const validatePhoneNumber = (phoneNumber) => {
  if (phoneNumber.length === 0) {
    return ["Phone number is required", false];
  }

  const re = /^\d{10}$/;
  const ok = re.test(phoneNumber);

  if (!ok) {
    return ["Invalid phone number", false];
  }

  return ["", true];
};

const clearErrors = () => {
  document.querySelector("#fn-error").textContent = "";
  document.querySelector("#ln-error").textContent = "";
  document.querySelector("#email-error").textContent = "";
  document.querySelector("#phone-error").textContent = "";
};

const formatPhoneNumber = (phoneNumber) => {
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();

  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;
  const email = document.querySelector("#email").value;
  const phoneNumber = document.querySelector("#phone").value;

  let [message, ok] = validateName(firstName)
  if (!ok) {
    document.querySelector("#fn-error").textContent = message
  }

  [message, ok] = validateName(lastName)
  if (!ok) {
    document.querySelector("#ln-error").textContent = message
  }

  [message, ok] = validateEmail(email)
  if (!ok) {
    document.querySelector("#email-error").textContent = message
  }

  [message, ok] = validatePhoneNumber(phoneNumber)
  if (!ok) {
    document.querySelector("#phone-error").textContent = message
  }

  form.style.display = "none";

  let person = {
    firstName,
    lastName,
    email,
    phoneNumber
  }

  const confirmation = document.querySelector("#confirmation");
  confirmation.style.display = "block";
  confirmation.innerHTML = `
    <p>First Name: ${person.firstName}</p>
    <p>Last Name: ${person.lastName}</p>
    <p>Email: ${person.email}</p>
    <p>Phone: ${formatPhoneNumber(person.phoneNumber)}</p>
  `;
});
