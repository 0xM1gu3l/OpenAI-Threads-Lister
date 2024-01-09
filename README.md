![](https://raw.githubusercontent.com/0xM1gu3l/OpenAI-Threads-Lister/master/assets/icon.png)
# OpenAI Thread Lister

A Simple Plasmo Extension that shows all of your conversations in the ```https://platform.openai.com/playgroud``` Assistants.

# Download
This extension is available at Chrome WebStore!  
https://chromewebstore.google.com/detail/openai-thread-lister/cjmalnnjlimlnmhpincimnjienkgmhjk
## First Time Setup:

You need to get your ```sess-``` token from the ```https://platform.openai.com/``` website  
Luckly for you, I have a script that automatically fetches the token for you.

Copy and paste this into the browser console while in the ```platform.openai.com``` website (Note that you need to be logged in to get the "sess-" token):
```js
const key = Object.keys(window.localStorage).filter((function(e) {
        return e.startsWith("@@auth0spajs@@")
    }
))
const token = JSON.parse(localStorage.getItem(key[0])).body.access_token

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: {}
};

fetch("https://api.openai.com/dashboard/onboarding/login", options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle the response data here
    console.log("Your session token is: " + data.user.session.sensitive_id);
  })
```

This should return your session token in the console.

After that, you click in the extension and input the session token. Don't worry, it just saves it to the localStorage!

Then you can start using it! Enjoy!
