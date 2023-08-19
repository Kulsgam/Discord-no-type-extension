"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("Discord typing block running.");
chrome.runtime.onInstalled.addListener(() => {
    console.log("Discord typing block installed.");
});
function enableExtension() {
    console.log("enable called");
    chrome.declarativeNetRequest.getDynamicRules((rules) => __awaiter(this, void 0, void 0, function* () {
        if (rules.find((rule) => rule.id === 1)) {
            // This is needed because if not it fails ¯\_(ツ)_/¯
            yield chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: [1],
            });
        }
        yield chrome.declarativeNetRequest.updateDynamicRules({
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
        });
        yield chrome.storage.local.set({ isEnabled: true });
    }));
}
function disableExtension() {
    chrome.declarativeNetRequest.getDynamicRules((rules) => __awaiter(this, void 0, void 0, function* () {
        if (!rules.find((rule) => rule.id === 1)) {
            // This is needed because if not it fails ¯\_(ツ)_/¯
            yield chrome.declarativeNetRequest.updateDynamicRules({
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
            });
        }
        yield chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1],
        });
        yield chrome.storage.local.set({ isEnabled: true });
    }));
}
chrome.storage.local.get("isEnabled", (result) => {
    let enabled = true; // In case it's undefined or null, default to true
    if (result.isEnabled !== undefined && result.isEnabled !== null) {
        enabled = !!result.isEnabled;
    }
    if (enabled)
        enableExtension();
    else
        disableExtension();
});
chrome.runtime.onMessage.addListener((message, _, __) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.action === "enable")
        enableExtension();
    else if (message.action === "disable")
        disableExtension();
}));
//# sourceMappingURL=background.js.map