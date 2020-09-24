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

let updateForm = () => {
  if (!submitButton.classList.contains('disabled')) {
    domUpdate.displayEstimatedCost(repository)
  }
}

let checkInputs = () => {
  if (destinationSelect.value && tripDurationInput.value && numberOfTravelersInput.value && departureDateInput.value) {
    submitButton.classList.remove('disabled')
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

submitButton.addEventListener('click', updateForm)
body.addEventListener('click', checkInputs)

setTimeout(function() { 
  console.log(traveler)
  console.log(repository)
}, 151);
