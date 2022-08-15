// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

// toggles glyph
const glyphHandler = (e) => {
  if (e.target.textContent === EMPTY_HEART) {
    e.target.classList.add('activated-heart');
    e.target.textContent = FULL_HEART;
  } else {
    e.target.textContent = EMPTY_HEART;
    e.target.classList.remove('activated-heart');
  }
}

let glyphs = document.querySelectorAll('.like-glyph')

glyphs.forEach(glyph => {

  glyph.addEventListener('click', function changeGlyph (e) {

    mimicServerCall(e.target)
    //optimistically changing the DOM.
    .then(glyphHandler(e))
    .catch((error) => {
      //correcting an optimistic change.
      glyphHandler(e)
      let modal = document.querySelector('.hidden');
      modal.textContent = error;
      modal.removeAttribute('class');
      setTimeout(function () {modal.classList.add('hidden')}, 3000);
    })


  })

});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
