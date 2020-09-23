import time from '../src/Time.js';

class User {
  constructor(userId, travelData) {
    this.userId = userId
    this.upcomingTrips = this.findUpcomingTrips(travelData)
    this.pastTrips = this.findPastTrips(travelData)
    this.pendingTrips = this.findPendingTrips(travelData)
    this.currentTrip = this.findCurrentTrip(travelData)
  }

  findUpcomingTrips(travelData) {
    return travelData.trips.filter(trip => {
      let tomorrow = time.daysFromDate(new Date(), 1)
      let future = time.daysFromDate(tomorrow, 36500)
      let departure = time.buildDate(trip.date)
      return trip.status === "approved" && trip.userID === this.userId ? time.isBetween(tomorrow, departure, future) : false
    })
  }

  findPastTrips(travelData) {
    return travelData.trips.filter(trip => {
      let yesterday = time.daysFromDate(new Date(), -1)
      let past = time.daysFromDate(yesterday, -36500)
      let finalDayOfTrip = time.daysFromDate(time.buildDate(trip.date), trip.duration)
      return trip.status === "approved" && trip.userID === this.userId ? time.isBetween(past, finalDayOfTrip, yesterday) : false
    })
  }

  findPendingTrips(travelData) {
    return travelData.trips.filter(trip => {
      let tomorrow = time.daysFromDate(new Date(), 1)
      let future = time.daysFromDate(tomorrow, 36500)
      let departure = time.buildDate(trip.date)
      return trip.status === "pending" && trip.userID === this.userId ? time.isBetween(tomorrow, departure, future) : false
    })
  }

  findCurrentTrip(travelData) {
    return travelData.trips.filter(trip => {
      let today = new Date()
      let departure = time.buildDate(trip.date)
      let finalDayOfTrip = time.daysFromDate(departure, trip.duration)
      return trip.status === "approved" && trip.userID === this.userId ? time.isBetween(departure, today, finalDayOfTrip) : false
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