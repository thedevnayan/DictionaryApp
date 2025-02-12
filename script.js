document.getElementById("submit").addEventListener("click", function() {
    let word = document.getElementById("inputWord").value;
    if (!word) return;
    
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => displayWordData(data[0]))
        .catch(error => console.log("Error fetching data:", error));
});

function displayWordData(data) {
    let container = document.querySelector(".container");
    container.innerHTML = `
        <h2>Word: ${data.word}</h2>
        <hr>
        <h3>Phonetic: ${data.phonetic || "N/A"}</h3>
        <audio class="audio-player" controls>
            <source src="${data.phonetics[0]?.audio || ""}" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <hr>
        ${data.meanings.map(meaning => `
            <div class="part-of-speech">
                <h3>${meaning.partOfSpeech}</h3>
            </div>
            <div class="meanings">
                <h4>Definition</h4>
                <ul>
                    ${meaning.definitions.map(def => `<li>${def.definition}</li>`).join('')}
                </ul>
            </div>
        `).join('')}
        <div class="syno">
            <h4>Synonyms:</h4>
            <ul>
                ${data.meanings[0].synonyms.length > 0 ? data.meanings[0].synonyms.map(syno => `<li>${syno}</li>`).join('') : "<li>None</li>"}
            </ul>
        </div>
        <div class="anto">
            <h4>Antonyms:</h4>
            <ul>
                ${data.meanings[0].antonyms.length > 0 ? data.meanings[0].antonyms.map(anto => `<li>${anto}</li>`).join('') : "<li>None</li>"}
            </ul>
        </div>
        <div class="source-link">
            <a href="${data.sourceUrls[0]}" target="_blank">Source</a>
        </div>
    `;
}
