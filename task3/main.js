const HMACGenerator = require("./hmac.js");
const GameRules = require("./rules.js");

const args = process.argv.slice(2);

// Check if the number of arguments is less than 3 or is not an odd number
if (args.length < 3 || args.length % 2 === 0) {
  console.error(
    "Error: Please provide an odd number of at least 3 non-repeating strings."
  );
  console.error("Example: node game.js Rock Paper Scissors");
  process.exit(1);
}

// Check for repeating strings in the arguments
if (new Set(args).size !== args.length) {
  console.error("Error: Please provide non-repeating strings.");
  process.exit(1);
}

const game = new GameRules(args);

console.log("Available moves:");
for (let i = 0; i < args.length; i++) {
  console.log(i + 1 + " - " + args[i]);
}
console.log("0 - exit\n? - help");

game.start();
