import './css/base.scss';
import domUpdate from './domUpdate.js';
import User from './User';
import TravelRepository from './TravelRepository';

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

let constructDOM = (user) => {
  domUpdate.displayGreeting(user)
}

// setTimeout(function() { 
//   console.log(traveler)
//   console.log(repository)
// }, 151);
