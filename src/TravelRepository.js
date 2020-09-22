class TravelRepository {
  constructor() {

  }

  getDestinations () {
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
      .then(response => response.json())
      .then(data => this.destinations = data.destinations)
  }
}

export default TravelRepository;