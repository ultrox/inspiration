// source : https://github.com/artem-solovev/gloc/blob/7.0.1/src/inject.js#L87
/**
 * Counts LOC - recursive func
 * @param {string} repo - /user/repo
 * @param {number} tries
 * @return {promise}
 */
function getGloc( repo, tries ) {
    if ( !repo ) return Promise.reject( new Error( 'No repositories !' ) );
    if ( tries === 0 ) return Promise.reject( new Error( 'Repo: ' + repo + '; Too many requests to API !' ) );

    const url = tokenizeUrl( setApiUrl( repo ) );

    return fetch( url )
        .then( (x) => x.json() )
        .then( (x) => x.reduce( ( total, changes ) => total + changes[1] + changes[2], 0) )
        .catch( (err) => getGloc( repo, tries - 1 ) );
}

/*
Generally I love this code-base, specially Artem way of commenting he do in PART1, PART2, and documented function signuture.
Very easy code to read and understond. 
*/

/**
 * Logger
 * @param {string} type - info, warn, err
 * @param {string} str - info for output
 */
const log = (type, str) => {
  switch (type) {
    case 'i': console.info(APP_NAME + ': ' + str) break
    case 'w': console.warn(APP_NAME + ': ' + str) break
    case 'e': console.error(APP_NAME + ': ' + str) break
    default: console.log(str)
  }
}


function appendLoc(repoName, element = '') {
  // call site
  getGloc(repoName, TRIES_DEFAULT)
    .then(lines => (element.innerHTML += getBadgeWithLines(lines)))
    .catch(e => log('e', e))
}
