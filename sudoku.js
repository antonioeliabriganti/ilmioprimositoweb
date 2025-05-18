class Sudoku {
    constructor() {
        this.board = Array(9).fill().map(() => Array(9).fill(0));
        this.solution = Array(9).fill().map(() => Array(9).fill(0));
        this.selectedCell = null;
        this.timer = null;
        this.seconds = 0;
        this.initializeGame();
    }

    initializeGame() {
        this.createBoard();
        this.createUI();
        this.addEventListeners();
        this.startTimer();
    }

    createBoard() {
        // Genera una soluzione valida
        this.generateSolution();
        
        // Copia la soluzione
        this.solution = this.board.map(row => [...row]);
        
        // Rimuovi alcuni numeri in base alla difficoltà
        const difficulty = document.getElementById('difficulty').value;
        const numbersToRemove = {
            'easy': 30,
            'medium': 40,
            'hard': 50
        }[difficulty];

        this.removeNumbers(numbersToRemove);
    }

    generateSolution() {
        // Riempi la diagonale principale con numeri validi
        for (let i = 0; i < 9; i += 3) {
            this.fillBox(i, i);
        }
        
        // Risolvi il resto del puzzle
        this.solveSudoku();
    }

    fillBox(row, col) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const randomIndex = Math.floor(Math.random() * numbers.length);
                this.board[row + i][col + j] = numbers[randomIndex];
                numbers.splice(randomIndex, 1);
            }
        }
    }

    solveSudoku() {
        const emptyCell = this.findEmptyCell();
        if (!emptyCell) return true;

        const [row, col] = emptyCell;
        for (let num = 1; num <= 9; num++) {
            if (this.isValid(row, col, num)) {
                this.board[row][col] = num;
                if (this.solveSudoku()) return true;
                this.board[row][col] = 0;
            }
        }
        return false;
    }

    findEmptyCell() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j] === 0) return [i, j];
            }
        }
        return null;
    }

    isValid(row, col, num) {
        // Controlla riga
        for (let j = 0; j < 9; j++) {
            if (this.board[row][j] === num) return false;
        }

        // Controlla colonna
        for (let i = 0; i < 9; i++) {
            if (this.board[i][col] === num) return false;
        }

        // Controlla box 3x3
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[boxRow + i][boxCol + j] === num) return false;
            }
        }

        return true;
    }

    removeNumbers(count) {
        let removed = 0;
        while (removed < count) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (this.board[row][col] !== 0) {
                this.board[row][col] = 0;
                removed++;
            }
        }
    }

    createUI() {
        const board = document.getElementById('sudokuBoard');
        board.innerHTML = '';

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('input');
                cell.type = 'text';
                cell.className = 'cell';
                cell.maxLength = 1;
                cell.dataset.row = i;
                cell.dataset.col = j;

                if (this.board[i][j] !== 0) {
                    cell.value = this.board[i][j];
                    cell.classList.add('fixed');
                    cell.readOnly = true;
                }

                board.appendChild(cell);
            }
        }
    }

    addEventListeners() {
        // Event listeners per le celle
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', () => this.selectCell(cell));
            cell.addEventListener('input', (e) => this.handleInput(e, cell));
        });

        // Event listeners per i pulsanti dei numeri
        const numberButtons = document.querySelectorAll('.number-btn');
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (this.selectedCell && !this.selectedCell.readOnly) {
                    const number = button.dataset.number;
                    this.selectedCell.value = number === '0' ? '' : number;
                    this.checkWin();
                }
            });
        });

        // Event listener per nuova partita
        document.getElementById('newGame').addEventListener('click', () => {
            this.board = Array(9).fill().map(() => Array(9).fill(0));
            this.createBoard();
            this.createUI();
            this.seconds = 0;
            this.updateTimer();
        });

        // Event listener per il pulsante risolvi
        document.getElementById('solve').addEventListener('click', () => {
            this.board = this.solution.map(row => [...row]);
            this.createUI();
            this.checkWin();
        });
    }

    selectCell(cell) {
        if (this.selectedCell) {
            this.selectedCell.classList.remove('selected');
        }
        this.selectedCell = cell;
        cell.classList.add('selected');
    }

    handleInput(e, cell) {
        const value = e.target.value;
        if (value && (value < '1' || value > '9')) {
            cell.value = '';
            return;
        }

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        this.board[row][col] = value ? parseInt(value) : 0;

        // Controlla se il numero è corretto
        if (value) {
            const isCorrect = this.solution[row][col] === parseInt(value);
            cell.classList.toggle('error', !isCorrect);
        } else {
            cell.classList.remove('error');
        }

        this.checkWin();
    }

    checkWin() {
        const isComplete = this.board.every((row, i) =>
            row.every((cell, j) => cell === this.solution[i][j])
        );

        if (isComplete) {
            clearInterval(this.timer);
            document.getElementById('status').textContent = 'Hai vinto! 🎉';
        }
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.seconds++;
            this.updateTimer();
        }, 1000);
    }

    updateTimer() {
        const minutes = Math.floor(this.seconds / 60);
        const remainingSeconds = this.seconds % 60;
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Inizializza il gioco quando la pagina è caricata
document.addEventListener('DOMContentLoaded', () => {
    new Sudoku();
}); 