addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Responds with a random URL based on new request response.
 * @param {Request} request
 */
async function handleRequest(request) {
  var initial_response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants')
    .then(response => response.json())
    .then(data => data.variants)
    .catch(err => {
      console.log('something went wrong')
    })
  var new_response = await fetch(randomChoice(initial_response))
  return new HTMLRewriter().on('*', new ElementHandler()).transform(new_response)
}

/**
 * Selects random choice between elements
 * @param {array} arr
 */
function randomChoice(arr){
  var index = Math.round(Math.random())
  return arr[index]
}

class ElementHandler {
  element(element) { }

  comments(comment) { }

  text(text) { }
}