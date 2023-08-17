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
console.log('Discord typing block running.');
chrome.runtime.onInstalled.addListener(() => {
    console.log('Discord typing block installed.');
});
let isEnabled = false;
chrome.storage.local.get('isEnabled', (result) => __awaiter(void 0, void 0, void 0, function* () {
    if (result.isEnabled === undefined) {
        yield chrome.storage.local.set({ isEnabled: true });
        return;
    }
    isEnabled = !!result.isEnabled;
}));
chrome.runtime.onMessage.addListener((message, _, __) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.action === 'enable') {
        if (isEnabled)
            return;
        isEnabled = true;
        yield chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [
                {
                    id: 1,
                    priority: 1,
                    action: { type: chrome.declarativeNetRequest.RuleActionType.BLOCK },
                    condition: {
                        urlFilter: '*discord.com/api/*/channels/*/typing*',
                        initiatorDomains: ['discord.com'],
                    },
                },
            ],
        });
        yield chrome.storage.local.set({ isEnabled });
    }
    else if (message.action === 'disable') {
        if (!isEnabled)
            return;
        isEnabled = false;
        yield chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1],
        });
        yield chrome.storage.local.set({ isEnabled });
    }
}));
//# sourceMappingURL=background.js.map