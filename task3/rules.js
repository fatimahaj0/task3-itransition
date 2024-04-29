const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const GameTable = require('./helpTable.js')
const HMACGenerator = require('./hmac.js')

class GameRules {
    constructor(moves) {
        this.moves = moves;
        this.numMoves = moves.length;
        this.table = new GameTable(moves);
        this.hmacGenerator = new HMACGenerator();
        this.pcMove = this.moves[Math.floor(Math.random() * this.numMoves)];
        const hmac = this.hmacGenerator.generateHMAC(this.pcMove);
        this.key = hmac.key;
        console.log(`HMAC: ${hmac.hmac}`)
    }

    getOutcome(userMove, pcMove) {
        const userIndex = this.moves.indexOf(userMove);
        const pcIndex = this.moves.indexOf(pcMove);
    
        if (userIndex === pcIndex) {
            return 'Draw';
        }
    
        const diff = (pcIndex - userIndex + this.numMoves) % this.numMoves;
        if (diff > 0 && diff <= Math.floor(this.numMoves / 2)) {
            return 'You lose!';
        } else {
            return 'You win!';
        }
    }

    start() {
        rl.question('Enter your move: ', (userMove) => {
            if (userMove === 'exit') {
                rl.close();
                return;
            }
            else if (!this.moves.includes(userMove) && userMove !== 'help') {
                console.log(`Invalid move. Please enter one of the following: ${this.moves.join(', ')}`);
                this.start();
                return;
            }
            else if (userMove == 'help')
            {
                console.log(this.table.build());
                this.start();
                return;
            }

            console.log(`Computer's move: ${this.pcMove}`);
            console.log(`${this.getOutcome(userMove, this.pcMove)}`);
            console.log('HMAC Key:', this.key);
            console.log('Link to check the HMAC: https://www.freeformatter.com/hmac-generator.html')

            rl.close();
        });
    }
}

module.exports = GameRules;