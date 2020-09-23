class User {
  constructor(userId, travelData) {
    this.userId = userId
    this.upcomingTrips = travelData.trips.filter(trip => {
      console.log(trip)
      let today = travelData.currentDay.split("/")
      console.log(today)
      let departure = trip.date.split("/")
      console.log(departure)
      return parseInt(today[0]) <= parseInt(departure[0]) && parseInt(today[1]) <= parseInt(departure[1]) && parseInt(today[2]) < parseInt(departure[2]) && trip.status === "approved"
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