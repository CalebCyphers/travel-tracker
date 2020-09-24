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
      upcomingTripsContent.innerHTML += `<p class='upcoming-trip trip-card'>To: ${destination.destination} <br>• Number of Travelers : ${trip.travelers}<br>• Start Date: ${trip.date}<br>• Duration: ${trip.duration} days.</p>`
    })
  },

  displayCurrentTrip(user, travelRepository) {
    let currentTripContent = document.querySelector('.current-trip-content')
    user.currentTrip.forEach(trip => {
      let destination = travelRepository.destinations.find(place => place.id === trip.destinationID)
      currentTripContent.innerHTML += `<p class='current-trip trip-card'>To: ${destination.destination} <br>• Number of Travelers : ${trip.travelers}<br>• Start Date: ${trip.date}<br>• Duration: ${trip.duration} days.</p>`
    })
  },

  displayPendingTrips(user, travelRepository) {
    let pendingTripsContent = document.querySelector('.pending-trips-content')
    user.pendingTrips.forEach(trip => {
      let destination = travelRepository.destinations.find(place => place.id === trip.destinationID)
      pendingTripsContent.innerHTML += `<p class='pending-trip trip-card'>To: ${destination.destination} <br>• Number of Travelers : ${trip.travelers}<br>• Start Date: ${trip.date}<br>• Duration: ${trip.duration} days.</p>`
    })
  },

  displayPastTrips(user, travelRepository) {
    let pastTripsContent = document.querySelector('.past-trips-content')
    user.pastTrips.forEach(trip => {
      let destination = travelRepository.destinations.find(place => place.id === trip.destinationID)
      pastTripsContent.innerHTML += `<p class='past-trip trip-card'>To: ${destination.destination} <br>• Number of Travelers : ${trip.travelers}<br>• Start Date: ${trip.date}<br>• Duration: ${trip.duration} days.</p>`
    })
  },

  displayYearExpenses(user) {
    let expensesDisplay = document.querySelector('.expenses-display')
    expensesDisplay.innerHTML = `<h3>Total spent this year: $${user.expenses[0].total}*</h3>
    <p>*Number includes $${user.expenses[0].agentFees} in travel agent fees</p>`
  },

  populateDestinationForm(travelRepository) {
    let destinationSelect = document.querySelector('#destination-select')
    travelRepository.destinations.forEach(place => destinationSelect.innerHTML += `<option>${place.destination}</option>`)
  },

  displayEstimatedCost(travelRepository) {
    let destinationSelect = document.querySelector('#destination-select')
    let tripDurationInput = document.querySelector('#duration')
    let numberOfTravelersInput = document.querySelector('#number-of-travelers')
    let estimatedCostDisplay = document.querySelector('.estimated-cost-display')
    let destination = travelRepository.destinations.find(place => place.destination === destinationSelect.value)
    let tripCost = (destination.estimatedFlightCostPerPerson * numberOfTravelersInput.value) + (destination.estimatedLodgingCostPerDay * numberOfTravelersInput.value * tripDurationInput.value)
    estimatedCostDisplay.innerHTML = `<h4>Estimated cost of trip = $${tripCost + Math.round(tripCost * 0.1)}</h4>`
  }
}

export default domUpdate;