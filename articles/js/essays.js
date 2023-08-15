async function getMarkdownFilesInFolder(folderPath) {
    try {
        const response = await fetch(folderPath);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const fileLinks = doc.querySelectorAll('a[href]');
        const markdownFiles = Array.from(fileLinks)
            .map(link => link.getAttribute('href'))
            .filter(fileName => fileName.endsWith('.md')); // Filter by .md extension
        return markdownFiles.filter(fileName => fileName !== '../'); // Filter out parent directory link
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function displayMarkdownFiles() {
    const folderPath = '/articles/essays';
    const files = await getMarkdownFilesInFolder(folderPath);

    console.log(files);

    const available_el = document.getElementById('available-articles');

    files.forEach(fileName => {
        const fileDiv = document.createElement('div'); // Create a new div for each file
        const fileLink = document.createElement('a');
        fileLink.href = `${folderPath}/${fileName.substring(fileName.lastIndexOf('/') + 1)}`;
        
        const displayFileName = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.lastIndexOf('.md')); // Remove .md extension

        fileLink.textContent = displayFileName.replace(/_/g, ' '); // Replace underscores with spaces
        fileDiv.classList.add('file-link')
        fileDiv.appendChild(fileLink); // Append the link to the div
        available_el.appendChild(fileDiv); // Append the div to the available_el
    });
}

displayMarkdownFiles();


// Assuming you have an element to display the content
const contentElement = document.getElementById("current-article");

// Fetch the MD file using the Fetch API
fetch("August_14_(2023).md")
  .then(response => response.text())
  .then(mdContent => {
    // Convert the Markdown content to HTML using a library (e.g., Showdown.js)
    const converter = new showdown.Converter();
    const htmlContent = converter.makeHtml(mdContent);
    
    // Set the HTML content to your element
    contentElement.innerHTML = htmlContent;
  })
  .catch(error => {
    console.error("Error fetching MD file:", error);
  });
