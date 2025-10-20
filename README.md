# Webpage/musicplayer/gallery— Public Release

This folder contains a sanitized version of the site suitable for a public GitHub repository.

- **Private content removed**: Personal letter, poem, and gallery photos are replaced with placeholders.
- **Allowed assets included**: `back-to-december.mp3`, `images/album-cover.png`, `strawberry.png`.
- **Tech**: Plain HTML/CSS/JS.

## Files to include
- `index.html` (sanitized placeholders)
- `style.css`
- `script.js`
- `strawberry.png`
- `back-to-december.mp3`
- `images/album-cover.png`

## Run locally
- Open `index.html` in a browser.

## Deploy to GitHub Pages
1. Create a new GitHub repo and upload this `public-release/` folder’s contents.
2. Settings → Pages → Source: Deploy from a branch → Branch: your default, Folder: `/ (root)`.
3. Wait ~1–2 minutes for build.

## Notes
- The audio file may be copyrighted. Ensure you have rights before publishing publicly.

## Project description
This is a single‑page static website with a cute music player, a letter modal, a poem modal, and a gallery. This public release ships with placeholders for the letter, poem, and gallery to protect private content.

## Features
- **Music player**: Play/pause, time progress, and a like button.
- <img width="325" height="575" alt="image" src="https://github.com/user-attachments/assets/c516ade0-9fa4-401f-9089-1f777658c61e" />
- <img width="309" height="94" alt="image" src="https://github.com/user-attachments/assets/5dfcca5c-4b36-4b43-a6d0-c136d50ddeef" />

- **Letter modal**: Placeholder letter text, ready to customize.
- <img width="274" height="264" alt="image" src="https://github.com/user-attachments/assets/1a35c405-d1ad-459a-aa56-9a6428aa7e3f" />
- **Poem modal**: Placeholder stanza, ready to customize.
- <img width="238" height="220" alt="image" src="https://github.com/user-attachments/assets/d504703b-a005-4efc-99df-5aaa9251b364" />
- **Gallery**: Uses `strawberry.png` as placeholder tiles.
- <img width="243" height="222" alt="image" src="https://github.com/user-attachments/assets/339ab6b0-0641-4988-b1ea-8165b8166e20" />
- **Decor**: Strawberry stickers over a checkered background.

<img width="1439" height="728" alt="image" src="https://github.com/user-attachments/assets/42265089-ee27-45df-9d18-77276e891bdc" />
<img width="1439" height="732" alt="image" src="https://github.com/user-attachments/assets/f0c3d35d-b1e8-4032-867f-1ba571cd397b" />
<img width="1437" height="725" alt="image" src="https://github.com/user-attachments/assets/24f4c2a0-52d9-44f6-aa3c-143ccd9c2733" />
<img width="1439" height="728" alt="image" src="https://github.com/user-attachments/assets/7b8357f0-0904-4157-b009-a5d598a49a72" />


## Tech stack
- HTML
- CSS
- JavaScript (vanilla)

## Folder structure
```
public-release/
├─ index.html
├─ style.css
├─ script.js
├─ strawberry.png
├─ back-to-december.mp3
└─ images/
   └─ album-cover.png
```

## Getting started
- Open `index.html` directly in a browser.
- Optional: use a simple static server for local preview (e.g., VS Code Live Server).

## How to customize
- **Letter**: In `index.html`, find the `.letter-body` paragraphs and replace the placeholder text with your own.
- **Poem**: In `index.html`, find the `.poem-body` paragraph and replace the placeholder stanza.
- **Gallery**: In `index.html`, replace the `img src="strawberry.png"` entries with your own image paths. You can add a `photos/` folder if your repo is private.
- **Audio**: Replace `back-to-december.mp3` with a track you have rights to, or update the `<audio id="audioPlayer" src="...">` to point to your file/URL.

## How it works
- **Logic**: The `MusicPlayer` class and modal wiring live in `script.js`.
- **Styles**: All visual design is in `style.css`.
- **No build step**: It’s a plain static site—no frameworks or bundlers required.

## Privacy and licensing
- This public release intentionally excludes personal text and photos. Add your own only if you’re comfortable publishing them.
- Verify you have permission to publish any audio/images you include.
