# Movie Recommendation System

## Architecture

![architecture](https://user-images.githubusercontent.com/56771957/214241387-d9f71c19-6cd6-46cf-a3ab-74433898758f.jpeg)

## Project Descriptions

#### _movie.api_

This is web api that datasource is Mongodb.

Keys;

- Nodejs
- Rest Web Api NestJS
- MongoDB (Read Database )
- Modular Design Pattern
- AWS SES
- Auth0
- Swagger Documentation ( address : http://localhost:3000/api)
- Docker

#### _agenda_

Defines the job that will fetch data from moviedb using [Agenda](https://github.com/agenda/agenda) library. Job runs every 60 minutes

Keys;

- Nodejs
- NestJS
- MongoDB ( Write Database )
- Agenda
- Docker

#### _agenda.dashboard_

Provides dashboard for agenda using [AgendaDash](https://github.com/agenda/agendash) library

Keys;

- Nodejs
- MongoDB ( Read Database )
- Express.js (http://localhost:8080/dash/)
- Docker

### Run microservices

In directory that contains docker-compose.yaml;

<pre> $ docker-compose up --build </pre>

### Notes

- Message can be left on the kafka to send an email.(Consumer needs to be written for this case.)
- A module can be created for the mail sending part

### Required Environment

##### Amazon Ses Configuration

- E_MAil_HOST
- AMAZON_SES_USER
- AMAZON_SES_PASS
- AMAZON_SES_MAIL

##### Auth0 Configuration

- AUTH0_JWKSURI
- AUTH0_AUDIENCE
- AUTH0_ISSUER
- AUTH0_CLIENT_ID
- AUTH0_CLIENT_SECRET
- AUTH0_TOKEN_URL
