// Function to show error message
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Function to hide error message
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

// Function to check if input is valid
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    if (inputElement.classList.contains(config.inputNameClass)) {
      showInputError(
        formElement,
        inputElement,
        "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
        config
      );
    } else {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        config
      );
    }
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Function to toggle button state
export const toggleButtonState = (inputList, buttonElement, config) => {
  if (inputList.some((inputElement) => !inputElement.validity.valid)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// Function to set event listeners
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// Function to enable validation
export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

// Function to hide validation
export const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
};
