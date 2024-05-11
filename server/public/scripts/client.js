console.log('client.js is sourced!');


// document.addEventListener("DOMContentLoaded", () => {
//     getObj()
// });

var arithmetic = null;

let add = () => {

    arithmetic = "+"

}

let sub = () => {
    arithmetic = "-"

}

let mult = () => {
    arithmetic = "*"

}

let divi = () => {
    arithmetic = "/"

}
let equals = () => {


    //send arithemtic to relavant function (addObj)
    //reset arithmetic 
    //clear form 
    document.querySelector('form').reset()
}


let clear = () => {
    document.querySelector('form').reset()
    //might have to call renderObj
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
            console.log(calcs)

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

    console.log(calcHistory)
    let historyhtml = document.getElementById('resultHistory')



    // * Will clear list before rendering the individual quotes
    historyhtml.innerHTML = ""

    for (let i = 0; i < calcHistory.length; i++) {

        if (i != calcHistory.length - 1)
            history.innerHTML += `<li>${calcHistory[i]}, - ${calcHistory[i]}</li>`
        else if (i === calcHistory.length - 1) {
            history.innerHTML += `<li> Current Result: ${calcHistory[i]}, - ${calcHistory[i]}</li>`
        }

    }
}

//post request will save new data to the server and recieve server server response
let addObj = () => {

    let inputField1 = document.getElementById("numOne").value
    let inputField2 = document.getElementById("numTwo").value
    let inputField3 = document.getElementById("calculator").value

    document.querySelector('form').reset()

    // let newww = {

    // }

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
            operator: inputField3,

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


}

