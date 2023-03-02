<!DOCTYPE html>
<html lang="fr">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Mon portfolio">
        <title>Alan Guyenne</title>
        <link rel="stylesheet" href="asset/css/style.min.css">
        <meta name="robots" content="index, follow">
        <meta name="google" content="notranslate">
        <meta name="author" content="Kamitsune">
    </head>

<body>

    <header>

        <a href="#home" class="logo">Logo</a>

        <nav>
            <ul class="menu">
                <li><a href="#home" class="menuActive">Accueil</a></li>
                <li><a href="#about" class="menuActive">Profil</a></li>
                <li><a href="#" class="menuActive">Projets</a></li>
                <li><a href="#contact" class="menuActive">Contact</a></li>
            </ul>
        </nav>

    </header>

    <section id="home" class="lazy-section" data-src="section.html">
        
        <img src="asset/img/stars.webp" alt="Background stars" id="stars">
        <img src="asset/img/moon.webp" alt="Background moon" id="moon">
        <img src="asset/img/mountains_behind.webp" alt="Background behind mountains" id="mountains_behind">

        <h1 id="myName">Alan Guyenne</h1>

        <div id="arrow">
            <span></span>
            <span></span>
        </div>

        <img src="asset/img/mountains_front.webp" alt="Background front mountains" id="mountains_front">
    </section>

    <section id="about" class="lazy-section" data-src="section.html">

        <div class="txtBox">
            <h2>Qui suis-je ?</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde fugit laudantium ex ratione iure cumque nihil veritatis   ipsam blanditiis hic sequi id iste exercitationem, minima explicabo incidunt excepturi dolores odio. Lorem ipsum dolor sit    amet consectetur, adipisicing elit. Aliquam esse pariatur exercitationem provident eos? Pariatur atque dolor nesciunt  dolores quibusdam! Rem quae totam illum corrupti minus quia, earum necessitatibus praesentium! Lorem ipsum, dolor sit amet   consectetur adipisicing elit. Consequuntur culpa quasi adipisci inventore? Dolore dolorum voluptatum aspernatur repellat  consequuntur molestias ducimus ipsa facilis autem? Illum voluptas consequatur dolor illo praesentium.</p>
        </div>

    </section>

    <section id="contact" class="lazy-section" data-src="section.html">

        <canvas class="canvas">
            Your browser does not support canvas element.
        </canvas>

        <div class="formContainer">

            <h1 class="formTitle">Me contacter</h1>

            <form action="" method="post">
                <input type="text" name="firstname" id="firstname" placeholder="Prénom" class="formInput">
                <input type="text" name="lastname" id="lastname" placeholder="Nom" class="formInput">
                <input type="email" name="email" id="email" placeholder="Adresse mail" class="formInput">
                <textarea name="msg" id="msg" placeholder="Message" class="msg"></textarea>
                <button class="formSend">Envoyer</button>
            </form>

        </div>
        
    </section>

    <script src="asset/js/script.js"></script>
</body>
</html>