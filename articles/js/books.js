const selectedDiv = document.getElementById("selected-div");

function updateSelectedDiv(id, color) {
    selectedDiv.textContent = id;
    selectedDiv.style.color = color;
    inspected_div = id;
    inspected_div_el = document.getElementById(id);
}

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);

    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        }
        catch (ex) {
            return prompt("Copy to clipboard: Ctrl+C, Enter", text);
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}

const past = localStorage.getItem('highlights');
const highlight_array = JSON.parse(past);

const mode = document.getElementById("mode");
const action = document.getElementById("action");

let inspect_mode = false;
let inspected_div = '';
let inspected_div_el = null;

let highlighted_el = highlight_array;

function show_copy(el) {
    try {
        el.style = "background-color: var(--background-color); color: var(--secondary-color); transition: 250ms;"; // Change to the desired color on hover

    }
    catch {

    }
}


// Add event listeners to each span element
const spanElements = document.querySelectorAll("#book-wrapper span");
for (let i = 0; i < spanElements.length; i++) {
    const span = spanElements[i];
    span.addEventListener("mouseover", function () {
        if (inspect_mode == true) {
            const id = span.id;
            prevColor = span.style.color;

            if (span.classList.contains('highlighted')) {
                span.style = "background-color: var(--secondary-color); color: var(--background-color);"; // Change to the desired color on hover
                updateSelectedDiv(id, 'black');
            }
            else {
                span.style = "background-color: var(--secondary-color); color: var(--background-color);"; // Change to the desired color on hover
                updateSelectedDiv(id, 'black');
            }
        }

    });
    span.addEventListener("mouseout", function () {
        if (inspect_mode == true) {
            span.style = 'color: var(--color)';
        }
    });
}

function smoothScroll(target) {
    const targetElement = document.getElementById(target);

    // Scroll to the target element with smooth behavior
    window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
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
        smoothScroll(fragment);
        document.getElementById(fragment).style = "background-color: var(--secondary-color); color: var(--background-color);";
    }
});

function switch_to_read() {
    const spanElements = document.querySelectorAll("#book-wrapper span:not(.highlighted)");
    for (let i = 0; i < spanElements.length; i++) {
        const span = spanElements[i];
        span.style = 'color: var(--color);';
    }

    action.innerText = '';
}

function highlight_history() {
    console.log('called')

    highlight_array.forEach(id => {
        try {
            const element = document.getElementById(id);
            element.classList.add('highlighted');
        }
        catch {

        }
    });
}


function save_highlights() {

    const string_array = JSON.stringify(highlighted_el);
    localStorage.setItem('highlights', string_array)
    console.log('saved highlights')
}

function highlight(el) {

    if (el.classList.contains('highlighted')) {
        el.classList.remove('highlighted');

        highlighted_el = highlighted_el.filter(item => item !== el.id)

        action.innerText = 'removed highlight';
        console.log(highlighted_el)
        save_highlights();
    }
    else {
        el.removeAttribute('style');
        el.classList.add('highlighted')

        highlighted_el.push(el.id);
        save_highlights();

        action.innerText = 'highlighted';



    }

}

document.addEventListener("keyup", function (event) {


    if (event.key === "i") {
        if (inspect_mode == true) {
            switch_to_read();
            updateSelectedDiv("");
            inspect_mode = false;
            mode.innerText = 'read mode';
        }
        else {
            inspect_mode = true;
            switch_to_read();
            mode.innerText = 'inspect mode';
        }
    }

    if (event.key === 'x') {
        copyToClipboard(inspected_div);
        show_copy(inspected_div_el);
        action.innerText = 'copied id';
        setTimeout(() => {
            action.innerText = '';
        }, 2000);
    }

    if (event.key === 'c') {
        copyToClipboard(inspected_div_el.innerText);
        show_copy(inspected_div_el);
        action.innerText = 'copied text';
        setTimeout(() => {
            action.innerText = '';
        }, 2000);

    }

    if (event.key === 'h') {
        highlight(inspected_div_el);
    }
})

highlight_history();
