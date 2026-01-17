// Button interaction
document.getElementById("btn").addEventListener("click", () => {
    alert("Button clicked!");
});

// Register Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("service-worker.js")
            .then(() => console.log("Service Worker registered"))
            .catch(err => console.log("Service Worker failed", err));
    });
}
