import chai from 'chai';
const expect = chai.expect;
import User from '../src/User.js';
import TravelRepository from '../src.TravelRepository.js';


describe('User', () => {
  beforeEach(() => {
    let testRepository = new TravelRepository()
    let testUser = new User(1, testRepository)

    testRepository.destinations = [
      {
        alt: "a picture of cool stuff",
        destination: "Place, Bigger Place",
        estimatedFlightCostPerPerson: 400,
        estimatedLodgingCostPerDay: 70,
        id: 1,
        image: "https://images.unsplash.com/photo-1489171084"
      },
      {
        alt: "a picture of lame stuff",
        destination: "Thingsville, Thingland",
        estimatedFlightCostPerPerson: 200,
        estimatedLodgingCostPerDay: 500,
        id: 2,
        image: "https://images.unsplash.com/photo-1489171084"
      },
      {
        alt: "a picture of weird stuff",
        destination: "Stuff, Stuffland",
        estimatedFlightCostPerPerson: 40,
        estimatedLodgingCostPerDay: 40,
        id: 3,
        image: "https://images.unsplash.com/photo-1489171084"
      }
    ]
  })








  it('should return true', function() {
    expect(true).to.equal(true);
  });
});
