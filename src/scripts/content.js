browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "sort") {

        var results = document.getElementsByClassName("gs_r gs_or gs_scl");

        function getCitationElement(element) {
            var container = element.querySelector(".gs_fl.gs_flb");
            if (container) {
                var links = container.getElementsByTagName("a");
                if (links.length >= 3) {
                    return links[2];
                }
            }
            return null;
        }
        
        function extractNumber(text) {
            const match = text.match(/\d+/);
            return match ? parseInt(match[0], 10) : 0;
        }
        
        function compareDivs(a, b) {
            var linkTextA = getCitationElement(a) ? getCitationElement(a).textContent : "";
            var linkTextB = getCitationElement(b) ? getCitationElement(b).textContent : "";
            
            var numberA = extractNumber(linkTextA);
            var numberB = extractNumber(linkTextB);
            
            return numberB - numberA; 
        }
        
        var sortedResults = Array.from(results).sort(compareDivs);
        
        var parentDiv = document.getElementById("gs_res_ccl_mid");
        for (let div of results) {
            parentDiv.removeChild(div);
        }
        
        sortedResults.forEach(function(div) {
            parentDiv.appendChild(div);
        });
    }
  });
