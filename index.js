const express = require('express')
const app = express()
const {PythonShell} =require('python-shell');

app.get("/", (req, res)=>{
     //Here are the option object in which arguments can be passed for the python_test.js.
     let options = {
          mode: 'text',
          pythonOptions: ['-u'], // get print results in real-time
          //scriptPath: 'calculate.py', //If you are having python_test.py script in same folder, then it's optional.
          args: [3,4] //An argument which can be accessed in the script using sys.argv[1]
     };
       
   
     PythonShell.run('calculate.py', options, function (err, result){
           if (err) throw err;
           // result is an array consisting of messages collected 
           //during execution of script.
           console.log('result: ', result.toString());
           res.send(result.toString())
     });
 });

let port = process.env.PORT || 3000

app.listen(port, () => { 
     console.log("App running...")
})