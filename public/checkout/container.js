var checkoutContainer = document.getElementById("my-checkout-container");
checkoutContainer.innerHTML = document
  .getElementById("KCO")
  .value.replace(/\\"/g, '"')
  .replace(/\\n/g, "");
var scriptsTags = checkoutContainer.getElementsByTagName("script");
for (var i = 0; i < scriptsTags.length; i++) {
  var parentNode = scriptsTags[i].parentNode;
  var newScriptTag = document.createElement("script");
  newScriptTag.type = "text/javascript";
  newScriptTag.text = scriptsTags[i].text;
  parentNode.removeChild(scriptsTags[i]);
  parentNode.appendChild(newScriptTag);
}
