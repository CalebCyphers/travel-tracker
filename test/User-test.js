import chai from 'chai';
const expect = chai.expect;
import User from '../src/User.js';
import TravelRepository from '../src/TravelRepository.js';

let testRepository;
let testUser;

describe('User', () => {
  beforeEach(() => {
    testRepository = new TravelRepository()
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

    testRepository.trips = [
      {
        date: "2019/09/16",
        destinationID: 2,
        duration: 8,
        id: 1,
        status: "approved",
        suggestedActivities: [],
        travelers: 1,
        userID: 2
      },
      {
        date: "2020/10/04",
        destinationID: 3,
        duration: 3,
        id: 2,
        status: "pending",
        suggestedActivities: [],
        travelers: 5,
        userID: 2
      },
      {
        date: "2020/10/22",
        destinationID: 1,
        duration: 17,
        id: 3,
        status: "approved",
        suggestedActivities: [],
        travelers: 4,
        userID: 2
      },
      {
        date: "2020/02/25",
        destinationID: 3,
        duration: 10,
        id: 4,
        status: "pending",
        suggestedActivities: [],
        travelers: 2,
        userID: 2
      }
    ]

    testUser = new User(2, testRepository)
    testUser.name = "Dingus Dankus"
    testUser.travelerType = "relaxer"
  })

  it('should have a name', () => {
    expect(testUser.name).to.equal("Dingus Dankus");
  });

  it('should have a type', () => {
    expect(testUser.travelerType).to.equal("relaxer");
  });

  it('should be able to have trips planned', () => {
    expect(testUser.upcomingTrips).to.deep.equal([
      {
        date: "2020/10/22",
        destinationID: 1,
        duration: 17,
        id: 3,
        status: "approved",
        suggestedActivities: [],
        travelers: 4,
        userID: 2
      }
    ])
  });

  it('should be able to have past trips', () => {
    expect(testUser.pastTrips).to.deep.equal([
      {
        date: "2019/09/16",
        destinationID: 2,
        duration: 8,
        id: 1,
        status: "approved",
        suggestedActivities: [],
        travelers: 1,
        userID: 2
      }
    ]);
  });
});
