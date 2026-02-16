const form = document.getElementById("scriptForm");
const output = document.getElementById("output");

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

        if (!response.ok) {
            throw new Error(result.message || "Error generating content");
        }

        output.innerHTML = result.content;

    } catch (err) {
        output.innerHTML = "Error: " + err.message;
    }
});
