function getToken() {
  const key = Object.keys(window.localStorage).filter(function (e) {
    return e.startsWith("@@auth0spajs@@")
  })
  const token = JSON.parse(localStorage.getItem(key[0])).body.access_token

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: {}
  }

  fetch("https://api.openai.com/dashboard/onboarding/login", options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((data) => {
      // Handle the response data here
      console.log("Your session token is: " + data.user.session.sensitive_id)
    })
}
