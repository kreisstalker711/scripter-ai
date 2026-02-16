const form = document.getElementById("scriptForm");
const output = document.getElementById("output");
const outputSection = document.getElementById("outputSection");
const errorSection = document.getElementById("errorSection");
const errorMessage = document.getElementById("errorMessage");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        type: document.getElementById("contentType").value,
        tone: document.getElementById("tone").value,
        words: parseInt(document.getElementById("wordLimit").value),
        topic: document.getElementById("topic").value
    };

    try {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("API RESPONSE:", result);
        console.log("STATUS:", response.status);


        if (!response.ok) {
            throw new Error(result.message || "Error generating content");
        }

        output.innerHTML = result.content;

        // 🔥 SHOW OUTPUT
        outputSection.style.display = "block";
        errorSection.style.display = "none";

    } catch (err) {
        errorMessage.innerText = err.message;

        // 🔥 SHOW ERROR SECTION
        errorSection.style.display = "block";
        outputSection.style.display = "none";
    }
});

copyBtn.addEventListener("click", () => {
    const text = output.innerText;
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
        `;
        setTimeout(() => {
            copyBtn.innerHTML = originalHtml;
        }, 2000);
    }).catch(err => {
        console.error("Failed to copy:", err);
    });
});

downloadBtn.addEventListener("click", () => {
    const text = output.innerText;
    if (!text) return;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-content.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
