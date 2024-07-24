// Automatic Slideshow - change image every 4 seconds
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}
  x[myIndex-1].style.display = "block";
  setTimeout(carousel, 4000);
}

// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('itemsModal');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Web3Forms
const form = document.getElementById('contact-form');
const result = document.getElementById('result');
const variableBtn = document.getElementById('variable-btn');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  variableBtn.style.width="71px";
  setTimeout(() => {
    result.innerHTML = "Please wait..."
  }, 300);

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.style.color = "green";
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.style.color = "red";
      }
    })
    .catch(error => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
      result.style.color = "red";
    })
    .then(function() {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
        variableBtn.style.width="100%";
      }, 3000);
    });
});
