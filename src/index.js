import './css/base.scss';
import './css/text.scss';
import domUpdate from './domUpdate.js';
import User from './User';
import TravelRepository from './TravelRepository';

let body = document.querySelector('body')
let submitButton = document.querySelector('#form-submit-btn')
let destinationSelect = document.querySelector('#destination-select')
let tripDurationInput = document.querySelector('#duration')
let departureDateInput = document.querySelector('#departure-date')
let numberOfTravelersInput = document.querySelector('#number-of-travelers')
let usernameInput = document.querySelector('#username-input')
let passwordInput = document.querySelector('#password-input')
let loginButton = document.querySelector('#login-btn')

let traveler;
let repository = new TravelRepository;
repository.getDestinations();
repository.getTrips();

let generateTrip = (user) => {
  let destination = repository.destinations.find(place => place.destination === destinationSelect.value)
  let newDate = departureDateInput.value.split('-')
  newDate = newDate.join('/')
  let newTrip = {
    id: Date.now(),
    userID: user.userId,
    destinationID: destination.id,
    travelers: parseInt(numberOfTravelersInput.value),
    date: newDate,
    duration: parseInt(tripDurationInput.value),
    status: 'pending',
    suggestedActivities: []
  }
  postTrip(newTrip)
  domUpdate.addPendingTrip(newTrip, repository)
}

let resetForm = () => {
  destinationSelect.value = ''
  tripDurationInput.value = ''
  departureDateInput.value = ''
  numberOfTravelersInput.value = ''
  if (!submitButton.classList.contains('disabled')) {
    submitButton.classList.add('disabled')
  }
}

let resetLogin = () => {
  usernameInput.value = ''
  passwordInput.value = ''
}

let validateLogin = () => {
  let username = usernameInput.value.split('traveler')
  if (username[0] === '' && parseInt(username[1]) > 0 && parseInt(username[1]) <= 50 && passwordInput.value === 'travel2020') {
    traveler = new User(parseInt(username[1]), repository);
    traveler.getUserData();
    setTimeout(() => {
      constructDOM(traveler)
    }, 200)
    domUpdate.displayAlert()
    setTimeout(() => {
      domUpdate.displayMain()
    }, 250)
  }
}

let postTrip = (trip) => {
  let tripToPost = trip
  let postRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tripToPost)
  };
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', postRequest)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => alert('Data failed to post. Try again later', err))
}

let checkInputs = (event) => {
  if (destinationSelect.value && tripDurationInput.value && numberOfTravelersInput.value && departureDateInput.value) {
    submitButton.classList.remove('disabled')
  }
  if (usernameInput.value && passwordInput.value) {
    loginButton.classList.remove('disabled')
  }
  if (event.target.classList.contains('trip-request-btn') && !event.target.classList.contains('disabled')) {
    generateTrip(traveler)
    resetForm()
  }
  if (event.target.classList.contains('login-btn') && !event.target.classList.contains('disabled')) {
    validateLogin()
    resetLogin()
  }
  if (!submitButton.classList.contains('disabled')) {
    domUpdate.displayEstimatedCost(repository)
  }
}

let constructDOM = (user) => {
  domUpdate.displayGreeting(user)
  domUpdate.displayUpcomingTrips(user, repository)
  domUpdate.displayCurrentTrip(user, repository)
  domUpdate.displayPendingTrips(user, repository)
  domUpdate.displayPastTrips(user, repository)
  domUpdate.displayYearExpenses(user)
  domUpdate.populateDestinationForm(repository)
}

body.addEventListener('click', checkInputs)
body.addEventListener('keyup', checkInputs)
