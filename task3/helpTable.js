const AsciiTable = require('ascii-table');

class GameTable {
    constructor(moves) {
        this.moves = moves;
        this.numMoves = moves.length;
    }

    build() {
        const table = new AsciiTable('Game Rules');
        table.setHeading('PC/User', ...this.moves);
    
        for (let i = 0; i < this.numMoves; i++) {
            const outcomes = this.moves.map((move, j) => {
                if (i === j) {
                    return 'Draw';
                }
    
                const diff = (i - j + this.numMoves) % this.numMoves;
                if (diff > 0 && diff <= Math.floor(this.numMoves / 2)) {
                    return 'Lose';
                } else {
                    return 'Win';
                }
            });
    
            table.addRow(this.moves[i], ...outcomes);
        }
    
        return table.toString();
    }    
}
module.exports = GameTable;