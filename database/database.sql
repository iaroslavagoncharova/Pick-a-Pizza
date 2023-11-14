DROP DATABASE IF EXISTS pickapizza;
CREATE DATABASE pickapizza;
USE pickapizza;

CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  address VARCHAR(255) NOT NULL,
  favorite_pizza VARCHAR(255),
  phone_number VARCHAR(15) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ShoppingCart (
    cart_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,  
    price DECIMAL(4,2) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Orders (
    order_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cart_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    order_status VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (cart_id) REFERENCES ShoppingCart(cart_id)
);

CREATE TABLE Reviews (
    review_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    review_text VARCHAR(255) NOT NULL,
    stars INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Prompts (
    prompt_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    prompt_name VARCHAR(255) NOT NULL,
    dough VARCHAR(255) NOT NULL,
    size CHAR(1) NOT NULL,
    price DECIMAL(4,2) NOT NULL,
    calories INT NOT NULL,
    carbs INT NOT NULL,
    protein INT NOT NULL,
    fats INT NOT NULL
);

CREATE TABLE Ingredients (
    ingredient_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    portion_size INT NOT NULL,
    price DECIMAL(4,2) NOT NULL,
    calories INT NOT NULL,
    carbs INT NOT NULL,
    protein INT NOT NULL,
    fats INT NOT NULL, 
    in_stock INT NOT NULL
);

CREATE TABLE PromptIngredient (
    prompt_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    FOREIGN KEY (prompt_id) REFERENCES Prompts(prompt_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id)
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
    price DECIMAL(4,2) NOT NULL,
    prompt_id INT,
    FOREIGN KEY (prompt_id) REFERENCES Prompts(prompt_id)
);

CREATE TABLE CartPizza (
    cart_id INT NOT NULL,
    pizza_id INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES ShoppingCart(cart_id),
    FOREIGN KEY (pizza_id) REFERENCES Pizza(pizza_id)
);

CREATE TABLE PizzaIngredient (
    pizza_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    FOREIGN KEY (pizza_id) REFERENCES Pizza(pizza_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id)
);

-- Update order status when it's ready:

UPDATE Orders SET order_status = 'complete' WHERE order_id = 12;

-- Update ingredients in stock if there was 1 kg in the beginning and 100 g were used for a pizza:

UPDATE Ingredients SET in_stock = 900 WHERE ingredient_name = 'tomato';

-- Update prompt price if there's a sale:

UPDATE Prompts SET price = 12.00 WHERE prompt_name = 'Gluten-free';

-- Delete a pizza form the cart if a user decides not to buy it:

DELETE FROM CartPizza WHERE pizza_id = 4;

-- Delete an order if it was created by mistake:

DELETE FROM Orders WHERE order_id = 10;

-- Delete a review if it violates company's policy:

DELETE FROM Reviews WHERE review_id = 3;

-- Query to get 5 last orders for a specific user to display on user's profile page:

SELECT * FROM Orders WHERE user_id = 8 ORDER BY created_at DESC LIMIT 5;

-- Query to get all pizzas in the cart to display in the order details:

SELECT * FROM CartPizza WHERE cart_id = 3;

-- Query to get all ingredients to display on admin's page:

SELECT * FROM Ingredients;





