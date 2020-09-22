import chai from 'chai';
const expect = chai.expect;
import User from '../src/User.js';
import TravelRepository from '../src.TravelRepository.js';


describe('User', () => {
  beforeEach(() => {
    let testRepository = new TravelRepository()
    let testUser = new User(1, testRepository)
  })








  it('should return true', function() {
    expect(true).to.equal(true);
  });
});
