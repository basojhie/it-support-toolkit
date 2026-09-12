console.log("IT Support Toolkit loaded successfully.");

// ========================================
// INTERNET STATUS
// ========================================

function checkInternet() {
const status = document.getElementById("internetStatus");
if (!status) return;

```
if (navigator.onLine) {
    status.innerHTML =
        "🟢 <strong>ONLINE</strong><br>Internet connection detected.";
} else {
    status.innerHTML =
        "🔴 <strong>OFFLINE</strong><br>No internet connection detected.";
}
```

}

// ========================================
// CONNECTION INFORMATION
// ========================================

function showConnectionInfo() {
const online = document.getElementById("onlineStatus");
const type = document.getElementById("connectionType");
const downlink = document.getElementById("downlink");
const rtt = document.getElementById("rtt");

```
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
```

}

// ========================================
// LATENCY TEST
// ========================================

async function testLatency() {
const result =
document.getElementById("latencyResult");

```
if (!result) return;

result.textContent =
    "🔄 Testing connection...";

const start = performance.now();

try {
    await fetch(window.location.href, {
        method: "HEAD",
        cache: "no-store"
    });

    const latency =
        Math.round(performance.now() - start);

    result.innerHTML =
        `🟢 Response Time: <strong>${latency} ms</strong>`;

    updateSummary();

} catch (error) {
    result.innerHTML =
        "🔴 Connection test failed.";
}
```

}

// ========================================
// NETWORK SUMMARY
// ========================================

function updateSummary() {
const summary =
document.getElementById("summary");

```
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
```

}

// ========================================
// COPY SUMMARY
// ========================================

function copySummary() {
const summary =
document.getElementById("summary");

```
if (!summary) return;

const text =
    summary.innerText;

navigator.clipboard.writeText(text)
    .then(() => {
        alert(
            "✅ Network information berhasil disalin."
        );
    })
    .catch(() => {
        alert(
            "❌ Gagal menyalin informasi."
        );
    });
```

}

// ========================================
// PUBLIC IP
// ========================================

async function getPublicIP() {
const result =
document.getElementById("publicIP");

```
if (!result) return;

result.innerHTML =
    "🔄 Mengambil Public IP...";

try {
    const response =
        await fetch(
            "https://api.ipify.org?format=json"
        );

    const data =
        await response.json();

    result.innerHTML = `
        🟢 Public IP:<br>
        <strong>${data.ip}</strong>
    `;

    updateSummary();

} catch (error) {
    result.innerHTML =
        "🔴 Gagal mendapatkan Public IP.";
}
```

}

// ========================================
// DNS LOOKUP
// ========================================

async function dnsLookup() {
const input =
document.getElementById("dnsHost");

```
const result =
    document.getElementById("dnsResult");

if (!input || !result) return;

const domain =
    input.value.trim();

if (!domain) {
    result.innerHTML =
        "⚠️ Masukkan domain terlebih dahulu.";

    return;
}

result.innerHTML =
    "🔄 Mencari DNS...";

try {
    const response =
        await fetch(
            `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`
        );

    const data =
        await response.json();

    if (
        data.Answer &&
        data.Answer.length > 0
    ) {
        const records =
            data.Answer
                .map(record => record.data)
                .join("<br>");

        result.innerHTML = `
            🟢 DNS ditemukan

            <br><br>

            <strong>${domain}</strong>

            <br><br>

            ${records}
        `;
    } else {
        result.innerHTML =
            "🟡 Tidak ditemukan DNS A record.";
    }

} catch (error) {
    result.innerHTML =
        "🔴 DNS Lookup gagal.";
}
```

}

// ========================================
// PING TOOL
// ========================================

function setPingTarget(host) {
const input =
document.getElementById("pingHost");

```
if (!input) return;

input.value = host;
```

}

// ========================================
// CHECK LOCAL AGENT
// ========================================

async function checkAgent() {
const status =
document.getElementById("agentStatus");

```
if (!status) return;

status.innerHTML =
    "🔄 Checking Local Agent...";

try {
    const response =
        await fetch(
            "http://127.0.0.1:8765/status",
            {
                method: "GET"
            }
        );

    if (response.ok) {
        status.innerHTML =
            "🟢 <strong>Local Agent Online</strong>";
    } else {
        status.innerHTML =
            "🟡 Local Agent memberikan response.";
    }

} catch (error) {
    status.innerHTML = `
        🔴 <strong>Local Agent Offline</strong>
        <br><br>
        Agent belum berjalan di PC.
    `;
}
```

}

// ========================================
// START PING
// ========================================

async function startPing() {
const input =
document.getElementById("pingHost");

```
const packet =
    document.getElementById("packetCount");

const result =
    document.getElementById("pingResult");

if (!input || !packet || !result) {
    return;
}

const host =
    input.value.trim();

const count =
    Number(packet.value);

if (!host) {
    result.innerHTML =
        "⚠️ Masukkan IP Address atau hostname.";

    return;
}

result.innerHTML = `
    🔄 <strong>Menjalankan ping...</strong>

    <br><br>

    Target:
    <strong>${host}</strong>
`;

try {
    const response =
        await fetch(
            "http://127.0.0.1:8765/ping",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    host: host,
                    count: count
                })
            }
        );

    const data =
        await response.json();

    // ========================================
    // HOST OFFLINE
    // ========================================

    if (!data.success) {
        result.innerHTML = `
            🔴 <strong>HOST OFFLINE</strong>

            <br><br>

            <strong>Target</strong>
            <br>
            ${data.host || host}

            <br><br>

            <strong>Packets</strong>
            <br>
            Sent : ${data.sent ?? count}
            <br>
            Received : ${data.received ?? 0}
            <br>
            Lost : ${data.lost ?? count}
            (${data.loss ?? 100}%)

            <br><br>

            <strong>Status</strong>
            <br>
            🔴 Connection Failed
        `;

        return;
    }

    // ========================================
    // STATUS
    // ========================================

    let statusText =
        "🟢 Connection Good";

    if (data.status === "warning") {
        statusText =
            "🟡 Connection Warning";
    }

    if (data.status === "unstable") {
        statusText =
            "🟠 Connection Unstable";
    }

    // ========================================
    // RESULT
    // ========================================

    result.innerHTML = `
        🟢 <strong>HOST ONLINE</strong>

        <br><br>

        <strong>Target</strong>
        <br>
        ${data.host}

        <br><br>

        <strong>Packets</strong>
        <br>
        Sent : ${data.sent}
        <br>
        Received : ${data.received}
        <br>
        Lost : ${data.lost}
        (${data.loss}%)

        <br><br>

        <strong>Latency</strong>
        <br>
        Minimum : ${data.min ?? "-"} ms
        <br>
        Maximum : ${data.max ?? "-"} ms
        <br>
        Average : ${data.avg ?? "-"} ms

        <br><br>

        <strong>Status</strong>
        <br>
        ${statusText}
    `;

} catch (error) {
    result.innerHTML = `
        🔴 <strong>Local Agent tidak tersedia.</strong>

        <br><br>

        Pastikan IT Support Local Agent
        sedang berjalan pada komputer.
    `;
}
```

}

// ========================================
// INITIALIZE
// ========================================

checkInternet();
showConnectionInfo();

window.addEventListener(
"online",
checkInternet
);

window.addEventListener(
"offline",
checkInternet
);
