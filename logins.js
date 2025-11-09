// ====== SIGNUP FORM ITEMS ====== //

const openSignupFormButton = document.querySelector("#button-option-signup");
const signupFormContainer = document.querySelector("#signup-form");
const signupForm = signupFormContainer.querySelector(".form");
const signupUserEmail = signupForm.querySelector("#email");
const signupUsername = signupForm.querySelector("#username-new");
const signupPassword = signupForm.querySelector("#password-new");
const signupRetypePassword = signupForm.querySelector("#password-retype");
const signupSubmitButton = signupForm.querySelector("#signup-submit-button");
const closeSignupFormButton = signupForm.querySelector("#signup-close-button");

// ====== LOGIN FORM ITEMS ====== //

const openLoginFormButton = document.querySelector("#button-option-login");
const loginFormContainer = document.querySelector("#login-form");
const loginForm = loginFormContainer.querySelector(".form");
const loginUsername = loginForm.querySelector("#username");
const loginPassword = loginForm.querySelector("#password");
const loginSubmitButton = loginForm.querySelector(".form__login-button");
const closeLoginFormButton = loginForm.querySelector("#login-close-button");

// ====== ADD EXPENSE FORM ITEMS ====== //

const openAddExpenseFormButton = document.querySelector(
  "#button-option-add-expense"
);
const addExpenseFormContainer = document.querySelector("#expense-form");
const addExpenseForm = addExpenseFormContainer.querySelector(".form");
const expenseCategory = addExpenseForm.querySelector("#expense-category");
const expenseAmount = addExpenseForm.querySelector("#expense-amount");
const expenseDate = addExpenseForm.querySelector(".expense-date");
const expenseDetails = addExpenseForm.querySelector("#expense-details");
const addExpenseSubmitButton = addExpenseForm.querySelector("add-expense-item");
const closeAddExpenseFormButton = addExpenseForm.querySelector(
  "#add-expense-close-button"
);
// ====== OPEN & CLOSE FORM FUNCTIONS ====== //

function openForm(form) {
  form.classList.add("form_opened");

  // need to add esc key listener here //
}

function closeForm(form) {
  form.classList.remove("form_opened");
  // remove esc key listener here //
  // add click listener on outer layer (loginFormContainer) to close form also//
}

// ====== OPEN SIGNUP FORM ====== //

openSignupFormButton.addEventListener("click", () => {
  openForm(signupFormContainer);
});

// ====== 'CLOSE' & 'SUBMIT' SIGNUP FORM ====== //
closeSignupFormButton.addEventListener("click", (evt) => {
  closeForm(signupFormContainer);
});

function storeSignupUserInfo() {
  signupUserEmail.textContent = signupUsername.value;
  signupUsername.textContent = signupUsername.value;
  signupPassword.textContent = signupPassword.value;
}

signupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  storeSignupUserInfo();
  closeForm(signupFormContainer);

  // add password match checker
  // add reset inputs functionality
});

// ====== OPEN LOGIN FORM ====== //
openLoginFormButton.addEventListener("click", () => {
  openForm(loginFormContainer);
});

// ====== 'CLOSE' LOGIN FORM ====== //
loginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  //  add login credentials checker
  //  add reset inputs functionality
  closeForm(loginFormContainer);
});

closeLoginFormButton.addEventListener("click", (evt) => {
  closeForm(loginFormContainer);
});

// ====== OPEN ADD EXPENSE FORM ====== //
openAddExpenseFormButton.addEventListener("click", () => {
  openForm(addExpenseFormContainer);
});

// ====== 'CLOSE' EXPENSE FORM ====== //
addExpenseForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  //  add new expense to exsisting expense data
  //  add reset inputs functionality
  closeForm(addExpenseFormContainer);
});

closeAddExpenseFormButton.addEventListener("click", (evt) => {
  closeForm(addExpenseFormContainer);
});
