/**
 * printpdfbtn.js script for printing presentations to PDF.
 *
 * @author Kiet Sam (for CSE 154, Spring 2018)
 * Updated by Lauren Bricker 9/28/18 - moved style into 154-override.css
 */
if(!document.getElementById( "printpdfbtn" )) {
   let url = document.URL;
   if (!url.endsWith("?print-pdf#/")) {
       // Only add the button in the Slide version.
       let printPdfBtnDiv = document.createElement("div");
       printPdfBtnDiv.id = "printpdfbtn";


       let printPdfBtn = document.createElement("button");
       printPdfBtn.class = "reveal";
       printPdfBtn.onclick = function () {
         let newUrl;
         let strippedUrl = url.substring(0, url.lastIndexOf('#'));
         window.location.href = strippedUrl + '?print-pdf';
       };
       printPdfBtn.innerHTML = "Switch to PDF";

       printPdfBtnDiv.appendChild(printPdfBtn);
       let bodyDiv = document.querySelector("body > div");
       bodyDiv.appendChild(printPdfBtnDiv);
   }
}
