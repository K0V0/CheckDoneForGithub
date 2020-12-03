function Popup() {
  this.FX = new PopupFunctions();
  this.STORE;
  this.enableButton = document.getElementById('enable');
  this.resetButton = document.getElementById('reset');
  this.init();
}

Popup.prototype = {
    constructor: Popup,

    init: function() {
        var toto = this;

        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {

            toto.STORE = new Store(null, tabs[0].url);

            toto.FX.changeButtons(toto.STORE.isActiveCurrentPage());

            toto.enableButton.addEventListener('click', function() {
                toto.STORE.getOrCreateCurrentPage();
                toto.STORE.switchCurrentPageActive();
                toto.STORE.commit(function() {
                   toto.FX.changeButtons(toto.STORE.isActiveCurrentPage());
                   toto.FX.sendBroadcast('reRenderPage');
                });
            }, false);

            toto.resetButton.addEventListener('click', function() { 
                toto.FX.sendBroadcast('resetCheckboxes');
            }, false);

        });
       
    }
}



document.addEventListener('DOMContentLoaded', function() {

    var P = new Popup(); 

}, false);