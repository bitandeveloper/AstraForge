// Custom Cursor Logic
document.addEventListener("DOMContentLoaded", () => {
    // Create cursor elements
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    const follower = document.createElement("div");
    follower.classList.add("cursor-follower");
    document.body.appendChild(follower);

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    // Track mouse movement
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Immediate update for the dot
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
    });

    // Smooth follow for the ring
    function animate() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        follower.style.left = posX + "px";
        follower.style.top = posY + "px";

        requestAnimationFrame(animate);
    }
    animate();

    // Hover effects
    const interactiveElements = document.querySelectorAll("a, button, .btn, .interactive, input, textarea");

    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("active");
            follower.classList.add("active");
        });
        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("active");
            follower.classList.remove("active");
        });
    });

    // Click effect
    document.addEventListener("mousedown", () => {
        cursor.classList.add("clicked");
        follower.classList.add("clicked");
    });

    document.addEventListener("mouseup", () => {
        cursor.classList.remove("clicked");
        follower.classList.remove("clicked");
    });
});
