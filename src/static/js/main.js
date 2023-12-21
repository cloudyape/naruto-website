
function loadTag(tagName) {
    document.addEventListener("DOMContentLoaded", function () {
        var tagNameTags = document.querySelectorAll(tagName);
        
        tagNameTags.forEach(function (tagNameTag, index) {
            var fileName = '../../../src/components/' + tagName + "/" + tagName + '.component.html'; // Adjust the filename as needed

            // Load content from the corresponding HTML file
            loadContent(fileName, function (response) {
                // Set the content inside the <tagName> tag
                tagNameTag.innerHTML = response;
                executeScriptsInElement(tagNameTag);
            });
        });

        function loadContent(url, callback) {
            // Add a unique query parameter to the URL to prevent caching
            const noCacheUrl = url + (url.includes('?') ? '&' : '?') + 'nocache=' + new Date().getTime();
        
            fetch(noCacheUrl, {
                cache: 'no-store'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error loading content from ${noCacheUrl}: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(callback)
            .catch(error => console.error('Error loading content:', error));
        }
        
        

        function executeScriptsInElement(element) {
            var scripts = element.getElementsByTagName('script');

            for (var i = 0; i < scripts.length; i++) {
                eval(scripts[i].innerHTML);
            }
        }
    });
}

function callApi(apiName, responseType) {
    return fetch(apiName)
        .then(response => {
            if (responseType === 'text') {
                return response.text();
            } else if (responseType === 'json') {
                return response.json();
            } else if (responseType === 'blob') {
                return response.blob();
            } else {
                // Handle other response types as needed
                throw new Error('Unsupported response type');
            }
        });
}

function updateHtml() {

    // Sample HTML content with variables
    var getFullHtml = returnHtml()

    // Regular expression to match the content inside ${{}}
    var regex = /\${(.*?)}/g;
    // Extract data from matched patterns
    var matches = getFullHtml.match(regex);

    if (matches) {
        // Loop through extracted variable names
        for (let i = 0; i < matches.length; i++) {
            // Extract the variable name from the match
            var variableName = matches[i].match(/\${(.*?)}/)[1];

            // Check if the variable with the same name is defined
            if (window.hasOwnProperty(variableName)) {
                // Print the value of the variable
                getFullHtml = getFullHtml.replace(matches[i], "<data class='" + /\${(.*?)}/.exec(matches[i])[1] + "'>" + window[variableName] + "</data>");
            } else {
                console.log(`Variable ${variableName} is not defined.`);
            }
        }
    }
    document.getElementsByTagName("html")[0].innerHTML = getFullHtml;
}

function updateVariable(variableName, variableValue) {
    // Sample HTML content with variables
    var getFullHtml = returnHtml();
    // Find the element with the specified class name
    var element = document.querySelectorAll('data.' + variableName);

    // Check if the element exists and has the expected class name
    element.forEach(element => {
        if (element && element.classList.contains(variableName)) {
            // Return the inner HTML of the element
            element.innerHTML = variableValue;
        } else {
            // Return a message indicating that the element was not found
            return 'Element with class "' + variableName + '" not found';
        }
    });
}

function returnHtml() {
    // Sample HTML content with variables
    var getFullHtml = document.getElementsByTagName("html")[0].innerHTML;
    return getFullHtml;
}

document.addEventListener("DOMContentLoaded", function () {
    updateHtml();
});                               
                                                              
                               