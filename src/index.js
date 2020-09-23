// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import User from './User';
import TravelRepository from './TravelRepository';
import './images/turing-logo.png'

let traveler;
let repository = new TravelRepository;
repository.getDestinations();
repository.getTrips();

setTimeout(() => {
  traveler = new User(getRandomUserID(), repository);
  traveler.getUserData();
}, 1000)

let getRandomUserID = () => {
  return Math.floor(Math.random() * 20)
}

setTimeout(function() { 
  console.log(traveler)
  console.log(repository)
}, 3000);

console.log('This is the JavaScript entry file - your code begins here.');
