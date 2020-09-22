class User {
  constructor(userId) {
    this.userId = userId
  }

  getUserData() {
    fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${this.userId}`)
      .then(response => response.json())
      .then(data => {
        this.data = data
      })
  }
}

export default User;