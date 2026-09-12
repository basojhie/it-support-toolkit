console.log("IT Support Toolkit loaded successfully.");

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("click", () => {

        const title = card.querySelector("h2").textContent;

        alert(title + " module sedang dikembangkan.");

    });

});
