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

-- INSERT INTO Users (username, password, email, address, favorite_pizza, phone_number, created_at) 
-- VALUES ('test1', '12345', 'test1@gmail.com', 'Esimerkkikatu 1, Helsinki', 'gluten-free tuna', '123456789', '2023-11-14 12:48:00');

-- INSERT INTO ShoppingCart (price, user_id) 
-- VALUES (10.00, 1), (15.00, 1), (20.00, 1);


-- INSERT INTO Orders (cart_id, order_status, user_id) 
-- VALUES (2, 'in_progress', 1), (3, 'in_progress', 1), (4, 'in_progress', 1), (5, 'in_progress', 1);


-- INSERT INTO Orders (cart_id, order_status, user_id) 
-- VALUES ()

-- INSERT INTO Reviews (review_text, stars, user_id) 
-- VALUES (
--     'I love this place! I order pizza here every week and it always arrives hot and delicious. I recommend it to everyone!', 
--     5, 
--     1
-- );

-- INSERT INTO Reviews (review_text, stars, user_id) 
-- VALUES (
--     'I ordered a pizza and it was cold and soggy. I will never order from here again.', 
--     1, 
--     1
-- );

-- INSERT INTO Prompts (prompt_name, dough, size, price, calories, carbs, protein, fats) 
-- VALUES (
--     'gluten-free', 'gluten-free', 'M', 10.00, 500, 50, 50, 50
-- ), (
--     'vegan', 'usual', 'L', 15.00, 600, 60, 60, 60
-- );

-- INSERT INTO Ingredients (name, portion_size, price, calories, carbs, protein, fats, in_stock) 
-- VALUES (
--     'tomato', 100, 1.00, 100, 10, 10, 10, 1000
-- ),
-- ('tuna', 100, 3.00, 200, 20, 20, 20, 1000);


-- INSERT INTO PromptIngredient (prompt_id, ingredient_id) 
-- VALUES 
-- (1, 1),
-- (1, 2);

-- INSERT INTO Pizza (dough, size, message, calories, carbs, protein, fats, price, prompt_id) 
-- VALUES (
--     'gluten-free', 'M', 'I would like it to be extra hot if possible', 500, 50, 50, 50, 10.00, 1
-- ), (
--     'usual', 'L', '', 600, 60, 60, 60, 15.00, 2
-- );

-- INSERT INTO CartPizza (cart_id, pizza_id) 
-- VALUES (
--     2, 1
-- ), (
--     2, 2
-- );


-- Update order status when it's ready:

UPDATE Orders SET order_status = 'complete' WHERE order_id = 12;

-- Update ingredients in stock if there was 1 kg in the beginning and 100 g were used for a pizza:

UPDATE Ingredients SET in_stock = 900 WHERE name = 'tomato';

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





