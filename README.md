# Angular cookbook
Simple cookbook application.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This is simple cookbook application, with core angular feature implementations with NgRx library usage.

After running the app, not authenticatd user can take use of shopping list, where user can:
* add new ingredients to the shopping list
* remove already existing one

After authentication, user additionally can take use of recipe list, where user can:
* add new recipes
* edit existing one
* removing recipes
* save recipe list to the external database
* fetch recipe list from the external database

Please be aware of necessity of using API keys.

In order to do that, please follow below steps:
* enter `ng generate environments` in the terminal
* add property `API_KEY` to the `environment` object in both files created by CLI.

Application is also available on mobile devices.

## Technologies
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.2.

Library versions:
* Angular - version 16.2.0
* ngrx/effects: 16.3.0,
* ngrx/store: 16.3.0,
* bootstrap - version 5.3.2
* rxjs - version 7.8.0
* uuid - version 9.0.1

## Setup
After cloning project repository run `npm install` to install dependencies.

After that, run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
