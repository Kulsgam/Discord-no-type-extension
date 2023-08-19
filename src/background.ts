console.log("Discord typing block running.");
chrome.runtime.onInstalled.addListener(() => {
  console.log("Discord typing block installed.");
});

function enableExtension() {
  console.log("enable called");
  chrome.declarativeNetRequest.getDynamicRules(async (rules) => {
    if (rules.find((rule) => rule.id === 1)) {
      // This is needed because if not it fails ¯\_(ツ)_/¯
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
      });
    }
    await chrome.declarativeNetRequest.updateDynamicRules({
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
    await chrome.storage.local.set({ isEnabled : true });
  });
}

function disableExtension() {
  chrome.declarativeNetRequest.getDynamicRules(async (rules) => {
    if (!rules.find((rule) => rule.id === 1)) {
      // This is needed because if not it fails ¯\_(ツ)_/¯
      await chrome.declarativeNetRequest.updateDynamicRules({
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
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1],
    });
    await chrome.storage.local.set({ isEnabled : true });
  });
}

chrome.storage.local.get("isEnabled", (result) => {
  let enabled = true; // In case it's undefined or null, default to true
  if (result.isEnabled !== undefined && result.isEnabled !== null) {
    enabled = !!result.isEnabled;
  }

  if (enabled) enableExtension();
  else disableExtension();
});

chrome.runtime.onMessage.addListener(async (message, _, __) => {
  if (message.action === "enable") enableExtension();
  else if (message.action === "disable") disableExtension();
});
