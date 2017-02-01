$(document).ready(
      function () {
            var buttons = document.getElementsByClassName('purchase-click');
            Array.prototype.forEach.call(buttons, function (el, i) {
                  el.addEventListener('click', function (e) {
                        console.log('clicked me');
                  });
            });
      });