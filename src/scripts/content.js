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


// async function getCitationCount(paper_id) {
//     var url = "https://scholar.google.com/scholar?q=info:" + paper_id + ":scholar.google.com/&output=cite&scirp=0&hl=en";
//     var response = await fetch(url);
//     var text = await response.text();
//     var parser = new DOMParser();
//     var doc = parser.parseFromString(text, "text/html");
//     var bibtex = doc.querySelector('a');
//     var href = bibtex.getAttribute("href");
//     // var response2 = await fetch(href);
// }

// document.querySelectorAll('a').forEach(function(a) {
//     if (a.textContent === "Cite"){
//         var parentDivA = a.parentElement.parentElement.parentElement.getAttribute("data-cid");
//         // console.log(parentDivA);
//         getCitationCount(parentDivA).then(function(result) {
//             console.log(result);
//         });
//     }
    
// });
