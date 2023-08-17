chrome.storage.local.get('isEnabled', (result) => {
  const status = result.isEnabled ? 'Enabled' : 'Disabled';
  updateStatus(status);
});

document.getElementById('_enable')!.addEventListener('click', () => {
  updateStatus('Enabled');
});

document.getElementById('_disable')!.addEventListener('click', () => {
  updateStatus('Disabled');
});

function updateStatus(status: string) {
  if (status === "Enabled")
    chrome.runtime.sendMessage({ action: 'enable' });
  else if (status === "Disabled")
    chrome.runtime.sendMessage({ action: 'disable' });

  document.getElementById('_status')!.textContent = status;
}
