

//sets up event handler
function handleinput(){
    // to remove looks nice https://stackoverflow.com/a/51228632/13360412
    window.addEventListener("keydown", window.fn=function fn(event) {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
      //event.key
      //shitty fix but somewhat efficent
      
          settogrid(event)
        console.log(event.key)

        
        
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
      }, true);
}


//https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const alphabet = "abcdefghijklmnopqrstuvwxyz"
let rowCount = 0
let columnCount = 0
let word = "party" 
let rowNumber = 6
let score = 0
let columnNumber = word.length

function variousInitReloadSafe(){
    rowCount = 0
    columnCount = 0
    columnNumber = word.length
    window.removeEventListener("keydown", window.fn,true)

    document.getElementById("score").textContent = `Score: ${score}`
    // window.removeEventListener("keydown", ) //proper way to safely soft reload should probably check if event listener exists in handleinput()
    
}


// randomnumber 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

let keyboardlayout = ["qwertyuiop", "asdfghjkl>","zxcvbnm<"] // < enter/submit > delete

// generates keyboard
function generatekeyboard(listofrowchars){
    const kblocation = document.getElementById("keyboard")
    for (let index = 0; index < listofrowchars.length; index++) {
        let kbstring = listofrowchars[index]
        // let div = document.createElement("div")
        // div.className = ""
        // kblocation.appendChild(div)
        // div.appendChild(document.createElement("br"))
        for (let j = 0; j < kbstring.length; j++) {
            let letter = kbstring[j];
            // console.log(letter)
            let button = document.createElement("button")
            button.id = letter;
            button.className = "keyboardButton"
            switch (letter) {
                case "<":
                    button.setAttribute("onclick",`javascript: dispatchKeyEvent("Delete")`)
                    button.innerHTML = '<span style="vertical-align: middle" class="material-symbols-outlined">backspace</span>'
                    button.style.paddingtop = "0px"
                    button.style.position = "relative"
                    button.style.top = "-1.3px"

                    break;
                
                case ">":
                    button.innerHTML = '<span style="vertical-align: middle" class="material-symbols-outlined">keyboard_return</span>'

                    button.setAttribute("onclick",`javascript: dispatchKeyEvent("Enter")`)
                    button.style.paddingtop = "0px"
                    button.style.position = "relative"
                    button.style.top = "-1.3px"
                    break;
            
                default:
                    button.setAttribute("onclick",`javascript: dispatchKeyEvent("${letter}")`)
                    button.textContent = letter.toUpperCase()
                    
                
                    break;
            }
            // div.appendChild(button)
            kblocation.appendChild(button)
            
        }
        kblocation.appendChild(document.createElement("br"))

        
    }
}

function dispatchKeyEvent(keyvalue){
    window.dispatchEvent(new KeyboardEvent('keydown', {'key': keyvalue}))
}

function randomword(){
    word = wordlist[getRandomInt(0,wordlist.length)].toLowerCase()
    //do some


    console.log(word)
}

function validateword(){
    let runningtotal = ""
    for (let i = 0; i < columnNumber; i++){
        let box = document.getElementById(`box${rowCount}${i}`)
        let letter = box.textContent
        runningtotal += letter
        try {
            let kb = document.getElementById(`${letter}`)
            if (letter === word[i]){
                kb.style.backgroundColor = "darkgreen"
                box.style.backgroundColor = "darkgreen" //green
            } else if (word.includes(letter)) {
                kb.style.backgroundColor = "goldenrod"
    
                box.style.backgroundColor = "goldenrod" //yellow
            } else {
                kb.style.backgroundColor = "#FF0000"
    
                box.style.backgroundColor = "#FF0000" //red
            }
        } catch (error) {
            console.log(error)
        }

    }
    if (runningtotal === word){
        Score()
        console.log("win")
    }
}

// could use array?

function help(){
    helpstring = "This is NotWordle\nGuess the WORDLE in six tries.\nEach guess must be a five-letter word. Hit the enter button to submit.\nAfter each guess, the color of the tiles will change to show how close your guess was to the word."
    alert(helpstring)
}

function Score(){
    console.log(rowCount)
    console.log("stub")
    score += rowCount===6 ? 0 : 1000 - rowCount*100
    window.removeEventListener("keydown", window.fn,true)
    console.log(score)
}


