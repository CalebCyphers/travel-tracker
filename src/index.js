import './css/base.scss';
import domUpdate from './domUpdate.js';
import User from './User';
import TravelRepository from './TravelRepository';

let body = document.querySelector('body')
let submitButton = document.querySelector('#form-submit-btn')
let destinationSelect = document.querySelector('#destination-select')
let tripDurationInput = document.querySelector('#duration')
let departureDateInput = document.querySelector('#departure-date')
let numberOfTravelersInput = document.querySelector('#number-of-travelers')

let traveler;
let repository = new TravelRepository;
repository.getDestinations();
repository.getTrips();

setTimeout(() => {
  traveler = new User(Math.floor((Math.random() * 20) + 1), repository);
  traveler.getUserData();
}, 150)

setTimeout(() => {
  constructDOM(traveler)
}, 300)

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
  console.log(newTrip)
  return newTrip
}

let updateForm = () => {
  if (!submitButton.classList.contains('disabled')) {
    domUpdate.displayEstimatedCost(repository)
  }
}

let checkInputs = (event) => {
  if (destinationSelect.value && tripDurationInput.value && numberOfTravelersInput.value && departureDateInput.value) {
    submitButton.classList.remove('disabled')
  }
  if (event.target.classList.contains('btn')) {
    generateTrip(traveler, repository)
  }
  updateForm()
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

setTimeout(function() { 
  console.log(traveler)
  console.log(repository)
}, 151);
