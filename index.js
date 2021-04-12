const express = require('express')
const app = express()
const {PythonShell} =require('python-shell');
app.use(express.static( "assets" ))
app.set('view engine','ejs')
app.get("/", (req, res) =>{
     res.render('index')
})

app.get("/get-solution/:state", (req,res) =>{ 
     let state = req.params.state
     let options = {
          mode: 'text',
          pythonOptions: ['-u'], // get print results in real-time
          //scriptPath: 'calculate.py', //If you are having python_test.py script in same folder, then it's optional.
          args: [state, 'findSolution'] //An argument which can be accessed in the script using sys.argv[1]
     };
       
   
     PythonShell.run('main.py', options, function (err, result){
          if (err) throw err;
          // result is an array consisting of messages collected 
          //during execution of script.
          console.log(state, '=>', result.toString());
          res.end(result.toString())
     });
})
app.get("/is-completed/:state", (req, res)=>{
     
     let state = req.params.state
     //Here are the option object in which arguments can be passed for the python_test.js.
     let options = {
          mode: 'text',
          pythonOptions: ['-u'], // get print results in real-time
          //scriptPath: 'calculate.py', //If you are having python_test.py script in same folder, then it's optional.
          args: [state, 'isCompleted'] //An argument which can be accessed in the script using sys.argv[1]
     };
       
   
     PythonShell.run('main.py', options, function (err, result){
          if (err) throw err;
          // result is an array consisting of messages collected 
          //during execution of script.
          console.log(state, '=>', result.toString());
          res.end(result.toString())
     });
});

app.get("/is-safe/:state", (req, res)=>{
     
     let state = req.params.state
     //Here are the option object in which arguments can be passed for the python_test.js.
     let options = {
          mode: 'text',
          pythonOptions: ['-u'], // get print results in real-time
          //scriptPath: 'calculate.py', //If you are having python_test.py script in same folder, then it's optional.
          args: [state, 'isSafe'] //An argument which can be accessed in the script using sys.argv[1]
     };
       
   
     PythonShell.run('main.py', options, function (err, result){
          if (err) throw err;
          // result is an array consisting of messages collected 
          //during execution of script.
          console.log(state, '=>', result.toString());
          res.end(result.toString())
     });
});

let port = process.env.PORT || 3000

app.listen(port, () => { 
     console.log("App running...")
})