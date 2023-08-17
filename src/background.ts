console.log('Discord typing block running.');
chrome.runtime.onInstalled.addListener(() => {
  console.log('Discord typing block installed.');
});

let isEnabled = false;

chrome.storage.local.get('isEnabled', async (result) => {
  if (result.isEnabled === undefined) {
    await chrome.storage.local.set({ isEnabled: true });
    return;
  }
  isEnabled = !!result.isEnabled;
});

chrome.runtime.onMessage.addListener(async (message, _, __) => {
  if (message.action === 'enable') {
    if (isEnabled) return;
    isEnabled = true;
    await chrome.declarativeNetRequest.updateDynamicRules({
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
    await chrome.storage.local.set({ isEnabled });
  } else if (message.action === 'disable') {
    if (!isEnabled) return;
    isEnabled = false;
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1],
    });
    await chrome.storage.local.set({ isEnabled });
  }
});
