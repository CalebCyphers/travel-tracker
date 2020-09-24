const domUpdate = {
  displayGreeting(stuff) {
    let nameChunks = stuff.name.split(" ")
    let greeting = document.querySelector('.greeting-text')
    greeting.innerText = `Welcome ${nameChunks[0]}`
  }
}

export default domUpdate;