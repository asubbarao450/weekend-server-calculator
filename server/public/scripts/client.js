console.log('client.js is sourced!');
//$(document).ready(onReady);



//   document.addEventListener("DOMContentLoaded", () => {
//        getObj()
//    });

var arithmetic = null;

let handleSubmit = (event) => {
    event.preventDefault()
    //arithmetic = "+"
    
    if(event.target.innerText === '+'){

        arithmetic = "+"
    }

    else if(event.target.innerText === '-'){

        arithmetic = "-"
    }

    else if(event.target.innerText === '*'){

        arithmetic = "*"
    }

    else if(event.target.innerText === '/'){

        arithmetic = "/"
    }
   
    if(event.target.innerText === '='){

        equals()
    }

    if(event.target.innerText === 'C'){

        clear()
    }

}

// let sub = (event) => {
//     event.preventDefault()
//     // arithmetic = "-"
//     console.log("subtract")
// }

// let mult = (event) => {
//     event.preventDefault()
//     // arithmetic = "*"
//     console.log("multiply")

// }

// let divi = (event) => {
//     console.log("/")
//     event.preventDefault()
//     // arithmetic = "/"

// }
let equals = () => {

    let inputField1 = document.getElementById("numOne").value
    let inputField2 = document.getElementById("numTwo").value
    

    document.querySelector('form').reset()

    

    

    //server doesn't communicate with index.html. Only the client will 
    axios({
        method: 'POST',
        url: '/calculations',
        // ! Data will always be an object

        //confused if I need to link a file or where I reset/clear form

        //turnsdocument 
        data: {
            numOne: inputField1,
            numTwo: inputField2,
            operator: arithmetic,
            result: -1

        }
    })
        .then((response) => {

            //do I need a line of code to send response back to server??

            // ! If the POST suceeds will call getQuotes, which includes the use of our render function.
            //this getObj just defines the list after it is called
            getObj()
        })
        .catch((error) => {
            console.log("POST for /calculations didnt work...", error)
            alert("Oopsie, that didnt work.")
        })


    //arithmetic = null; 
    //send arithemtic to relavant function (addObj)
    //reset arithmetic 
    //clear form 
    //document.querySelector('form').reset()
}


let clear = () => {


   document.querySelector('form').reset()

   arithmetic = "c"

   //uses equal function which contains an axios function to send data 
   //containing arithmetic operator "c" back to server
   equals()

   arithmetic = "+";
    
}


let getObj = () => {
    console.log("getObj is working!")
    axios({
        method: 'GET', // HTTP method
        url: '/calculations'
    })
        .then((response) => { // Captures the response from server
            // Must be response.data
            let calcs = response.data
            

            // Render quotes to DOM
            renderObj(calcs)
        })
        .catch((error) => { // Manages errors
            console.log("GET for /calculations didnt work...", error)
            alert("Oopsie, that didnt work.")
        })
}

//no axios request here 
let renderObj = (calcHistory) => {

    
    let historyhtml = document.getElementById('resultHistory')



    // * Will clear list before rendering the individual quotes
    historyhtml.innerHTML = ""

    for (let i = 0; i < calcHistory.length; i++) {

        if (i != calcHistory.length - 1)
            historyhtml.innerHTML += `<li> ${calcHistory[i].numOne} ${calcHistory[i].operator} ${calcHistory[i].numTwo} = ${calcHistory[i].result}</li>`
        else if (i === calcHistory.length - 1) {
            historyhtml.innerHTML += `<li> Current Result: ${calcHistory[i].numOne} ${calcHistory[i].operator} ${calcHistory[i].numTwo} = ${calcHistory[i].result}</li>`
        }

    }
}

//post request will save new data to the server and recieve server server response
// let addObj = () => {

    

// }