// handle keyinput and adding and removing letters from the wordle grid
function settogrid(e){
    let df = false  
    // if letter
    if (alphabet.includes(e.key)){
        if (columnCount === columnNumber){
            columnCount--;
        }
        console.log(`box${rowCount}${columnCount}`)

        box = document.getElementById(`box${rowCount}${columnCount}`)
        // box.style.borderColor = "black"

        box.textContent = e.key
         
        columnCount++;

        if (rowCount === rowNumber){
            Score()
        }
    } else if (e.key === "Enter") {
        console.log(`box${rowCount}${columnCount}`)

        if (columnCount === columnNumber){
            
            validateword()
            columnCount = 0;
            rowCount++;


        } if (rowCount === rowNumber+1){
            Score()
            alert(`The word was ${word}, Hit next word to try again`)
        }

    } else if (e.key === "Delete" || e.key === "Backspace"){
        console.log(`box${rowCount}${columnCount}`)



        if (columnCount > 0){
            columnCount--;
            document.getElementById(`box${rowCount}${columnCount}`).textContent = "_"
            df = true
        }
    }
}


// generate wordle
function generategrid() {
    const section = document.querySelector("#table")
    const table  =  document.createElement("table")

    section.appendChild(table)

    for (let i = 0; i < rowNumber; i++) {
        var row = document.createElement("tr")
        table.appendChild(row)
        for (let j = 0; j < columnNumber; j++){

            let box = document.createElement("td")

            box.style.width = "60px"
            box.style.textAlign = "center"
            box.style.height = "60px"
            box.textContent = "_"
            box.style.font = "40px sans-serif"
            box.id = `box${i}${j}`
            row.appendChild(box)
        }
    }


}


// wordlist
let wordlist = ["Adult",
"Agent",
"Anger",
"Apple",
"Abuse",
"Award",
"Basis",
"Beach",
"Birth",
"Block",
"Blood",
"Board",
"Brain",
"Bread",
"Break",
"Brown",
"Buyer",
"Cause",
"Chain",
"Chair",
"Chest",
"Chief",
"Child",
"China",
"Claim",
"Class",
"Clock",
"Coach",
"Coast",
"Court",
"Cover",
"Cream",
"Crime",
"Cross",
"Crowd",
"Crown",
"Cycle",
"Dance",
"Death",
"Depth",
"Doubt",
"Draft",
"Drama",
"Dream",
"Dress",
"Drink",
"Drive",
"Earth",
"Enemy",
"Entry",
"Error",
"Event",
"Faith",
"Fault",
"Field",
"Fight",
"Final",
"Floor",
"Focus",
"Force",
"Frame",
"Frank",
"Front",
"Fruit",
"Glass",
"Grant",
"Grass",
"Green",
"Group",
"Guide",
"Heart",
"Horse",
"Hotel",
"House",
"Image",
"Index",
"Input",
"Issue",
"Japan",
"Jones",
"Judge",
"Knife",
"Layer",
"Level",
"Light",
"Limit",
"Lunch",
"Major",
"March",
"Match",
"Metal",
"Model",
"Money",
"Month",
"Motor",
"Mouth",
"Music",
"Night",
"Noise",
"North",
"Novel",
"Nurse",
"Offer",
"Order",
"Other",
"Owner",
"Panel",
"Paper",
"Party",
"Peace",
"Peter",
"Phase",
"Phone",
"Piece",
"Pilot",
"Pitch",
"Place",
"Plane",
"Plant",
"Plate",
"Point",
"Pound",
"Power",
"Press",
"Price",
"Pride",
"Prize",
"Proof",
"Queen",
"Radio",
"Range",
"Ratio",
"Reply",
"Right",
"River",
"Round",
"Route",
"Rugby",
"Scale",
"Scene",
"Scope",
"Score",
"Sense",
"Shape",
"Share",
"Sheep",
"Sheet",
"Shift",
"Shirt",
"Shock",
"Sight",
"Skill",
"Sleep",
"Smile",
"Smith",
"Smoke",
"Sound",
"South",
"Space",
"Speed",
"Spite",
"Sport",
"Squad",
"Staff",
"Stage",
"Start",
"State",
"Steam",
"Steel",
"Stock",
"Stone",
"Store",
"Study",
"Stuff",
"Style",
"Sugar",
"Table",
"Taste",
"Terry",
"Theme",
"Thing",
"Title",
"Total",
"Touch",
"Tower",
"Track",
"Trade",
"Train",
"Trend",
"Trial",
"Trust",
"Truth",
"Uncle",
"Union",
"Unity",
"Value",
"Video",
"Visit",
"Voice",
"Waste",
"Watch",
"Water",
"While",
"White",
"Whole",
"Woman",
"World",
"Youth",
"Memes"]
