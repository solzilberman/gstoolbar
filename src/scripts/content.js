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

const banner_style = document.createElement('style');
banner_style.textContent = `
  .copy-banner {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background-color: black;
    color: white;
    border-radius: 5px;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    z-index: 10000;
  }
  .copy-banner.show {
    opacity: 1;
  }
`;
document.head.appendChild(banner_style);

const banner = document.createElement('div');
banner.className = 'copy-banner';
banner.textContent = 'Copied!';
document.body.appendChild(banner);

function showBanner() {
  banner.classList.add('show');
  setTimeout(() => {
    banner.classList.remove('show');
  }, 3000);
}

document.querySelectorAll('a').forEach(function(a) {
    if (a.textContent === "Import into BibTeX"){
        a.textContent = "Copy BibTeX";
        a.addEventListener('click', async (e) => {
            e.preventDefault(); 
            const dataUrl = a.href; 
            try {
              const response = await fetch(dataUrl);
              const data = await response.text();
              await navigator.clipboard.writeText(data);
              console.log('Data copied to clipboard!');
              showBanner();
            } catch (error) {
              console.error('Failed to fetch data or copy to clipboard', error);
            }
          });
    }
});
