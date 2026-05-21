# Weather App

A simple browser app that looks up live weather for any city. Type a place name, hit search (or press Enter), and you get temperature, humidity, wind speed, and a background that matches the conditions—clear, cloudy, rain, drizzle, or mist.

Built with plain HTML, CSS, and JavaScript. Weather data comes from [OpenWeatherMap](https://openweathermap.org/).

## What you need

- A modern web browser (Chrome, Firefox, Edge, Safari, etc.)
- An internet connection (the app calls OpenWeatherMap when you search)
- A free OpenWeatherMap API key ([sign up here](https://home.openweathermap.org/users/sign_up), then create a key under **API keys** in your account)

No Node.js or build step is required.

## Get your API key working

1. Copy the example config file:
   ```bash
   cp config.example.js config.js
   ```
2. Open `config.js` and replace the placeholder with your OpenWeatherMap API key.
3. Save the file. `config.js` is listed in `.gitignore` and will not be pushed to GitHub.

Never commit your real API key. If a key was ever pushed to a public repo, **revoke it** in your [OpenWeatherMap account](https://home.openweathermap.org/api_keys) and create a new one.

## Run the app locally

Because the page loads images and calls an external API, opening the HTML file directly (`file://`) can cause issues in some browsers. A small local server is the reliable approach.

**Option A — VS Code / Cursor**

If you use the Live Server extension, right-click `index.htm` and choose **Open with Live Server**.

**Option B — Python (if installed)**

From the project folder:

```bash
cd weatherApp
python3 -m http.server 8000
```

Then open [http://localhost:8000/index.htm](http://localhost:8000/index.htm) in your browser.

**Option C — Node (if you have `npx`)**

```bash
npx serve .
```

Open the URL shown in the terminal (usually port 3000 or 5000) and go to `index.htm`.

## How to use it

1. Start the app using one of the methods above.
2. In the search box, enter a city name (for example `London`, `Nairobi`, or `Tokyo`).
3. Click **GO** or press **Enter**.
4. If the city is found, you will see:
   - Current temperature (°C)
   - Humidity and wind speed
   - A short condition label (Clear, Clouds, Rain, etc.)
   - A matching background image and icon in the gallery row
5. If the name is wrong or not recognized, you will see **Invalid city name**. Try the official English spelling OpenWeatherMap expects, or add the country (e.g. `Paris,FR`).

## Project layout

```
weatherApp/
├── index.htm           # Page structure and weather card UI
├── index.js            # Search, API call, and updating the display
├── config.example.js   # Template for your API key (safe to commit)
├── config.js           # Your real API key (create locally, not in Git)
├── style.css           # Layout, colors, and responsive styling
├── images/             # Icons and background photos
└── README.md           # This file
```

## Supported weather types

The app maps these OpenWeatherMap conditions to icons and backgrounds:

| Condition | What you see |
|-----------|----------------|
| Clear     | Sunny background and clear icon |
| Clouds    | Cloudy background |
| Rain      | Rain background |
| Drizzle   | Drizzle background |
| Mist      | Mist icon (other conditions fall back to defaults) |

## Troubleshooting

**Nothing happens when I search**

- Check the browser console for errors (F12 → Console).
- Confirm your API key is set correctly in `index.js`.
- New OpenWeatherMap keys can take a few minutes to activate.

**"Invalid city name" for a real place**

- Use the city name in English, or try `City,CountryCode` (e.g. `Sydney,AU`).

**Images or styles look broken**

- Serve the folder over `http://localhost`, not by double-clicking the HTML file.
- Make sure the `images/` folder is still next to `index.htm`.

## License

This project is for learning and personal use. Replace the API key with your own before deploying publicly.
