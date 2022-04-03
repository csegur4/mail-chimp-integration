const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req, res){
    res.sendFile(__dirname + "/signup.html")

})

app.post("/", function (req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData =  JSON.stringify(data);
    url = "https://us14.api.mailchimp.com/3.0/lists/7465f20da0";
    options = {
        method: "POST",
        auth: "csegurav:a9c1c0d88f6ca0e5caa8c3ef68933495-us14"
    }
    const request = https.request(url, options, function(response){

        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    console.log(request);
    request.write(jsonData);
    request.end();

}) 

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on port 3000.")
})
