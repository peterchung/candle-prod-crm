## Overview

Fullstack app for Candle CRM.
<br>It can be used as a integration, or views or both

## Install

1. Make sure you have Node (v18+) installed

<br>
3. Install dependencies with npm:

```bash
npm install
```

## Configure your Monday App

## Run the project

1. Add your MONDAY_SIGNING_SECRET, MONDAY_CLIENT_SECRET, MONDAY_API_TOKEN, and Ngrok tunnel BASE_URL to .env file
   <br> \*\* To get your MONDAY_SIGNING_SECRET and MONDAY_CLIENT_SECRET go to monday.com, open Developers section, open your app and find the Signing Secret in "Basic Information" section
   <br> ![Screenshot](https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/VladMystetskyi/4db4f03e-67a5-482d-893e-033db67ee09b_monday-Apps2020-05-1901-31-26.png)
   <br> \*\* To get your MONDAY_API_TOKEN go to monday.com, open Developers section, open "My access tokens" section
2.
3. Build the client code and run the server with ngrok tunnel with the command:

```bash
npm run dev-server
```

```bash
ngrok http 8080
```

<br><br><br><br>
When it's time to production, you can deploy your app to monday code hosting.

## Deploying to [monday code](https://developer.monday.com/apps/docs/hosting-your-app-with-monday-code) hosting

1. For the first-time deployment, use this command to initialize Monday code:

2. Start deployment to monday-code using the following command [monday apps cli](https://github.com/mondaycom/monday-code-cli#mapps-codepush):

```bash
npm run deploy
```

    1. Choose your app that will be associated with the deployment.
    2. Choose the draft version to deploy.
