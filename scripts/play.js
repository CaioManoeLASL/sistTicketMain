export function activate() {
    document.addEventListener("DOMContentLoaded", () => {
        const playButton = document.getElementById("playButton");
        const container = document.getElementById("container");

        playButton.addEventListener("click", () => {
            playButton.style.display = "none";
            container.style.display = "block";
            container.classList.add("slideIn");
        });
    });
}