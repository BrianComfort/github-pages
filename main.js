async function getLinks(folderPath) {
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
            .filter(fileName => fileName.endsWith('.html')); // Filter by .md extension
        return markdownFiles.filter(fileName => fileName !== '../'); // Filter out parent directory link
    } catch (error) {
        console.error(error);
        return [];
    }
}


console.log(getLinks(folderPath = "/articles/"))

async function appendFiles() {
    const folderPath = '/articles/';
    const files = await getLinks(folderPath);

    console.log(files);

    const available_el = document.querySelector('#pages');

    files.forEach(fileName => {
        const outerDiv = document.createElement('div');
        outerDiv.classList.add('link-div');

        const fileLink = document.createElement('a');
        fileLink.href = `${folderPath}/${fileName.substring(fileName.lastIndexOf('/') + 1)}`;
        
        const displayFileName = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.lastIndexOf('.html')); // Remove .md extension

        fileLink.textContent = displayFileName.replace(/_/g, ' '); // Replace underscores with spaces
        fileLink.classList.add('article-link')
        outerDiv.appendChild(fileLink)
        available_el.appendChild(outerDiv); // Append the div to the available_el
    });
}


appendFiles();