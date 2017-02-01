$(document).ready(
      function () {
            var buttons = document.getElementsByClassName('purchase-click');
            Array.prototype.forEach.call(buttons, function (el, i) {
                  el.addEventListener('click', function (e) {
                        console.log('clicked me');
                  });
            });
      });

function processForm(e) {
      if (e.preventDefault) e.preventDefault();

      var xhr = new XMLHttpRequest();
      //    xhr.open("POST", "http://requestb.in/1616ru71?inspect");
      //     xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      //     var item = {
      //         email: 'foo'
      //     };
      // //     document.getElementById("submission_receieved").classList.remove("hidden");
      //     xhr.send(JSON.stringify(item));
      $('#myModal').modal('hide');
      return false;
}

function submitComment(e) {
      if (e.preventDefault) e.preventDefault();

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://requestb.in/1616ru71?inspect");
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      var item = {
            comment: document.getElementById('comment_form').value
      };
      xhr.send(JSON.stringify(item));
      xhr.send();
      document.getElementById('comment_form').classList.remove('hidden');
      return false;
}

var form = document.getElementById('comment_form');
if (form.attachEvent) {
      form.attachEvent("submit", submitComment);
} else {
      form.addEventListener("submit", submitComment);
}

