$(document).ready(function () {

    var cellID
    var p1 = document.getElementById("player1").innerHTML.slice(4)
    var p2 = document.getElementById("player2").innerHTML.slice(4)

    var cellR, cellC
    var winner = ""

    cells = [
        ["_", "_", "_"],
        ["_", "_", "_"],
        ["_", "_", "_"],
    ]

    color = {
        "player1": "#353594",
        "player2": "#7d3535"
    }

    // swap players
    $("#player1, #player2").on("click", function () {
        p1 = document.getElementById("player1").innerHTML.slice(4)
        p1 == "X" ? p1 = "O" : p1 = "X"
        document.getElementById("player1").innerHTML = `P1: ${p1}`

        p2 = document.getElementById("player2").innerHTML.slice(4)
        p2 == "X" ? p2 = "O" : p2 = "X"
        document.getElementById("player2").innerHTML = `P2: ${p2}`

        // Update colors
        for (let i = 0; i < cells[0].length; i++) {
            for (let j = 0; j < cells.length; j++) {
                if (cells[i][j] == p1) {
                    document.getElementById("" + i + j).style.color = color["player1"];
                }
                if (cells[i][j] == p2) {
                    document.getElementById("" + i + j).style.color = color["player2"];
                }
            }
        }
    })

    $(".cell").on("click", function () {
        // console.log("pressed")

        cellRC = $(this).attr("id").split("")
        cellR = cellRC[0]
        cellC = cellRC[1]

        if (cells[cellR][cellC] == "_") {
            cells[cellR][cellC] = p1
            document.getElementById(cellR + cellC).innerHTML = p1
            document.getElementById(cellR + cellC).style.color = color["player1"]

            // console.log("cells:", cells)
            winner = checkWin(cells)
            if (winner) {
                endGame("You win!")
            } else {

                aiNext = aiPlay(cells)
                cells[aiNext[0]][aiNext[1]] = p2

                document.getElementById("" + aiNext[0] + aiNext[1]).innerHTML = p2
                document.getElementById("" + aiNext[0] + aiNext[1]).style.color = color["player2"]

                winner = checkWin(cells)
                if (winner) {
                    endGame("You lose!")
                }
            }
        }
    })
})

function aiPlay(cells) {
    for (let i = 0; i < cells[0].length; i++) {
        for (let j = 0; j < cells.length; j++) {
            if (cells[i][j] == "_") {
                return [i, j]
            }
        }
    }
}

function checkWin(cells) {
    // console.log("checking winner")

    // Horizontal
    if (cells[0][0] == cells[0][1] && cells[0][0] == cells[0][2] && cells[0][0] != "_") {
        // console.log("horizontal 0")
        return cells[0][0]
    }
    if (cells[1][0] == cells[1][1] && cells[1][0] == cells[1][2] && cells[1][0] != "_") {
        // console.log("horizontal 1")
        return cells[1][0]
    }
    if (cells[2][0] == cells[2][1] && cells[2][0] == cells[2][2] && cells[2][0] != "_") {
        // console.log("horizontal 2")
        return cells[2][0]
    }

    // Vertical
    if (cells[0][0] == cells[1][0] && cells[0][0] == cells[2][0] && cells[0][0] != "_") {
        // console.log("vertical 0")
        return cells[0][0]
    }
    if (cells[0][1] == cells[1][1] && cells[0][1] == cells[2][1] && cells[0][1] != "_") {
        // console.log("vertical 1")
        return cells[0][1]
    }
    if (cells[0][2] == cells[1][2] && cells[0][2] == cells[2][2] && cells[0][2] != "_") {
        // console.log("vertical 2")
        return cells[0][2]
    }

    // Diagonal
    if (cells[0][0] == cells[1][1] && cells[0][0] == cells[2][2] && cells[0][0] != "_") {
        // console.log("diagonal \\")
        return cells[0][0]
    }
    if (cells[0][2] == cells[1][1] && cells[0][2] == cells[2][0] && cells[0][2] != "_") {
        // console.log("diagonal /")
        return cells[0][2]
    }
}

function endGame(msg) {

    let delay = 2000
    let delayID

    // console.log(msg)

    delayID = setInterval(function () {

        for (let i = 0; i < cells[0].length; i++) {
            for (let j = 0; j < cells.length; j++) {
                document.getElementById("" + i + j).innerHTML = "_"
                document.getElementById("" + i + j).style.color = "#FFF"
                cells[i][j] = "_"
            }
        }
        clearInterval(delayID)
    }, delay)

    $("#endGame").bPopup({
        opacity: 0.4,
        autoClose: delay,
    })

    $("h4").text(msg)
}
