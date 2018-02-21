var twitchStreamers = [
    "dreamhackcs",
    "skyzhar",
    "freecodecamp",
    "faceittv",
    "comster404",
    "brunofin",
    "terakilobyte",
    "robotcaleb",
    "sheevergaming",
    "esl_sc2",
    "ogamingsc2",
    "jacksofamerica",
    "cretetion",
    "storbeck",
    "habathcx",
    "noobs2ninjas",
];


$(document).ready(() => {

    twitchStreamers.forEach((elem) => {

        var url = "https://wind-bow.glitch.me/twitch-api/streams/" + elem + "?callback=?";
        $.getJSON(url, (data) => {
            var status = "OFFLINE";
            var username = elem;
            var id = "";

            if (data.stream != null) {
                status = data.stream.channel.status;
                id = data.stream._id
            }

            // Append username to the list of results
            $("thead").append(`
            <tr>
                <td>` + id + `</td>
                <td> <a href="https://www.twitch.tv/` + username + `">` + username + `</a> </td>
                <td>` + status + `</td>
            </tr>
        `);
        });
    });
});
