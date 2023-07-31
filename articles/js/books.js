const selectedDiv = document.getElementById("selected-div");

function updateSelectedDiv(id, color) {
    selectedDiv.textContent = id;
    selectedDiv.style.color = color;
}

// Add event listeners to each span element
const spanElements = document.getElementsByTagName("span");
for (let i = 0; i < spanElements.length; i++) {
    const span = spanElements[i];
    span.addEventListener("mouseover", function () {
        const id = span.id;
        prevColor = span.style.color;
        span.style.color = "red"; // Change to the desired color on hover
        updateSelectedDiv(id, prevColor);
    });
    span.addEventListener("mouseout", function () {
        span.style.color = prevColor;
        updateSelectedDiv("");
    });
}

// Function to scroll to the specified element when the page loads
function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
}

// Check if the URL has a fragment identifier and scroll to the element if it exists
document.addEventListener("DOMContentLoaded", function () {
    const url = window.location.href;
    const fragmentIndex = url.indexOf("#");
    if (fragmentIndex !== -1) {
        const fragment = url.substring(fragmentIndex + 1);
        scrollToElement(fragment);
        document.getElementById(fragment).style.color = 'red';
    }
});