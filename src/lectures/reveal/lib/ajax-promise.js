/**
 * CSE154 Ajax Promises
 *
 * A small javascript library with Promise objects useful for making ajax calls.
 *
 * Usage:
 *
 * (in html)
 * <script src="//courses.cs.washington.edu/courses/cse154/17sp/lib/ajax-promise.js" type="text/javascript"></script>
 */

/**
 * AjaxGetPromise:
 *
 * A simple Promise object that wraps the a standard Ajax call for a GET request.
 *
 * Usage:
 *
 * (in js)
 * var ajaxPromise = new AjaxGetPromise("path/to/your/url.ext");
 * ajaxPromise
 *    .then(function(response) { ...handle response... } )
 *    .catch(function(errorMessage) { ...handle error...} )
 *    ;
 *
 *
 * @param url
 * @returns {Promise}
 * @constructor
 */
AjaxGetPromise = function(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.status == 200) {       // 200 means request succeeded
                resolve(this.responseText);
            } else {                        // Other status codes usually mean something went wrong.
                reject("Status: " + this.status + ", " + this.statusText);
            }
        };

        // network error -- handle similar to non-200 response
        xhr.onerror = function (exception) {
            reject(exception);
        };

        // Open up the request, passing async = true...
        xhr.open("GET", url, true);

        // ....aaaand send it out the door.
        xhr.send();
    });
};

/**
 * AjaxPostPromise:
 *
 * A simple Promise object that wraps the a standard Ajax call for a POST request.
 *
 * Usage:
 *
 * (in js)
 * var postParams = { 'paramKey' : 'paramValue' };
 * var ajaxPromise = new AjaxPostPromise("path/to/your/url.ext", postParams);
 * ajaxPromise
 *    .then(function(response) { ...handle response... } )
 *    .catch(function(errorMessage) { ...handle error...} )
 *    ;
 *
 *
 * @param url
 * @returns {Promise}
 * @constructor
 */
AjaxPostPromise = function(url, data) {
    return new Promise(function(resolve, reject) {
        var formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.status == 200) {       // 200 means request succeeded
                resolve(this.responseText);
            } else {                        // Other status codes usually mean something went wrong.
                reject("Status: " + this.status + ", " + this.statusText);
            }
        };

        // network error -- handle similar to non-200 response
        xhr.onerror = function (exception) {
            reject(exception);
        };

        // Open up the request, passing async = true...
        xhr.open("POST", url, true);

        // ....aaaand send it out the door.
        xhr.send(formData);
    });
};
