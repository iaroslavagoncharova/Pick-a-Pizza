DROP DATABASE IF EXISTS pick-a-pizza;
CREATE DATABASE pick-a-pizza;
USE pick-a-pizza;

CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  address VARCHAR(255) NOT NULL,
  favorite_pizza VARCHAR(255),
  phone_number INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Orders (
    order_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    shopping_carts_list 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY user_id REFERENCES Users(user_id)
);

CREATE TABLE Reviews (
    review_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(255) NOT NULL,
    stars INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    edited_at TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY user_id REFERENCES Users(user_id)
);

CREATE TABLE ShoppingCart (
    cart_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    pizzas_list VARCHAR(255),  --json.toString
    price FLOAT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY user_id REFERENCES Users(user_id)
);

CREATE TABLE Prompts (
    prompt_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    prompt_name VARCHAR(255) NOT NULL,
    dough VARCHAR(255) NOT NULL,
    size CHAR(1) NOT NULL,
    price FLOAT NOT NULL,
    ingredients_list VARCHAR(255) NOT NULL --json.toString
);

CREATE TABLE Pizza (
    pizza_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dough VARCHAR(255) NOT NULL,
    size CHAR(1) NOT NULL,
    message VARCHAR(255),
    calories INT NOT NULL,
    carbs INT NOT NULL,
    protein INT NOT NULL,
    fats INT NOT NULL,
    price FLOAT NOT NULL,
    prompt_id INT,
    FOREIGN KEY prompt_id REFERENCES Prompts(prompt_id)
);

CREATE TABLE Ingredients (
    ingredient_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    portion_size INT NOT NULL,
    price FLOAT NOT NULL,
    calories INT NOT NULL,
    carbs INT NOT NULL,
    protein INT NOT NULL,
    fats INT NOT NULL
)