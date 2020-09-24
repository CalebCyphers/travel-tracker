class TravelRepository {
  constructor() {
  }

  getDestinations () {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
      .then(response => response.json())
      .then(data => this.destinations = data.destinations)
      .catch(err => alert('Destinations failed to load. Try again later', err))
  }

  getTrips () {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
      .then(response => response.json())
      .then(data => {
        this.trips = data.trips;
      })
      .catch(err => alert('Trips failed to load. Try again later', err))
  }
}

export default TravelRepository;