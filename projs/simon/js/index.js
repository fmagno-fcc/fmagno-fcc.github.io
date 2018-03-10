$(document).ready(function () {

    /**
     *
     * Data
     *
     */

    var colors = {
        green: { on: "#27bd28", off: "#173417" },
        red: { on: "#e01515", off: "#3f1919" },
        yellow: { on: "#f9f93f", off: "#595916" },
        blue: { on: "#5454ff", off: "#18185c" },
    };

    var count = 0;
    var strict = "off";         // {on, off}
    var power = "off";          // {on, off}

    var lights = {
        green: "off",
        red: "off",
        yellow: "off",
        blue: "off",
    };
    var sequence = [];
    var currSelectedLight = null;
    var playback = false;
    var indexCompare;

    // Sound
    var sound = {
        green: new Howl({ src: ["/projs/simon/static/s1.mp3",] }),
        red: new Howl({ src: ["/projs/simon/static/s2.mp3",] }),
        yellow: new Howl({ src: ["/projs/simon/static/s3.mp3",] }),
        blue: new Howl({ src: ["/projs/simon/static/s4.mp3",] }),
        doh: new Howl({ src: ["/projs/simon/static/doh.wav",] }),
    };

    /**
     *
     * Functions
     *
     */
    function setLight(color, state, wrong) {
        // console.log(`Setting light ${color}: ${state}`)
        // if (lightPressEnabled) {
        lights[color] = state;
        $(`#${color}`).css("background-color", colors[color][state]);

        if (state == "on") {
            sound[color].play();
            // console.log("play!!!")
        } else {
            sound[color].stop();
        }
    }

    function setCount(val) {
        let numStr = val + "";
        numStr = numStr.padStart(2, "0");
        $("#count").text(numStr);
        count = numStr;
    }

    function setStrict(state) {
        let states = {
            on: "✓",
            off: "✗",
        };
        strict = state;
        $("#strict").text(`strict: ${states[state]}`);
    }

    function setPower(state) {
        power = state;
        if (state == "on") {
            $("#onOff").text("on!");
            // lightPressEnabled = true;
        } else {
            $("#onOff").text("off");
            reset();
            sequence = [];
            indexCompare = 0;
            // lightPressEnabled = false;
        }
    }

    function addRandomLight() {
        let colors = ["green", "red", "yellow", "blue"];
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);

        return randomColor;
    }

    function reset() {
        // lightPressEnabled = true;
        setLight("green", "off");
        setLight("red", "off");
        setLight("yellow", "off");
        setLight("blue", "off");
        // lightPressEnabled = false;

        setCount(0);
        // setStrict("off");
        // setPower("off");
        indexCompare = 0;
        playback = false;

    }

    function wait(ms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
    }

    function showPlayback() {
        // $("#log").text("");
        playback = true;                                // starting playback
        // console.log("sequence:", sequence);
        var i = 0;
        var seqInterval = setInterval(function () {
            if (power == "off") {                       // Interrupt if power off
                clearInterval(seqInterval);
                return;
            }
            // console.log("iter:", i);
            if (i > sequence.length - 1) {
                clearInterval(seqInterval);
                return;
            }
            setLight(sequence[i], "on");
            setTimeout(() => {
                setLight(sequence[i], "off");
                if (i == sequence.length - 1) {
                    playback = false;
                    indexCompare = 0;                   // playback is over
                }
                i++;
            }, 500);

        }, 1000);
    }

    function gameWin() {
        // console.log("Victory!!!!");
        $("#log").text("You win!");
        setTimeout(() => {
            // Show Modal with message "Victory!!"
            $("#log").text("");
            reset();
            sequence = [];
            addRandomLight();
            showPlayback();
        }, 2000);
    }

    function gameLose() {
        // console.log("You lose!");
        $("#log").text("You lose!");
        setTimeout(() => {
            // Show Modal with message "Defeat!"
            $("#log").text("");
            reset();
            sequence = [];
            addRandomLight();
            showPlayback();
        }, 2000);


    }


    // console.log("Initialising game");

    setStrict("off");
    setPower("off");
    reset();
    $("#log").text("");

    // sequence = ["red", "green", "blue"];


    /**
     *
     * Events
     *
     */

    $("#strict").on("click", function () {
        if (strict == "off") {
            // console.log("Strict on!");
            setStrict("on");
        } else {
            // console.log("Strict off!");
            setStrict("off");
        }
    });

    $("#onOff").on("click", function () {
        if (power == "off") {
            // console.log("Power on!");
            setPower("on");
        } else {
            // console.log("Power off!");
            setPower("off");
        }
    });

    $("#start").on("click", function () {
        // console.log("Start button pressed!");
        // Begin game
        if (power == "on" && !playback) {
            // reset();
            addRandomLight();
            showPlayback();
        }
    });

    $("#green,#red,#yellow,#blue").on("mousedown", function () {
        if (!playback) {

            if (sequence.length > 0) {
                currSelectedLight = $(this).attr("id");
                setLight(currSelectedLight, "on");
                sound[currSelectedLight].play();
            } else {
                return;
            }

            if (sequence[indexCompare] != currSelectedLight) {
                // console.log("sqe", sequence);
                sound["doh"].play();
                setTimeout(() => {
                    sound["doh"].stop();

                    if (strict == "on") {
                        reset();
                        sequence = [];
                        indexCompare = 0;
                        gameLose();
                        return;
                    }

                    showPlayback();
                }, 500);
            } else {
                indexCompare++;
                if (indexCompare > sequence.length - 1) {
                    count++;
                    setCount(count);
                    if (count == 20) {
                        gameWin();
                        return;
                    }
                    addRandomLight();
                    showPlayback();
                }
            }
        }
    });

    $(document).on("mouseup", function () {
        if (currSelectedLight) {
            setLight(currSelectedLight, "off");
            currSelectedLight = false;
        }
    });


});
