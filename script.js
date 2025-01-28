var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // <div id = "0-0></div>"
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    setNumber();
    setNumber();
}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");

    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

function filterZeroes(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    row = filterZeroes(row);

    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    row = filterZeroes(row);

    while (row.length < columns) {
        row.push(0);
    }

    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r].reverse();
        row = slide(row);
        board[r] = row.reverse();

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        board[0][c] = row[0];
        board[1][c] = row[1];
        board[2][c] = row[2];
        board[3][c] = row[3];

        for (let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]].reverse();
        row = slide(row);
        board[0][c] = row[3];
        board[1][c] = row[2];
        board[2][c] = row[1];
        board[3][c] = row[0];

        for (let r = 0; r < rows; r++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setNumber() {
    let space = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
    let index = Math.floor(Math.random() * space.length);
    let choice = space[index];

    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows)
        let c = Math.floor(Math.random() * columns)

        if (board[r][c] == 0) {
            board[r][c] = choice;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = choice.toString();
            tile.classList.add("x" + choice.toString());
            found = true
        }
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setNumber();
    } else if (e.code == "ArrowRight") {
        slideRight();
        setNumber();
    } else if (e.code == "ArrowUp") {
        slideUp();
        setNumber();
    } else if (e.code == "ArrowDown") {
        slideDown();
        setNumber();
    }
})