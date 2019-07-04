const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const argument = process.argv.slice(2);
console.log(argument[0]);
request(argument[0],(error, response, body ,) => {
  let writeFilePlease = (data) => {
    fs.writeFile(argument[1], data, (err) => {
      if (err) throw err;//means file path does not exist
      console.log(`The file has been downloaded to ${argument[0]}!`);
      rl.close();
    });
  };
  if (!error) {
    fs.access(argument[1], fs.F_OK, (err) => {
      if (err) {
        writeFilePlease(body);
      } else {
        rl.question('file exist do you want to overwrite? y/n  ', (answer) => {
          if (answer === 'y') {
            writeFilePlease(body, 1);
          } else {
            rl.close();
          }
        });
      }
    });
  } else {
    console.log('domain not found');
    rl.close();
  }
});

