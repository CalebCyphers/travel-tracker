const domUpdate = {
  displayGreeting(user) {
    let nameChunks = user.name.split(" ")
    let greeting = document.querySelector('.greeting-text')
    greeting.innerText = `Welcome ${nameChunks[0]}`
  },

  displayUpcomingTrips(user, travelRepository) {
    let upcomingTripsContent = document.querySelector('.upcoming-trips-content')
    user.upcomingTrips.forEach(trip => {
      let destination = travelRepository.destinations.find(place => place.id === trip.destinationID)
      upcomingTripsContent.innerHTML += `<p class='upcoming-trip trip-card'>To: ${destination.destination} <br>• Number of Travelers : ${trip.travelers}<br>• Start Date: ${trip.date}<br>• Quest Duration: ${trip.duration} days.</p>`
    })
  },

  displayCurrentTrip(user, travelRepository) {
    let currentTripContent = document.querySelector('.current-trip-content')
    user.currentTrip.forEach(trip => {
      let destination = travelRepository.destinations.find(place => place.id === trip.destinationID)
      currentTripContent.innerHTML += `<p class='current-trip trip-card'>To: ${destination.destination} <br>• Number of Travelers : ${trip.travelers}<br>• Start Date: ${trip.date}<br>• Quest Duration: ${trip.duration} days.</p>`
    })
  },

  
}

export default domUpdate;