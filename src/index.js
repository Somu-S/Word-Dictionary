let SearchBtn = document.getElementById('search');
let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let result = document.getElementById('result')
let word = document.getElementById('Word');
let PrtofSp=document.getElementById('PartofSpeech');
let phonetic = document.getElementById('phonetic');
let DefDetail = document.getElementById('DefDetail');
let wordDet = document.querySelector('.word-det');
let mean = document.querySelector('.meaning');
let play = document.getElementById('play');

let audiosrc;
let SearchWord; //..Here, we declare SearchWord outside of the GetData function so that it can be accessed globally. In the GetData function, we set the value of SearchWord to the input value. Then, in the event listener for the play button, we can use the SearchWord variable to construct the URL for the audio file.

async function GetData() {
    try {
        SearchWord = document.getElementById('search-word').value;
        console.log(SearchWord)
        let response = await fetch(`${url}${SearchWord}`);
        let data = await response.json();
        console.log(data)

        word.innerHTML=`${data[0].word}`;
        phonetic.innerHTML=`${data[0].phonetic}`;

        //here we mappped part of speech and rendered in the html page
        let PrtArray=data[0].meanings.map((meaning) => {
            return meaning.partOfSpeech;
         });
         PrtofSp.innerHTML=PrtArray;

        //in the same way here we use flatmap and rendered all the available definitions from the api into html page
        let definitionsArr = data[0].meanings.flatMap(meaning => meaning.definitions.map(definition => definition.definition + '<br>'));
        DefDetail.innerHTML = definitionsArr.join('');

        audiosrc= new Audio (data[0].phonetics[0].audio);

        wordDet.style.display='block';
        mean.style.display='block';

    } catch (error) {
        console.log (error)
        result.innerHTML=`sorry we couldn't find the word you were looking for!`;
        result.style.color='white';
    }
}
SearchBtn.addEventListener('click', GetData);

//to play the words
play.addEventListener('click',()=>{
    audiosrc.play();
    console.log(audiosrc)
})

// An event listener that triggers and calls getdata function whenever user enters "Enter" key on keyboard
document.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
        GetData();
    }
})