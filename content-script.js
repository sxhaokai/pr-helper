chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url : "from the extension");
        if (request.greeting == "generateReview") {

            var url = window.location.href;
            var title;
            var scripts = document.getElementsByTagName("script");
            for (i = 0; i < scripts.length; i++) {
                var s = scripts[i].innerText.trim();

                if (s.startsWith("require('bitbucket/internal/layout/pull-request/pull-request')")) {
                    console.log("find script:" + s);
                    var jsons = s.substring(s.indexOf("({") + 1, s.lastIndexOf("})") + 1).replaceAll("'", "\"").replace(",}", "}");
                    var json = JSON.parse(jsons);
                    var prJson = json["pullRequestJSON"];
                    title = prJson["title"];
                    // var reviewers = prJson["reviewers"];
                    // var atStrig = "";
                    // var map = new Map();
                    // for (i = 0; i < reviewers.length; i++) {
                    //     var name = reviewers[i]["user"]["name"];
                    //     console.log(name);
                    // }

                    break;
                }
            }
            var reMessage = url + " " + title + "，辛苦帮忙review代码\n";
            console.log(reMessage);
            // var input = document.createElement('input');
            // input.setAttribute('readonly', 'readonly');
            // input.setAttribute('value', reMessage);
            // document.body.appendChild(input);
            // input.select();
            // input.setSelectionRange(0, 9999);
            // document.execCommand('Copy');
            document.oncopy = function(event) {
                event.clipboardData.setData("Text", reMessage);
                event.preventDefault();
            };
            document.execCommand("copy", false, null);
            sendResponse({farewell: reMessage});
        }
    }
);
