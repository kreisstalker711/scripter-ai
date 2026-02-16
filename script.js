const form = document.getElementById("scriptForm");
const output = document.getElementById("output");
const outputSection = document.getElementById("outputSection");
const errorSection = document.getElementById("errorSection");
const errorMessage = document.getElementById("errorMessage");

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
