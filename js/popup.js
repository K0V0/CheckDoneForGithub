
function Popup() {
  this.FX = new PopupFunctions();
  this.enableButton = document.getElementById('enable');
  this.resetButton = document.getElementById('reset');
  this.init();
}

Popup.prototype = {
    constructor: Popup,

    init: function() {
        var toto = this;

        toto.enableButton.addEventListener('click', function() { 

            chrome.tabs.getSelected(null, function(tab) {
                var url_hash = MD5(tab.url);
                var enabled = initPageData(url_hash);
                toto.FX.changeButtons(enabled);
            });

            toto.FX.sendBroadcast("reRenderPage");

        }, false);

        toto.resetButton.addEventListener('click', function() { 

            toto.FX.sendBroadcast("resetCheckboxes");

        }, false);
    }
}


var inits = initStorage();

document.addEventListener('DOMContentLoaded', function() {

    var P = new Popup(); 

}, false);