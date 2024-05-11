const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = [
  {
    numOne: 2,
    numTwo: 5,
    operator: "*",
    result: 10
  }
]


// Here's a wonderful place to make some routes:

// GET /calculations

app.get('/', (req, res) => {


  //sends the index.html file
  res.sendFile(__dirname + "/public/" + "index.html");


}
)

app.get('/calculations', (req, res) => {


  //get sends a file through respond function 
  res.send(calculations)


})


// POST /calculations

app.post('/calculations', (req, res) => {

  //since this is post we have to update stuff in the server

  let calc = req.body


  if (calc.operator === "+") {
    calc.result = Number(calc.numOne) + Number(calc.numTwo)
    calculations.push(calc)

  }

  else if (calc.operator === "-") {
    calc.result = Number(calc.numOne) - Number(calc.numTwo)
    calculations.push(calc)

  }

  else if (calc.operator === "*") {
    calc.result = Number(calc.numOne) * Number(calc.numTwo)
    calculations.push(calc)

  }

  else if (calc.operator === "/") {
    calc.result = Number(calc.numOne) / Number(calc.numTwo)
    calculations.push(calc)

  }


  else if (calc.operator === "c") {

    calculations = [{
      numOne: 2,
      numTwo: 5,
      operator: "*",
      result: 10,
    }];

  }



  res.sendStatus(201)
  //all is well 

}
)


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
