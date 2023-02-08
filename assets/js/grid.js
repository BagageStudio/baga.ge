export default function () {
    const gridEl = document.getElementById("grid");

    document.addEventListener("keydown", (e) => {
        const keyName = e.key;
        if (keyName !== "g" || !e.ctrlKey) return;
        gridEl.classList.toggle("hide");
    });
}
