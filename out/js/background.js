"use strict";
console.log("Discord typing block running.");
chrome.runtime.onInstalled.addListener(() => {
    console.log("Discord typing block installed.");
});
function enableExtension() {
    console.log("enable called");
    chrome.storage.local.get("isEnabled", (result) => {
        if (result.isEnabled) {
            console.log("Extension is already enabled");
            return;
        }
        chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [
                {
                    id: 1,
                    priority: 1,
                    action: { type: chrome.declarativeNetRequest.RuleActionType.BLOCK },
                    condition: {
                        urlFilter: "*discord.com/api/*/channels/*/typing*",
                        initiatorDomains: ["discord.com"],
                    },
                },
            ],
        }, () => {
            if (chrome.runtime.lastError) {
                console.log("Enabling error");
            }
            else {
                console.log("Enabling success");
            }
        });
        chrome.storage.local.set({ isEnabled: true });
    });
}
function disableExtension() {
    console.log("disable called");
    chrome.storage.local.get("isEnabled", (result) => {
        if (!result.isEnabled) {
            console.log("Extension is already disabled");
            return;
        }
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1],
        }, () => {
            if (chrome.runtime.lastError) {
                console.log("Disabling error");
            }
            else {
                console.log("Disabling success");
            }
        });
        chrome.storage.local.set({ isEnabled: false });
    });
}
function printRules() {
    chrome.declarativeNetRequest.getDynamicRules((rules) => {
        console.log(rules);
    });
}
chrome.storage.local.get("isEnabled", (result) => {
    let enabled = true; // In case it's undefined or null, default to true
    if (result.isEnabled !== undefined && result.isEnabled !== null) {
        enabled = !!result.isEnabled;
    }
    chrome.storage.local.set({ isEnabled: enabled });
    if (enabled) {
        /* Initial enabling should account for already existing rule */
        /* removeRuleIds will always be called before addRules */
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1],
            addRules: [
                {
                    id: 1,
                    priority: 1,
                    action: { type: chrome.declarativeNetRequest.RuleActionType.BLOCK },
                    condition: {
                        urlFilter: "*discord.com/api/*/channels/*/typing*",
                        initiatorDomains: ["discord.com"],
                    },
                },
            ],
        }, () => {
            if (chrome.runtime.lastError) {
                console.log("Initial enabling failed");
            }
            else {
                console.log("Initial enabling success");
            }
        });
    }
    else {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1],
        }, () => {
            if (chrome.runtime.lastError) {
                console.log("Initial disabling failed");
            }
            else {
                console.log("Initial disabling success");
            }
        });
    }
});
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "enable")
        enableExtension();
    else if (message.action === "disable")
        disableExtension();
});
//# sourceMappingURL=background.js.map