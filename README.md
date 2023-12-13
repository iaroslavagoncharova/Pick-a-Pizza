<img src="./public/images/pizza_logo2.png" align="right" />

# Pick-a-pizza

Web-developing project by Iaroslava Goncharova, Anna Malassu, Juan Rosales. 

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)

## Introduction 
Pizza ordering app built to make pizza from scratch, check nutritional values, and mock purchasing. 

## Features

- Generating Pizzas out of prompts
- Displaying ingriedent data to user
    - Nutritional value (Calories, carbs etc.)
    - Price of combined ingriedents
- Shopping cart
    - Displays data from pizza
    - Change ammount with + and - buttons
- Generating random names depending on pizza type
- "Mock" checkout 
- User sign-in and profile creation
- Admin profile 
    - Manage orders, users and ingriedents
- HSL and OpenStreetMap APIs 
    - Uses users location to navigate to restaurant
    - By public transportation or walking
    - Displays map with needed data
        - Users and destinations location
        - Each stops name and number
        - Transportation method and data
        - Approximate tarvelling time
- Writing and displaying reviews 
- Progressive web app

## Pre requirements

- Install VsCode
- Install node.js

## Installation

Follow these steps to get the project up and running on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/iaroslavagoncharova/pick-a-pizza.git
```
### 2. Install dependencies 

```bash
cd <project_name>
npm install
```
### 3. Clone database script using mariadb

You can find the script in our database folder

### 4. Create env. file containing theese variables:

DB_HOST= localhost
DB_USER= Your user
DB_PASSWORD= Your password
DB_NAME= pickapizza
JWT_SECRET= Your token

### 5. Run the application

``````
npm start
