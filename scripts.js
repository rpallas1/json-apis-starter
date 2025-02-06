function validateData(e) {
  //prevent default form submission
  e.preventDefault();

  // get the word that the user entered in the input, store in variable named word
  let word = document.getElementById("my-word").value;

  word = word.trim();

  if (word.length < 1 || parseInt(word)) {
    document.getElementById("user-word").innerHTML =
      "Please enter a word before clicking the button";
    resetDisplay();
  } else {
    // if the word is valid, let's make our call to the function that works with the API
    getWord(word);
  }
}

function getWord(word) {
  // places on the page used for output
  let outputSection = document.getElementById("output");
  let userWord = document.querySelector("#user-word span");
  let display = document.getElementById("display-word-info");

  // un-hide the output section
  outputSection.classList.remove("hidden");

  // clear the list of any previous output
  resetDisplay();

  // create ajax object
  const data = null;
  const xhr = new XMLHttpRequest();

  // set withCredentials property on ajax object to true (we will access with a key)
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      let wordInfo = JSON.parse(this.responseText);

      if (wordInfo.success === false || wordInfo.hasOwnProperty("query")) {
        userWord.innerHTML = `<strong>${word} is not a valid word</strong>`;

        resetDisplay();

        display.innerHTML = "<li>Please enter another word and try again</li>";
      } else if (!wordInfo.definitions) {
        userWord.innerHTML = `<strong>${word}</strong>`;
        display.innerHTML =
          "<li>This word does not include any definitions in the dictionary</li>";
      } else {
        userWord.innerHTML = `<strong>${word}</strong>`;

        resetDisplay();

        for (let { definition } of wordInfo.definitions) {
          display.innerHTML += `<li>${definition}</li>`;
        }
      }
    }
  });

  const endpoint = `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`;

  xhr.open("GET", endpoint);
  xhr.setRequestHeader(
    "x-rapidapi-key",
    "df89e32c09mshf69a2dfbaefc3ebp1de1c8jsnea0ff3d093d7",
  );
  xhr.setRequestHeader("x-rapidapi-host", "wordsapiv1.p.rapidapi.com");

  xhr.send(data);

  // ready state change event listener
  // when we get a response...
  // log the returned text to the console

  // parse the response into JSON

  // check to see if an error was returned from the call
  // display an error message to the user

  // clear the list to allow for an error message to be displayed

  // ask the user to enter a valid word
  // display.innerHTML = "<li>Please enter a new word and try again</li>";
  // this means we got our data back and can display it from the JSON
  // display the word entered on the page

  // clear the list to allow for new definitions to be displayed (use the helper function)

  // iterate through array of returned definitions and add to string for output
  // each definition is displayed in a list item

  // clear the user input to make room for another word
  resetInput();

  // start of endpoint to API

  // full path of endpoint to get a definition

  // open the connection with the ajax object

  // set the required headers on the object

  // send the request to the API
}

// this helper function clears out the input and output for the user word
function resetInput() {
  document.getElementById("my-word").value = "";
  document.getElementById("my-word").focus();
}

// this helper function clears out the list where we display definitions or errors
function resetDisplay() {
  document.getElementById("display-word-info").innerHTML = "";
  // document.getElementById("recursive").innerHTML = "";
}

//attach event handler to button in form
document.getElementById("get-defs").addEventListener("click", validateData);

/* Example of returned JSON data for the word "no"
    {
        "word":"no",
        "results":[
            {
                "definition":"a radioactive transuranic element synthesized by bombarding curium with carbon ions; 7 isotopes are known",
                "partOfSpeech":"noun",
                "synonyms":[
                    "atomic number 102",
                    "nobelium"
                ],
                "typeOf":[
                    "chemical element",
                    "element"
                ]
            },
            {
                "definition":"referring to the degree to which a certain quality is present",
                "partOfSpeech":"adverb",
                "synonyms":[
                    "no more"
                ],
                "examples":[
                    "he was no heavier than a child"
                ]
            },
            {
                "definition":"a negative",
                "partOfSpeech":"noun",
                "typeOf":[
                    "negative"
                ],
                "antonyms":[
                    "yes"
                ],
                "examples":[
                    "his no was loud and clear"
                ]
            },
            {
                "definition":"(quantifier) used with either mass nouns or plural count nouns for indicating a complete or almost complete lack or zero quantity of",
                "partOfSpeech":"adjective",
                "similarTo":[
                    "nary",
                    "none",
                    "zero"
                ],
                "antonyms":[
                    "all",
                    "some"
                ],
                "examples":[
                    "we have no bananas",
                    "no eggs left and no money to buy any",
                    "have you no decency?",
                    "did it with no help",
                    "I'll get you there in no time"
                ]
            }
        ],
        "pronunciation":{
            "all":"noʊ"
        },
        "frequency":6.78
    }
 */
