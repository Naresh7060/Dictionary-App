const form =document.querySelector('form');
const resultDiv =document.querySelector('.result');
const footerYears = document.querySelector('.footerYears');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async(word)=>{
    try {
        resultDiv.innerHTML  = "Fatching Data..."
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    let definitions = data[0].meanings[0].definitions[0];
        resultDiv.innerHTML = `
        <p class="inputWord"><strong>Word:</strong> ${data[0].word}</p>
       
        <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
         <p><strong>Meaning: </strong>${definitions.definition === undefined ? "NOt Found" : definitions.definition}</p>
         <p><strong>Example: </strong>${definitions.example === undefined ? "Not Found" : definitions.example}</p>
        <p><strong>Antonyms:</strong></p>
        `;

        if(definitions.antonyms.length === 0){
            resultDiv.innerHTML += `<span>Not Found</span>`;
        }else{
            for(let i=0; i<definitions.antonyms.length; i++){
                resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
            }
        }

        resultDiv.innerHTML +=`<p><strong>Synonyms:</strong></p>`;
        if(definitions.synonyms.length === 0){
            resultDiv.innerHTML += `<span>Not Found</span>`;
        }else{
            for(let i=0; i<definitions.synonyms.length; i++){
                resultDiv.innerHTML += `<li>${definitions.synonyms[i]}</li>`;
            }
        }


       resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;

       resultDiv.innerHTML += `<div><audio controls><source src="${data[0].phonetics[0].audio}" type="audio/mpeg"></audio></div>`

    } catch (error) {
        resultDiv.innerHTML = `<p class="sorry">Sorry! the word not exist</p>`
    }
}


// footer dates dynamic 
const d = new Date();
let day = d.getFullYear();

footerYears.innerHTML = day-1+"-"+day;