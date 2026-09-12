console.log("IT Support Toolkit loaded successfully.");


// ========================================
// INTERNET STATUS
// ========================================

function checkInternet() {

    const status = document.getElementById("internetStatus");

    if (!status) return;

    if (navigator.onLine) {

        status.innerHTML =
            "🟢 <strong>ONLINE</strong><br>Internet connection detected.";

    } else {

        status.innerHTML =
            "🔴 <strong>OFFLINE</strong><br>No internet connection detected.";

    }

}


// ========================================
// CONNECTION INFORMATION
// ========================================

function showConnectionInfo() {

    const online = document.getElementById("onlineStatus");
    const type = document.getElementById("connectionType");
    const downlink = document.getElementById("downlink");
    const rtt = document.getElementById("rtt");

    if (!online) return;


    online.textContent =
        navigator.onLine ? "🟢 Online" : "🔴 Offline";


    const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;


    if (connection) {

        type.textContent =
            connection.effectiveType || "Unknown";

        downlink.textContent =
            connection.downlink
                ? connection.downlink + " Mbps"
                : "Unknown";

        rtt.textContent =
            connection.rtt
                ? connection.rtt + " ms"
                : "Unknown";

    } else {

        type.textContent = "Not supported";
        downlink.textContent = "Not supported";
        rtt.textContent = "Not supported";

    }


    updateSummary();

}


// ========================================
// LATENCY TEST
// ========================================

async function testLatency() {

    const result =
        document.getElementById("latencyResult");

    if (!result) return;


    result.textContent =
        "🔄 Testing connection...";


    const start = performance.now();


    try {

        await fetch(
            window.location.href,
            {
                method: "HEAD",
                cache: "no-store"
            }
        );


        const end = performance.now();

        const latency =
            Math.round(end - start);


        result.innerHTML =
            `🟢 Response Time: <strong>${latency} ms</strong>`;


        updateSummary();


    } catch (error) {

        result.innerHTML =
            "🔴 Connection test failed.";

    }

}


// ========================================
// NETWORK SUMMARY
// ========================================

function updateSummary() {

    const summary =
        document.getElementById("summary");

    if (!summary) return;


    const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;


    let type = "Unknown";
    let downlink = "Unknown";
    let rtt = "Unknown";


    if (connection) {

        type =
            connection.effectiveType || "Unknown";

        downlink =
            connection.downlink
                ? connection.downlink + " Mbps"
                : "Unknown";

        rtt =
            connection.rtt
                ? connection.rtt + " ms"
                : "Unknown";

    }


    summary.innerHTML = `

        <p>
            <strong>Internet:</strong>
            ${navigator.onLine ? "🟢 Online" : "🔴 Offline"}
        </p>

        <p>
            <strong>Connection:</strong>
            ${type}
        </p>

        <p>
            <strong>Downlink:</strong>
            ${downlink}
        </p>

        <p>
            <strong>RTT:</strong>
            ${rtt}
        </p>

    `;

}


// ========================================
// COPY SUMMARY
// ========================================

function copySummary() {

    const summary =
        document.getElementById("summary");

    if (!summary) return;


    const text =
        summary.innerText;


    navigator.clipboard.writeText(text)
        .then(() => {

            alert("✅ Network information berhasil disalin.");

        })
        .catch(() => {

            alert("❌ Gagal menyalin informasi.");

        });

}


// ========================================
// INITIALIZE
// ========================================

checkInternet();

showConnectionInfo();


// Update when internet status changes

window.addEventListener(
    "online",
    checkInternet
);


window.addEventListener(
    "offline",
    checkInternet
);
