console.log("IT Support Toolkit loaded successfully.");


// ================================
// DASHBOARD MENU
// ================================

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("click", function(event) {

        // Jangan menjalankan menu ketika tombol/input diklik
        if (
            event.target.tagName === "BUTTON" ||
            event.target.tagName === "INPUT"
        ) {
            return;
        }

        const title = card.querySelector("h2");

        if (!title) return;

        console.log("Module:", title.textContent);

    });

});


// ================================
// PING INFORMATION
// ================================

function pingInfo() {

    const host = document.getElementById("host");
    const result = document.getElementById("result");

    if (!host || !result) return;

    const address = host.value.trim();

    if (address === "") {

        result.innerHTML =
            "⚠️ Masukkan IP Address atau hostname terlebih dahulu.";

        return;
    }

    result.innerHTML = `
        <strong>🔍 Target:</strong> ${address}<br><br>
        ⚠️ Browser tidak dapat menjalankan
        perintah ping Windows secara langsung.
        <br><br>
        Untuk ping sebenarnya, kita akan membuat
        <strong>Local IT Support Agent</strong> pada tahap berikutnya.
    `;
}


// ================================
// NETWORK INFORMATION
// ================================

function showNetworkInfo() {

    const info = document.getElementById("networkInfo");

    if (!info) return;

    info.innerHTML = `
        <strong>Browser Network Information</strong><br><br>

        Online Status:
        ${navigator.onLine ? "🟢 Online" : "🔴 Offline"}

        <br><br>

        Browser:
        ${navigator.userAgent}
    `;
}
