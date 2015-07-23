// Controlla id posizioni oas con la lista di posizioni oas "poslist" delle pagine nel file urls.json
var fs = require("fs");
var system = require('system');
var jsonStr = fs.read('urls.json');
var urls = JSON.parse(jsonStr);
var listOfUrls = Object.keys(urls);

var checkoas = function(url) {

    if (!url) {
        phantom.exit();
    }

    var page = require('webpage').create();

    // Setta User Agent
    UA = system.args[1];
    if (UA == 'iPhone') {
        page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53';
    }
    if (UA == 'iPad') {
        page.settings.userAgent = 'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53';
    }

    page.onConsoleMessage = function(msg) {
        console.log(msg);
    };


    page.onError = function(msg, trace) {};

    page.open(url, function() {
       console.log('_____________________________________________________________ \n ');
       console.log('URL: ', url);
        page.evaluate(function() {
           console.log('Lista posizioni OAS: ', poslist);
            var poslist_array = poslist.split(',');

            for (i = 0; i < poslist_array.length; i++) {
                var id = document.getElementById(poslist_array[i]);
                
                //dots
                var dots;
                var add = 20-poslist_array[i].length;
                var dots = '';
                for (var x = 0 ; x < add; x++) {
                    dots +='.';
                }

                if (id) {
                    id = poslist_array[i] +' '+dots+ ' OK';
                } else {
                    id = poslist_array[i] +' '+dots+ ' KO - Warning';
                } 
                console.log(id);
            };
        });

        setTimeout(function(p) {
            return function() {
                p.close();
            };
        }(page), 0);

        setTimeout(function() {
            checkoas(listOfUrls.pop());
        }, 0);

    });




}



checkoas(listOfUrls.pop());
