"use strict";
chrome.storage.local.get("isEnabled", (result) => {
    if (result.isEnabled === undefined || result.isEnabled === null) {
        updateStatus("Enabled");
        return;
    }
    const status = result.isEnabled ? "Enabled" : "Disabled";
    updateStatus(status);
});
document.getElementById("_enable").addEventListener("click", () => {
    updateStatus("Enabled");
});
document.getElementById("_disable").addEventListener("click", () => {
    updateStatus("Disabled");
});
function updateStatus(status) {
    chrome.runtime.sendMessage({ action: status.toLowerCase().substring(0, status.length - 1) });
    document.getElementById("_status").textContent = status;
}
//# sourceMappingURL=popup.js.map