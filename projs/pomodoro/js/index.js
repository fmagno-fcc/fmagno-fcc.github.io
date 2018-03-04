$(document).ready(function () {

    var swap = {
        "play": "stop",
        "stop": "play",
    }

    var buttonStatus = "play"
    var timer = "Task" // task or break
    // var timerValue = 0
    var taskProgress = 0
    var breakProgress = 0
    var progress = 0
    var intervalID = null

    var minInit, secInit, min, sec = 0

    $("#playStop").on("click", function () {
        // Swap icons (play/stop)
        $("#playStop").addClass(`fa-${swap[buttonStatus]}-circle`).removeClass(`fa-${buttonStatus}-circle`)
        buttonStatus = swap[buttonStatus]

        // On play start countdown
        if (buttonStatus == "stop") { // means the play button has been pressed

            // Dim text input
            $("#timerTask").attr("disabled", "")
            $("#timerBreak").attr("disabled", "")

            // Set text input with minutes and start count down

            minInit = min = document.getElementById(`timer${timer}`).value.split(":")[0]
            sec = document.getElementById(`timer${timer}`).value.split(":")[1]
            sec ? true : sec = 0 // Set sec to 0 if undefined
            secInit = sec

            taskProgress = 0
            breakProgress = 0

            if (intervalID) {
                clearInterval(intervalID)
            }
            intervalID = setInterval(function () {
                [sec, min] = minusOneSec(sec, min)
                document.getElementById(`timer${timer}`).value = [min, sec].join(":")


                progress = (min * 60 + sec) * 100 / (minInit * 60 + secInit)
                progress ? true : progress = 0
                document.getElementById(`${timer.toLowerCase()}Progress`).style.width = progress + "%"


                if (min == 0 && sec == 0) {
                    if (timer == "Task") {
                        timer = "Break"
                    } else {
                        timer = "Task"
                        clearInterval(intervalID)
                    }

                    minInit = min = document.getElementById(`timer${timer}`).value.split(":")[0]
                    secInit = sec = document.getElementById(`timer${timer}`).value.split(":")[1]
                    sec ? true : sec = 0            // Set sec to 0 if undefined
                    secInit ? true : secInit = 0    // Set secInit to 0 if undefined
                }
            }, 1000)

        } else {
            // Task
            $("#timerTask").removeAttr("disabled")
            // Break
            $("#timerBreak").removeAttr("disabled")

            clearInterval(intervalID)
        }
    })
})

function minusOneSec(sec, min) {
    if (sec == 0) {
        sec = 59
        min--
    } else {
        sec--
    }

    return [sec, min]
}
