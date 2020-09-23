import time from '../src/Time.js';

class User {
  constructor(userId, travelData) {
    this.userId = userId
    this.upcomingTrips = this.findUpcomingTrips(travelData)
  }

  findUpcomingTrips(travelData) {
    return travelData.trips.filter(trip => {
      let today = time.buildDate(travelData.currentDay)
      let future = time.daysFromDate(today, 365)
      let departure = time.buildDate(trip.date)
      return trip.status === "approved" ? time.isBetween(today, departure, future) : false
    })
  }

  

  getUserData() {
    fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${this.userId}`)
      .then(response => response.json())
      .then(data => {
        this.name = data.name
        this.travelerType = data.travelerType
      })
  }

}

export default User;