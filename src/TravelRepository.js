class TravelRepository {
  constructor() {
    this.currentDay = "2020/09/22"
  }

  getDestinations () {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
      .then(response => response.json())
      .then(data => this.destinations = data.destinations)
  }

  getTrips () {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
      .then(response => response.json())
      .then(data => {
        this.trips = data.trips;
      })
  }
}

export default TravelRepository;