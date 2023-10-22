
--boundary_.oOo._Z1GvI0ex9UwBbqV5Vto+bnxmDND/03cb
Content-Length: 4353
Content-Type: application/octet-stream
X-File-MD5: f3ce28a192a54632949f48c534318a80
X-File-Mtime: 1697960854
X-File-Path: /pick-a-pizza/mainpage/mainpage.css

@font-face {
    font-family: 'Blanka';
    src: url(../font/Blanka-Regular.otf);
}

@font-face {
    font-family: Rosario;
    src: url(../font/Rosario.ttf);
}

:root {
    --light: #faf4f1;
    --grayish-brown: #68563d;
    --light-peach: #fdd8a9;
    --dandelion: #ffe200;
    --grass: #7bca51;
    --butterscotch: #f3af40;
    --parchment: #faf5a3;
    --tomato: #e9451c;
}

body, html {
    height: 100%;
    width: 100%;
    font-family: Rosario;
    font-size: large;
    margin: 0;
}

header {
    background-color: var(--light);
    width: 100%;
    color: var(--grayish-brown);
}

nav {
    display: flex;
    flex-direction: row;
    margin: auto;
    justify-content: space-between;
}

.logo-container {
    display: flex;
    flex-direction: row;
}

#pizza-logo {
    height: 100px;
    padding-bottom: 1rem;
}

.page-title {
    font-family: 'Blanka', sans-serif;
    margin: auto;
    font-size: xx-large;
}

#navigation-items {
    display: flex;
    flex-direction: row;
    font-family: Rosario;
    justify-content: space-between;
    margin: auto;
    width: 40%;
}

li {
    list-style-type: none;
    margin: auto;
    cursor: pointer;
    font-size: larger;
    font-weight: 600;
}

li:hover {
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.24);
}

#menu-btn {
    padding: 1rem;
}

#menu-dropdown {
    position: relative;
    display: inline-block;
}

#menu-dropdown-content {
    display: none;
    position: absolute;
    left: -2rem;
    top: 3rem;
    background-color: var(--light);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

#menu-dropdown:hover #menu-dropdown-content {
    display: flex;
    flex-direction: column;
}

.menu-link {
    text-align: center;
    text-decoration: none;
    color: var(--grayish-brown);
    padding: 0.7rem;
    cursor: pointer;
}

.menu-link:hover {
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.24);
    background-color: #e5ddda;
}

#user-img {
    width: 100px;
    height: 100px;
    margin: auto 1rem auto auto;
    cursor: pointer;
}

.hero-image {
    min-height: 100%;
    background-image: url(../images/background.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
}

#homepage-content {
    display: block;
    width: 100%;
    margin: auto;
    padding: 10rem 0;
}

#quick-select-container {
    width: 60%;
    text-align: center;
    background-color: #faf4f1ac;
    padding: 10rem 8rem;
    margin: auto;
    border-radius: 20px;
}

#hero-title {
    padding: 1rem 5rem;
    font-size: 50px;
}

#pizza-templates {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    padding: 2rem;
}

#pizza-selection-text {
    font-size: x-large;
}

.pizza-selector {
    padding: 1rem;
    border-radius: 50px;
    cursor: pointer;
    font-family: Rosario;
    font-size: larger;
    border: hidden;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.pizza-selector:hover {
    box-shadow: rgba(0, 0, 0, 0.56) 0px 3px 8px;
}

#button-1 {
    background-color: var(--light-peach);
}

#button-2 {
    background-color: var(--light);
}

#button-3 {
    background-color: var(--dandelion);
}

#button-4 {
    background-color: var(--grass);
}

#button-5 {
    background-color: var(--butterscotch);
}

#button-6 {
    background-color: var(--parchment);
}

#button-7 {
    background-color: var(--tomato);
}

#content-tabs {
    width: 85%;
    margin: auto;
    padding-top: 10rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5rem;
}

.content-tab {
    height: 15rem;
    width: auto;
    background-color: var(--light);
    text-align: center;
    padding: 3rem;
    display: block;
}

#phone-icon {
    width: 5rem;
    margin-top: 3rem;
}

footer {
    padding: 2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: var(--grayish-brown);
}

#contact-info {
    text-align: center;
    margin-left: 2rem;
}

#social-media-icons {
    width: 30%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.fa {
    padding: 20px;
    font-size: x-large;
    text-align: center;
    text-decoration: none;
    color: var(--grayish-brown);
    border-radius: 50%;
    background-color: var(--light);
    margin: auto;
}
--boundary_.oOo._Z1GvI0ex9UwBbqV5Vto+bnxmDND/03cb
Content-Length: 3804
Content-Type: application/octet-stream
X-File-MD5: 3ffedb19e845fd63cb4df39693006e77
X-File-Mtime: 1697960433
X-File-Path: /pick-a-pizza/mainpage/mainpage.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Etusivu</title>
    <script src="main.js" defer></script>
    <link rel="stylesheet" href="mainpage.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo-container" id="header-logo">
                <img src="../images/pizza_logo.png" alt="Pick-a-Pizza icon" id="pizza-logo">
                <h1 class="page-title">Pick-a-Pizza</h1>
            </div>
            <ul id="navigation-items">
                <div class="dropdown" id="menu-dropdown">
                    <li id="menu-btn">Menu</li>
                    <div id="menu-dropdown-content">
                        <a href="#" class="menu-link">Gluten-free</a>
                        <a href="#" class="menu-link">Keto</a>
                        <a href="#" class="menu-link">Pizza for One</a>
                        <a href="#" class="menu-link">Vegan</a>
                        <a href="#" class="menu-link">Party-size</a>
                        <a href="#" class="menu-link">Low Calorie</a>
                    </div>
                </div>
                <li>Make a Pizza</li>
            </ul>
            <img src="../images/user.png" alt="Login/Register Button" id="user-img">
        </nav>
    </header>
    <div class="hero-image" id="homepage-background">
        <div id="homepage-content">
            <div id="quick-select-container">
                <h2 class="page-title" id="hero-title">Pick-a-Pizza</h2>
                <p id="pizza-selection-text">Choose one or build from scratch:</p>
                <div id="pizza-templates">
                    <button class="pizza-selector" id="button-1">Gluten-free</button>
                    <button class="pizza-selector" id="button-2">Keto</button>
                    <button class="pizza-selector" id="button-3">Pizza for One</button>
                    <button class="pizza-selector" id="button-4">Vegan</button>
                    <button class="pizza-selector" id="button-5">Party-size</button>
                    <button class="pizza-selector" id="button-6">Low Calorie</button>
                </div>
                <button class="pizza-selector" id="button-7">Your Own Pizza!</button>
            </div>
            <div id="content-tabs">
                <div class="content-tab" id="about-us">
                    <h3>About Us</h3>
                </div>
                <div class="content-tab" id="contacts">
                    <h3>Contacts</h3>
                    <img src="../images/phone-icon.png" alt="Image of a ringing phone" id="phone-icon">
                </div>
                <div class="content-tab" id="offers">
                    <h3>2 + 1 = 2</h3>
                </div>
                <div class="content-tab" id="promo-code">
                    <h3>All vegan pizzas for 10 €. Promo code VEGAN10</h3>
                </div>
            </div>
        </div>
    </div>
    <footer>
        <div id="contact-info">
            <p>Contacts:<br>
                <span id="phone-number">+35800000000</span><br>
                <span id="address">Karaportti 2, 02610 Espoo</span></p>
        </div>
   