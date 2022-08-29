# FlairBnB (AirBnB Clone)
FlairBnB is a simple clone of [AirBnB](https://www.airbnb.com/). The site its current state, is used to browse/create listings, and create/browse reviews for listings.

# Site Information
- [Api Documentation](https://github.com/hazeluwuz/Flair-BnB/wiki/API-Documentation)
- [App Features](https://github.com/hazeluwuz/Flair-BnB/wiki/App-Features)
- [DB Schema](https://github.com/hazeluwuz/Flair-BnB/wiki/DB-Schema)
- [Redux State Shape](https://github.com/hazeluwuz/Flair-BnB/wiki/Redux-State-Shape)

# Tech Stack
- JavaScript
- Sequelize
- Express
- React
- Redux
- PostgreSQL

# Build Guide

To install locally: 
- Clone the repo to a folder of your choice `git clone https://github.com/hazeluwuz/Flair-BnB.git`
- `npm install` in the backend folder
- `npm install` in the frontend folder

Setup/Seed database: 
- Create a .env file in the backend folder with the following data
```
PORT=<PORT_NUMBER>
DB_FILE=<DB_FILE_LOCATION>
JWT_SECRET=<SECRET_KEY>
JWT_EXPIRES_IN=<EXPIRATION_TIMER>
```
- `npm run sequelize db:migrate` in the backend folder
- `npm run sequelize db:seed:all` in the backend folder

Running the app:
- `npm start` in the backend folder FIRST
- `npm start` in the frontend folder AFTER


# Splash Page
![image](https://user-images.githubusercontent.com/28935811/187096820-4d4db58b-1d5a-4234-8c54-e8ab47d58d3c.png)
