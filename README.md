![image](https://github.com/Kulsgam/Discord-type-indicator-blocker/assets/90457704/639fd3ad-26ef-4cfb-82cf-761c6c2f8d75)# Discord type indicator blocker
<div align="center">
  <img src="images/1.png" alt="Control panel image"/>
</div>

- Blocks others from seeing when you are typing.
- It works by matching `\*discord.com/api/\*/channels/\*/typing\*` (not regex, as the webAPI doesn't support it), through chrome's `updateDynamicRules()`.

## Build
- Run `npm install`, if you haven't already
- Run `npm run build`

## Configure
- Open the browser
- Click on the hamburger menu on the top right
- Click extensions
- Click load unpacked
- Click the folder which has this repository (the folder which has the manifest.json file)

## Troubleshooting
- In case it doesn't work, click on the extensions toolbar and find this extension. Click on it, and click `Enable`

## Issues
Brave has [issues](https://github.com/brave/brave-browser/issues/30854), and I've found a temporary fix as I have commented, but I've got to test it further
