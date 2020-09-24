import './css/base.scss';
import domUpdate from './domUpdate.js';
import User from './User';
import TravelRepository from './TravelRepository';

let submitButton = document.querySelector('#form-submit-btn')

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
  domUpdate.displayEstimatedCost(repository)
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

setTimeout(function() { 
  console.log(traveler)
  console.log(repository)
}, 151);
