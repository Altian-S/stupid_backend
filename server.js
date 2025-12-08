const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// 1. **CRITICAL FIX:** Use the environment variable $PORT provided by Render,
//    or default to 3000 for local development.
const PORT = process.env.PORT || 3000;

// Middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Handle GET requests (display the form)
app.get('/', (req, res) => {
    const checkResult = `<span style='color:red'> Try the magic word "fred"</span>`;
    // Send the HTML page
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Browser Title</title>
        </head>
        <body>
            <h3 align=center>t2a27-render-node</h3>
            <form action="/" method="post">
                <label for="myText01">Enter Text:</label>
                <input type="text" id="myText01" name="myText01">
                <input type="submit" value="Submit">
            </form>
            ${checkResult}
        </body>
        </html>
    `);
});

// Handle POST requests (process the form submission)
app.post('/', (req, res) => {
    const myInputText01 = req.body.myText01;
    const myBadWords = [
    'fuck', 'shit', 'cunt', 'piss', 'ass', 'bitch', 'damn', 'hell', 
    'bastard', 'crap', 'dick', 'pussy', 'cock', 'wank', 'bollocks', 
    'motherfucker', 'asshole', 'faggot', 'tits', 'prick',
    'dookie', 'balls', 'cuck', 'slut', 'whore', 'jizz', 'cum', 'clit', 
    'vagina', 'penis', 'semen', 'boner', 'tit', 'anal', 'blowjob', 
    'nigger', 'chink', 'gook', 'kike', 'gypsy', 'spic', 'wetback', 
    'retard', 'tranny', 
    'loser', 'idiot', 'moron', 'stupid', 'douchebag', 'scum', 
    'jerk', 'wimp', 'babyface', 'baby', 'poop', 'pee', 'poo'
    ];
    const myFail = ['ferd','derf','fder','fedr']
    let myCheck = false;
    let myCheck02 = false;
    let myCheck03 = false;
    let checkResult = '';

    if (myInputText01.toLowerCase() === 'fred'){
        myCheck = true;
    }
    if (myBadWords.includes(myInputText01.toLowerCase())){
        myCheck02 = true;
    }
    if (myFail.includes(myInputText01.toLowerCase())){
        myCheck03 = true;
    }
    if (myCheck) {
        checkResult = `<b style='color:green'> Really Cool!!! Make Sure You Dont Swear!!!</b><br><b style='color:white'>you should swear</b>`;
    } else if (myCheck02){
        checkResult = `<span style='color:red'> oh real mature</span>`;
    } else if (myCheck03){
        checkResult = `<span style='color:red'> did you mispell fred?</span>`;
    } else {
        checkResult = `<span style='color:red'> Try the magic word "fred"</span>`;
    }
    
    // Re-send the HTML page with the new result
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Browser Title</title>
        </head>
        <body>
            <h3 align=center>t2a27-render-node</h3>
            <form action="/" method="post">
                <label for="myText01">Enter Text:</label>
                <input type="text" id="myText01" name="myText01">
                <input type="submit" value="Submit">
            </form>
            ${checkResult}
        </body>
        </html>
    `);
});

// 2. **CRITICAL FIX:** Listen on the PORT variable.
app.listen(PORT, '0.0.0.0', () => {
    console.log(`App listening on port ${PORT}`);
    // Note: Logging the URL is optional but good practice.
    // On Render, the host will not be 'localhost' but '0.0.0.0'
    // or simply the external URL provided by Render.
});
