import time from '../src/Time.js';

class User {
  constructor(userId, travelData) {
    this.userId = userId
    this.upcomingTrips = this.findUpcomingTrips(travelData)
    this.pastTrips = this.findPastTrips(travelData)
  }

  findUpcomingTrips(travelData) {
    return travelData.trips.filter(trip => {
      let today = new Date()
      let future = time.daysFromDate(today, 365)
      let departure = time.buildDate(trip.date)
      return trip.status === "approved" && trip.userID === this.userId ? time.isBetween(today, departure, future) : false
    })
  }

  findPastTrips(travelData) {
    return travelData.trips.filter(trip => {
      let yesterday = time.daysFromDate(new Date(), -1)
      let past = time.daysFromDate(yesterday, -365)
      let finalDayOfTrip = time.daysFromDate(time.buildDate(trip.date), trip.duration)
      return trip.status === "approved" && trip.userID === this.userId ? time.isBetween(past, finalDayOfTrip, yesterday) : false
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