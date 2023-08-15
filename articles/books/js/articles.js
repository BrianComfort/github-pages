{
    let times = localStorage.getItem('viewed')
    times = parseInt(times) + 1;

    localStorage.setItem('viewed', times)

    const toggle = document.querySelector('#toggle');
    const sidebar = document.querySelector('#sidebar');
    const links = document.querySelector('#links-bt')
    const link = document.querySelector('#links')

    let sidebarIsVisible = false;
    let linksIsVisible = false;

    toggle.addEventListener('click', function () {
        if (sidebarIsVisible == false) {
            sidebar.style.display = 'grid';
            sidebarIsVisible = true;
        }
        else {
            sidebar.style.display = 'none';
            sidebarIsVisible = false;
        }
    })

    links.addEventListener('click', function () {
        if (linksIsVisible == false) {
            link.style.display = 'block';
            linksIsVisible = true;
        }
        else {
            link.style.display = 'none';
            linksIsVisible = false;
        }
    })

    function smoothScroll(target) {
        const targetElement = document.querySelector(target);

        // Scroll to the target element with smooth behavior
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }

    // Attach click event listener to anchor elements
    document.addEventListener('DOMContentLoaded', function () {
        const anchorElements = document.querySelectorAll('a[href^="#"]');

        anchorElements.forEach(function (anchorElement) {
            anchorElement.addEventListener('click', function (event) {
                event.preventDefault();
                const target = this.getAttribute('href');
                smoothScroll(target);
            });
        });
    });

    const root = document.documentElement;
    const theme = document.querySelector('#theme');

    let themes = ['dark', 'light', 'paper', 'night']
    let current_theme = 0;
    let first_change = false;

    theme.addEventListener('click', function () {
        if (first_change == false) {
            first_change = true;
        }
        else {
            current_theme += 1;
        }

        if (current_theme > 3) {
            current_theme = 0;
        }

        if (current_theme == 0) {
            // change to dark theme
            root.style.setProperty('--background-color', 'black');
            root.style.setProperty('--color', 'white');
            theme.innerText = 'light mode';
        }
        if (current_theme == 1) {
            // change to light theme
            root.style.setProperty('--background-color', 'white');
            root.style.setProperty('--color', 'black');
            theme.innerText = 'paper mode';
        }
        if (current_theme == 2) {
            // change to paper
            root.style.setProperty('--background-color', '#ffe0b5');
            root.style.setProperty('--color', 'black');
            theme.innerText = 'night mode';
        }
        if (current_theme == 3) {
            // change to paper
            root.style.setProperty('--background-color', 'black');
            root.style.setProperty('--color', 'grey');
            theme.innerText = 'dark mode';
        }
    })


    const words = document.querySelector('#words');
    const headings = document.querySelector('#headings');
    const viewed = document.querySelector('#viewed');
    const session = document.querySelector('#time');
    const mean = document.querySelector('#avg');

    const article = document.querySelector('.markdown')


    // word couny
    const divText = article.textContent;
    const words_array = divText.split(' ');
    const wordCount = words_array.length;
    words.innerText = wordCount;

    // heading count

    const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingCount = headingElements.length;

    headings.innerText = headingCount;


    // get times page viewed
    viewed.innerText = localStorage.getItem('viewed')

    // session time
    let time = 0;
    function session_interval_action() {
        time += 1;
        session.innerText = time;
    }
    setInterval(session_interval_action, 1000);


    var pageLoadStartTime = performance.timing.navigationStart;

    // Get the current time
    var currentTime = Date.now();

    // Calculate the session page load time
    var sessionPageLoadTime = currentTime - pageLoadStartTime;

    mean.innerText = sessionPageLoadTime + 'ms';

    // get all links
    const sourceDiv = document.querySelector('.markdown');

    // Get all anchor elements within the source <div>
    const anchorElements = sourceDiv.querySelectorAll('a');

    // Create a new <div> to contain the cloned anchor elements
    const destinationDiv = document.getElementById('all_links');

    if ((anchorElements.length) == 0) {
        destinationDiv.innerText = "They are no outbound links in this document"
    }
    else {
        anchorElements.forEach((anchorElement) => {
            const clonedAnchor = anchorElement.cloneNode(true);
            destinationDiv.appendChild(clonedAnchor);
        });
    }

    // Clone and append each anchor element to the destination <div>

    function cloneImages() {
        var sourceDiv = document.querySelector('.markdown');
        var destinationDiv = document.querySelector('#all_images');

        var images = sourceDiv.querySelectorAll('img');

        images.forEach(function (image) {
            var clonedImage = image.cloneNode(true); // Clone the image element
            var anchorTag = document.createElement('a');



            destinationDiv.appendChild(clonedImage); // Append the cloned image to the destination div
        });
    }

    cloneImages();




}






