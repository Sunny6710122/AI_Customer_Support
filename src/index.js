const express = require('express');
const Groq = require("groq-sdk");
const hbs = require("hbs");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
port = 8000;

let objectArray = [];
let response1= "";

// objectArray.push({
//     user: "Hi",
//     AI: "Hi there! How's it going?"
// });

const groq = new Groq({ apiKey: "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" });

async function main(userinput) {
    const userQuestion = userinput; // Example user question
  
    const chatCompletion = await getGroqChatCompletion(userQuestion);
    const response = chatCompletion.choices[0]?.message?.content || "";
  
    if (isResponseRelatedToTopic(response)) {
      console.log(response);
      return response;
    } else {
      const defaultResponse = "I'm sorry, I can only answer questions about GitHub.";
      console.log(defaultResponse);
      return defaultResponse;
    }
  }
  
  function isResponseRelatedToTopic(response) {
    // Here you can implement additional logic to verify the response is related to GitHub.
    // For simplicity, we'll assume the model provides a response if it knows the answer related to GitHub.
    return response && response.toLowerCase().includes("github");
  }
  
  async function getGroqChatCompletion(userQuestion) {
    return groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert on GitHub. Only answer questions related to GitHub.",
        },
        {
          role: "user",
          content: userQuestion,
        },
      ],
      model: "llama3-8b-8192",
    });
  }
  

// main("How can I create repositary");





const templatePath = path.join(__dirname,"./Templates");

msgggg = "";
app.set("view engine","hbs");
app.set("views",templatePath);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',async (req,res)=>
{
    res.render("mainpage",{objectArray: JSON.stringify(objectArray)});
});





app.post('/prompt',async (req,res)=>
{
    let userinput1 = req.body.input;
    // console.log(req.body.input);
    let rep = await main(userinput1);
    console.log(rep);
    
    objectArray.push({
        user: userinput1,
        AI: rep
    });
    console.log("dsfgdgdfgfd");
    
    console.log(objectArray);
    console.log("dsfds");
    
    console.log(response1);
    
    
    res.render("mainpage",{objectArray: JSON.stringify(objectArray)});
});




app.post('/NewChat',async (req,res)=>
  {      
      res.render("mainpage",{objectArray: JSON.stringify([])});
  });



app.listen(port,'localhost',()=>{
    console.log(`Listening on port number : ${port}`);
});