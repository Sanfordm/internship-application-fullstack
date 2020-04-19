var variant_1_count = 0
var variant_2_count = 0
var index = -1

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
  return new HTMLRewriter()
    .on('title', new ElementHandler())
    .on('p#description', new ElementHandler())
    .on('a#url', new ElementHandler())
    .transform(new_response)
}

/**
 * Selects random choice between elements
 * @param {array} arr
 */
function randomChoice(arr){
  index = Math.round(Math.random())
  if(index == 0){
    variant_1_count++
  }else{
    variant_2_count++
  }
  return arr[index]
}

/**
 * Handles HTMLrewriter object definitions, manipulates specific tags.
 */
class ElementHandler {
  element(element) {
    // console.log(element.tagName)
    switch(element.tagName){
      case 'title':
        element.setInnerContent('Cloudflare Challenge')
        break;
      case 'p':
        var choiceCount
        if(index == 0){
          choiceCount = [1, variant_1_count]
        }else{
          choiceCount = [2, variant_2_count]
        }
        element.setInnerContent(`This is variant ${choiceCount[0]} which has appeared: ${choiceCount[1]} time(s).`)
        break;
      case 'a':
        element.setInnerContent("Visit my Linkedin Page!")
        .setAttribute('href', 'https://www.linkedin.com/in/matt-sanford-229649173/')
        break;
      default:
        //do nothing otherwise
        break;
    }
  }
}