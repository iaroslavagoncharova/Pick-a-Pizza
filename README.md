
  <img src="./public/images/pizza_logo2.png" width="200" alt="Pizza Logo" align="right">


# Pick-a-pizza

Web development project by Iaroslava Goncharova, Anna Malassu, Juan Rosales.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Pre-Requirements](#pre-requirements)
- [Installation](#installation)

## Introduction

Pick-a-pizza is a pizza ordering app designed to create pizzas from scratch, check nutritional values, and simulate the purchasing process.

## Features

- Generating pizzas based on prompts
- Displaying ingredient data to the user
    - Nutritional values (calories, carbs, etc.)
    - Price of combined ingredients
- Shopping cart
    - Displays data from the pizza
    - Change amount with + and - buttons
- Generating random names depending on pizza type
- "Mock" checkout
- User sign-in and profile creation
- Admin profile
    - Manage orders, users, and ingredients
- HSL and OpenStreetMap APIs
    - Uses the user's location to navigate to the restaurant
    - By public transportation or walking
    - Displays a map with necessary data
        - Users' and destinations' locations
        - Each stop's name and number
        - Transportation method and data
        - Approximate travel time
- Writing and displaying reviews
- Progressive web app

## Pre-Requirements

- Install VSCode
- Install Node.js

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
