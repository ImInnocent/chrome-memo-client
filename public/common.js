const manifest = chrome.runtime.getManifest();
const version = manifest.version ? 'v' + manifest.version : '';

const versionDiv = document.getElementById("version");
const versionText = document.createTextNode(version);

versionDiv.appendChild(versionText);
