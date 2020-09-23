import chai from 'chai';
const expect = chai.expect;
import time from '../src/Time.js';

describe('Time', () => {
    let date = new Date(2020, 0, 1);
    let tomorrow = new Date(2020, 0, 2);
    let yesterday = new Date(2019, 11, 31);

  describe('daysFromDate()', () => {

    it('should return a Date object corresponding to the Date a given number of days away from a reference Date', () => {

      expect(time.daysFromDate(date, 1).getTime()).to.equal(tomorrow.getTime());
      expect(time.daysFromDate(date, -1).getTime()).to.equal(yesterday.getTime());
    });
  });

  describe('isBetween()', () => {

    it('should return `true` if a date falls between 2 dates (inclusive)', () => {

      expect(time.isBetween(yesterday, date, tomorrow)).to.equal(true);
      expect(time.isBetween(yesterday, yesterday, tomorrow)).to.equal(true);
      expect(time.isBetween(yesterday, tomorrow, tomorrow)).to.equal(true);
    });

    it('should return `false` if a date falls between 2 dates (inclusive)', () => {
      let oneMSBeforeYesterday = new Date( yesterday.getTime() - 1);
      let oneMSAfterTomorrow = new Date ( tomorrow.getTime() + 1);

      expect(time.isBetween(yesterday, oneMSBeforeYesterday, tomorrow)).to.equal(false);
      expect(time.isBetween(yesterday, oneMSAfterTomorrow, tomorrow)).to.equal(false);
    });
  });
});
