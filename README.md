# Github Automated Cleaner

this is a simple UI for quickly moving repos from one org or owner to another. 

You can:

* Search for a owner, list their repos
* supply a destination to move repos to
* tool will fork a repo to new destination and then delete it in one click

## Setting up

* fork, clone
* touch `.env.local` and add a github token with all scopes under the key `REACT_APP_GH_TOKEN=< your gh token >`
* run `npm i` to install the required packages
* run `npm run start` to start the application
* navigate to `localhost:3000` to see the app
