// HOME PAGE - ANIMATED TEXT

const texts = [
    "Geomatics Engineering Student",
    "Interested in GIS",
    "Learning Web GIS",
    "Interested in Remote Sensing"
];

const typingElement = document.querySelector(".typing-text");

let textIndex = 0;

if (typingElement) {

    setInterval(function () {

        // Fade out
        typingElement.classList.add("fade-out");

        setTimeout(function () {

            // Change text
            textIndex = (textIndex + 1) % texts.length;

            typingElement.textContent = texts[textIndex];

            // Fade in
            typingElement.classList.remove("fade-out");

        }, 500);

    }, 2000);

}