import './css/base.scss';
import node from './node.js';
import domUpdate from 'domUpdates.js';
import User from './User';
import TravelRepository from './TravelRepository';

let traveler;
let repository = new TravelRepository;
repository.getDestinations();
repository.getTrips();
setTimeout(() => {
  traveler = new User(Math.floor(Math.random() * 20), repository);
  traveler.getUserData();
}, 100)

setTimeout(function() { 
  console.log(traveler)
  console.log(repository)
}, 101);
