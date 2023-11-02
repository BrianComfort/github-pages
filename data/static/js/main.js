const search = document.getElementById('search')
const query = document.getElementById('query')

function fetch_text(request) {
    const targetElement = document.getElementById("log"); // Replace with your target element's ID


    
    fetch("static/data/output.csv") // Change "output.csv" to your CSV file's path
        .then(response => response.text())
        .then(data => { 
            const rows = data.trim().split("\n");
            rows.forEach((row, index) => {
                const values = row.split(",");
                if (values.length >= 3) { // Check if there are enough columns
                    if (values[0] == request) {
                        const sentence = values[2].replaceAll('`', ','); // Use 2 index for the sentence
                    
                        console.log(`Row ${index + 1}:`, sentence); // Log the sentence for debugging
                        const sentenceElement = document.createElement("span"); // Use <p> element for paragraphs
                        sentenceElement.innerHTML = sentence;
                        targetElement.appendChild(sentenceElement);
                    }
                } else {
                    console.warn(`Row ${index + 1} does not have enough columns`);
                }
            });
        })
        .catch(error => {
            console.error("Error loading CSV:", error);
        });
}

search.addEventListener('click', function () {
    let request = query.value;

    fetch_text(request)
})

const divElement = document.getElementById('log'); // Replace 'yourDivId' with the actual ID of your <div> element
const progress = document.getElementById('progress')

divElement.addEventListener('scroll', function() {
    const scrolledPercentage = (divElement.scrollTop / (divElement.scrollHeight - divElement.clientHeight)) * 100;
    const roundedPercentage = scrolledPercentage.toFixed(2);
    progress.innerText = roundedPercentage
});


document.addEventListener("DOMContentLoaded", () => {
    fetch_text(request='the_great_gatsby')
});

