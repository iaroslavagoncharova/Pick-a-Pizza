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
 

-- User data
INSERT INTO Users (username, password, email, address, favorite_pizza, phone_number, user_level_id, created_at) 
VALUES
('Anna', 'password123', 'anna@example.com', 'Karaportti 2, Espoo', 'Classic', '123456789', 1, '2023-11-14 12:48:00'),
('Slava', 'securepass', 'slava@example.com', 'Karaportti 2, Espoo', 'Low Calorie', '987654321', 1, '2023-11-14 13:30:00'),
('Juan', 'pass123', 'juan@example.com', 'Karaportti 2, Espoo' , 'Keto', '555666777', 2, '2023-11-14 14:15:00');


-- Add data for prompts
INSERT INTO Prompts (prompt_name, dough, size, price, calories, carbs, protein, fats) 
VALUES
('Gluten Free', 'gluten-free', 'M', 10.00, 500, 50, 50, 50),
('Keto', 'usual', 'L', 15.00, 600, 60, 60, 60),
('Low Calorie', 'usual', 'M', 12.00, 400, 40, 40, 40),
('Classic', 'usual', 'L', 14.00, 700, 70, 70, 70),
('Vegan Classic', 'vegan', 'M', 13.00, 550, 55, 55, 55),
('Gluten Free Classic', 'gluten-free', 'L', 16.00, 600, 60, 60, 60),
('Season Deal', 'usual', 'L', 18.00, 800, 80, 80, 80);

-- Add Ingredient data
INSERT INTO Ingredients (name, portion_size, price, calories, carbs, protein, fats, in_stock) 
VALUES
('chicken', 100, 2.50, 200, 0, 30, 10, 1000),
('beef', 100, 3.00, 250, 0, 26, 15, 1000),
('bacon', 50, 1.50, 120, 0, 10, 8, 500),
('ham', 50, 2.00, 150, 2, 15, 10, 500),
('tomatoes', 50, 0.75, 20, 5, 1, 0, 1000),
('onions', 50, 0.50, 30, 7, 1, 0, 1000),
('eggplants', 50, 1.00, 40, 10, 2, 0, 1000),
('mushrooms', 50, 1.20, 15, 3, 2, 0, 1000),
('mozzarella', 50, 1.50, 200, 1, 10, 15, 1000),
('parmezan', 50, 2.00, 180, 0, 15, 13, 1000),
('gouda', 50, 1.75, 160, 1, 12, 10, 1000),
('goat-cheese', 50, 2.50, 120, 0, 8, 10, 1000),
('tofu', 50, 2.00, 150, 3, 10, 8, 1000),
('vege-gouda', 50, 2.00, 160, 2, 10, 8, 1000),
('anchovies', 50, 2.50, 100, 0, 15, 5, 500),
('shrimps', 50, 3.00, 120, 1, 18, 5, 500),
('mussels', 50, 2.50, 100, 2, 15, 3, 500),
('tomato-sauce', 50, 1.00, 30, 7, 1, 0, 1000),
('pesto-sauce', 50, 2.00, 80, 2, 2, 7, 1000),
('bbq-sauce', 50, 1.50, 50, 10, 0, 0, 1000);




-- Example: 'Gluten Free' prompt
INSERT INTO PromptIngredient (prompt_id, ingredient_id) 
VALUES
(1, 5), -- tomatoes
(1, 6), -- onions
(1, 7); -- eggplants

-- Example: 'Keto' prompt
INSERT INTO PromptIngredient (prompt_id, ingredient_id) 
VALUES
(2, 1), -- chicken
(2, 2), -- beef
(2, 3); -- bacon



-- Example: 'Vegan Classic' prompt
INSERT INTO PromptIngredient (prompt_id, ingredient_id) 
VALUES
(5, 5), -- tomatoes
(5, 6), -- onions
(5, 7), -- eggplants
(5, 10), -- mozzarella
(5, 12); -- gouda



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





