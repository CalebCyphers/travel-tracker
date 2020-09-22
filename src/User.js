class User {
  constructor(userId, travelData) {
    this.userId = userId
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