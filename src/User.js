import time from '../src/Time.js';

class User {
  constructor(userId, travelData) {
    this.userId = userId
    this.upcomingTrips = this.findUpcomingTrips(travelData)
    this.pastTrips = this.findPastTrips(travelData)
    this.pendingTrips = this.findPendingTrips(travelData)
    this.currentTrip = this.findCurrentTrip(travelData)
    this.expenses = this.findExpensesForCurrentYear(travelData)
    this.name = "Dingus"
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

  findExpensesForCurrentYear(travelData) {
    let future = time.daysFromDate(new Date(), 36500)
    let spentThisYear = {};
    spentThisYear.thisYear = new Date(new Date().getFullYear(), 0)
    spentThisYear.tripExpenses = travelData.trips.reduce((acc, trip) => {
      if (time.isBetween(spentThisYear.thisYear, time.buildDate(trip.date), future) && trip.status === "approved" && trip.userID === this.userId) {
        let destination = travelData.destinations.find(place => place.id === trip.destinationID)
        let totalForTrip = (destination.estimatedFlightCostPerPerson * trip.travelers) + (destination.estimatedLodgingCostPerDay * trip.travelers)
        return acc + totalForTrip
      } else {
        return acc
      }
    }, 0)
    spentThisYear.agentFees = Math.floor(spentThisYear.tripExpenses * 0.1)
    spentThisYear.total = spentThisYear.tripExpenses + spentThisYear.agentFees
    return [spentThisYear]
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