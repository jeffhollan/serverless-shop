$(document).ready(
      function () {
            var buttons = document.getElementsByClassName('purchase-click');
            Array.prototype.forEach.call(buttons, function (el, i) {
                  el.addEventListener('click', function (e) {
                   //     submitForm();
                  });
            });

            var quickComments = document.getElementsByClassName('quick_comment');
            Array.prototype.forEach.call(quickComments, function (el, i) {
                  el.addEventListener('click', function (e) {
                        // console.log(document.getElementById(e.srcElement.id).innerHTML);
                        callLogic(document.getElementById(e.srcElement.id).innerHTML);
                  });
            });
      });

function submitForm(e) {
      console.log('here');
      if (e.preventDefault) e.preventDefault();
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://prod-14.australiaeast.logic.azure.com:443/workflows/fa3fbdb439244d2984b43c4644caa5be/triggers/manual/run?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qmQK3YzFY34wIkBIubh4oYNMkn0-gBHDqlZxXHDMAGs");
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      var item = {
            Name: document.getElementById('name').value,
            Email: document.getElementById('email').value,
            Address: "QLD",
            Price: 99.99,
            CreditCard: "123"
      };
       xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                        var response = JSON.parse(xhr.responseText);
                        document.getElementById('loading').classList.add('hidden');
                  }
                  else {
                        document.getElementById('loading').classList.add('hidden');
                  }
            }
      };
       xhr.send(JSON.stringify(item));
       document.getElementById('loading').classList.remove('hidden');
       $('#myModal').modal('hide');
       return false;
}

function callLogic(text) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://prod-28.australiaeast.logic.azure.com:443/workflows/bd315190415646088932f99c120dbdc6/triggers/manual/run?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5usDzJmGBjCa1VnBYBK3yGdkdGV1Q4SCDgIhqrLHXuE");
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      var item = {
            comment: text
      };
      xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                        var response = JSON.parse(xhr.responseText);
                        console.log(xhr.responseText);
                        document.getElementById('score').innerHTML = response.score;
                        document.getElementById('keyPhrases').innerHTML = response.phrases;
                        document.getElementById('results').classList.remove('hidden');
                        document.getElementById('loading').classList.add('hidden');
                  }
                  else {
                        document.getElementById('loading').classList.add('hidden');
                  }
            }
      };
      xhr.send(JSON.stringify(item));
      document.getElementById('loading').classList.remove('hidden');
}

function submitComment(e) {
      if (e.preventDefault) e.preventDefault();

      callLogic(document.getElementById('comment').value);

      return false;
}

var form = document.getElementById('comment_form');
if (form != null && form.attachEvent) {
      form.attachEvent("submit", submitComment);
} else if (form != null){
      form.addEventListener("submit", submitComment);
}

var form = document.getElementById('order_form');
if (form.attachEvent) {
      form.attachEvent("submit", submitForm);
} else {
      form.addEventListener("submit", submitForm);
}

