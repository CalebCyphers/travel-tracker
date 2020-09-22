// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import User from './User';
import TravelRepository from './TravelRepository';
import './images/turing-logo.png'

let traveler = new User(10);
let repository = new TravelRepository;

traveler.getUserData();
repository.getDestinations();
repository.getTrips();

setTimeout(function() { 
  console.log(traveler)
  console.log(repository)
}, 3000);

console.log('This is the JavaScript entry file - your code begins here.');
