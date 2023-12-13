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
  user_level_id INT NOT NULL DEFAULT 2,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Guests (
    guest_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone_number VARCHAR(15) NOT NULL,
    guest_address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) AUTO_INCREMENT=1000;

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
    review_header VARCHAR(255),
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
    user_id INT NOT NULL,
    dough VARCHAR(255) NOT NULL,
    size CHAR(1) NOT NULL,
    message VARCHAR(255),
    calories INT NOT NULL,
    carbs INT NOT NULL,
    protein INT NOT NULL,
    fats INT NOT NULL,
    price DECIMAL(4,2) NOT NULL,
    prompt_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (prompt_id) REFERENCES Prompts(prompt_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
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

CREATE TABLE Dough (
    dough_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dough_name VARCHAR(255) NOT NULL,
    dough_size CHAR(1) NOT NULL,
    dough_price DECIMAL(4,2) NOT NULL,
    dough_calories INT NOT NULL,
    dough_carbs INT NOT NULL,
    dough_protein INT NOT NULL,
    dough_fats INT NOT NULL
);
 

-- User data
INSERT INTO Users (username, password, email, address, favorite_pizza, phone_number, user_level_id, created_at) 
VALUES
('Anna', 'password123', 'anna@example.com', 'Karaportti 2, Espoo', 'Classic', '123456789', 1, '2023-11-14 12:48:00'),
('Slava', 'securepass', 'slava@example.com', 'Karaportti 2, Espoo', 'Low Calorie', '987654321', 1, '2023-11-14 13:30:00'),
('Juan', 'pass123', 'juan@example.com', 'Karaportti 2, Espoo' , 'Keto', '555666777', 2, '2023-11-14 14:15:00');


-- Add data for dough
INSERT INTO Dough (dough_name, dough_size, dough_price, dough_calories, dough_carbs, dough_protein, dough_fats) 
VALUES 
('gluten-free', 'S', 2.50, 500, 90, 4, 10), 
('gluten-free', 'M', 3.50, 750, 135, 6, 15), 
('gluten-free', 'L', 4.50, 1000, 180, 8, 20), 
('keto', 'S', 4.00, 400, 10, 20, 30), 
('keto', 'M', 5.50, 600, 15, 30, 45), 
('keto', 'L', 7.00, 800, 20, 40, 60), 
('usual', 'S', 1.50, 600, 110, 16, 10), 
('usual', 'M', 2.50, 900, 165, 24, 15), 
('usual', 'L', 3.50, 1200, 220, 32, 20);


-- Add data for prompts
INSERT INTO Prompts (prompt_name, dough, size, price, calories, carbs, protein, fats) 
VALUES
('Gluten Free', 'gluten-free', 'M', 10.00, 500, 50, 50, 50),
('Keto', 'usual', 'L', 15.00, 600, 60, 60, 60),
('Low Calorie', 'usual', 'M', 12.00, 400, 40, 40, 40),
('Classic', 'usual', 'L', 14.00, 700, 70, 70, 70),
('Vegan Classic', 'usual', 'M', 13.00, 550, 55, 55, 55),
('Gluten Free Classic', 'gluten-free', 'L', 16.00, 600, 60, 60, 60),
('Season Deal', 'usual', 'L', 18.00, 800, 80, 80, 80);

-- Add Ingredient data
INSERT INTO Ingredients (name, portion_size, price, calories, carbs, protein, fats, in_stock) 
VALUES
('chicken', 100, 2.50, 165, 0, 31, 3.6, 1000),
('beef', 100, 3.00, 250, 0, 26, 17, 1000),
('bacon', 50, 1.50, 42, 0, 3, 3.3, 500),
('ham', 50, 2.00, 72.5, 0, 9, 4, 500),
('tomatoes', 50, 0.75, 9, 2, 0.5, 0.1, 1000),
('onions', 50, 0.50, 20, 4.5, 0.5, 0.1, 1000),
('eggplants', 50, 1.00, 12.5, 3, 0.5, 0.1, 1000),
('mushrooms', 50, 1.20, 11, 1.5, 1.5, 0.2, 1000),
('mozzarella', 50, 1.50, 150, 1, 11, 11.5, 1000),
('parmezan', 50, 2.00, 210, 2, 19, 14, 1000),
('gouda', 50, 1.75, 178, 1, 12, 14, 1000),
('goat-cheese', 50, 2.50, 182, 1, 10.5, 15, 1000),
('tofu', 50, 2.00, 72, 1.5, 7.5, 4, 1000),
('vege-gouda', 50, 2.00, 178, 1, 12, 14, 1000),
('anchovies', 50, 2.50, 105, 0, 14.5, 5, 500),
('shrimps', 50, 3.00, 35.5, 0, 7.5, 0.75, 500),
('mussels', 50, 2.50, 86, 3.5, 12, 2, 500),
('tomato-sauce', 50, 1.00, 41, 8.5, 1.5, 0.25, 1000),
('pesto-sauce', 50, 2.00, 227, 6, 4.5, 21.5, 1000),
('bbq-sauce', 50, 1.50, 65, 16, 0.25, 0.25, 1000),
('pepperoni', 100, 2.00, 494, 2, 24, 42, 1000),
('vege-pepperoni', 100, 1.50, 311, 4, 20, 24, 1000),
('vege-mozzarella', 50, 1.00, 160, 3, 1, 16, 500),
('vege-parmezan', 50, 1.50, 165, 3, 3, 15, 500);

-- Add data to PromptIngredient

INSERT INTO PromptIngredient (prompt_id, ingredient_id) 
VALUES 
(1, 1),
(1, 5),
(1, 6),
(1, 8),
(1, 12),
(2, 2),
(2, 3),
(2, 8),
(2, 9),
(2, 10),
(3, 1), 
(3, 5), 
(3, 6),
(3, 7),
(3, 8),
(3, 14),
(4, 6),
(4, 8),
(4, 9),
(4, 10),
(4, 18),
(4, 21),
(5, 6),
(5, 8),
(5, 18),
(5, 22),
(5, 23),
(5, 24),
(6, 1),
(6, 6),
(6, 8),
(6, 9),
(6, 18);

-- Add data to Pizza 
INSERT INTO Pizza (user_id, dough, size, message, calories, carbs, protein, fats, price, prompt_id, quantity) 
VALUES
(1, 'usual', 'L', 'Extra cheese, please!', 700, 70, 70, 70, 14.00, 4, 2), -- Classic pizza for Anna
(2, 'usual', 'M', 'No onions, extra mushrooms.', 400, 40, 40, 40, 12.00, 3, 1), -- Low Calorie pizza for Slava
(3, 'keto', 'L', 'Keto supreme pizza!', 800, 80, 80, 80, 18.00, 1, 1); -- Keto pizza for Juan


-- Add data to ShoppingCart 
INSERT INTO ShoppingCart (price, user_id) 
VALUES
(20.00, 1), -- User Anna
(15.00, 2), -- User Slava
(18.00, 3); -- User Juan

-- Add data to CartPizza 
INSERT INTO CartPizza (cart_id, pizza_id) 
VALUES
(1, 1), -- Anna's order, completed 
(2, 2), -- Slava's order, in progress
(3, 3); -- Juan's order,

-- Add data to Orders
INSERT INTO Orders (cart_id, order_status, user_id) 
VALUES
(1, 'completed', 1), -- Order for Anna
(2, 'in_progress', 2), -- Order in progress for Slava
(2, 'in_progress', 2),
(2, 'in_progress', 2),
(3, 'completed', 3); -- Order for Juan

-- Add data to Reviews 
INSERT INTO Reviews (review_text, stars, user_id) 
VALUES
('Great pizza! Loved the gluten-free option.', 5, 1), -- Review by Anna
('The low-calorie pizza was amazing.', 4, 2), -- Review by Slava
('Keto pizza was awesome! Will order again.', 5, 3); -- Review by Juan

-- Update order status when it's ready:

UPDATE Orders SET order_status = 'complete' WHERE order_id = 12;

-- Update ingredients in stock if there was 1 kg in the beginning and 100 g were used for a pizza:

UPDATE Ingredients SET in_stock = 900 WHERE name = 'tomato';

-- Update prompt price if there's a sale:

UPDATE Prompts SET price = 12.00 WHERE prompt_name = 'Gluten-free';


-- Query to get 5 last orders for a specific user to display on user's profile page:

SELECT * FROM Orders WHERE user_id = 8 ORDER BY created_at DESC LIMIT 5;

-- Query to get all pizzas in the cart to display in the order details:

SELECT * FROM CartPizza WHERE cart_id = 3;

-- Query to get all ingredients to display on admin's page:

SELECT * FROM Ingredients;

INSERT INTO Dough (dough_name, dough_size, dough_price, dough_calories, dough_carbs, dough_protein, dough_fats) VALUES ('gluten-free', 'S', 2.50, 500, 90, 4, 10), ('gluten-free', 'M', 3.50, 750, 135, 6, 15), ('gluten-free', 'L', 4.50, 1000, 180, 8, 20), ('keto', 'S', 4.00, 400, 10, 20, 30), ('keto', 'M', 5.50, 600, 15, 30, 45), ('keto', 'L', 7.00, 800, 20, 40, 60), ('usual', 'S', 1.50, 600, 110, 16, 10), ('usual', 'M', 2.50, 900, 165, 24, 15), ('usual', 'L', 3.50, 1200, 220, 32, 20);



