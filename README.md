# 💕 Will You Be My Valentine?

A playful, interactive Valentine's Day website with an **unclickable "No" button** that jumps away when you try to click it!

![Valentine's Website](preview.png)

## ✨ Features

- 🎭 **Dramatically Unclickable No Button** - It jumps to random positions with playful messages
- 🎨 **Romantic Design** - Soft pink gradients, floating hearts, beautiful typography
- 🎉 **Confetti Celebration** - Explosive celebration when they say "Yes"
- 📱 **Mobile Friendly** - Works perfectly on all devices
- ♿ **Accessible** - Respects reduced motion preferences
- 🎵 **Music Ready** - Hook included for background music

## 🚀 Live Demo

**[View Live Demo](https://yourusername.github.io/will-you-be-my-valentine)**

*(Replace with your actual GitHub Pages URL after deployment)*

## 🛠️ Setup & Deployment

### Option 1: GitHub Pages (Recommended - FREE!)

1. **Fork/Create a new repository** on GitHub
2. **Upload all files** to your repository
3. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Click Save
4. **Wait 2-3 minutes** and your site will be live at:
   `https://yourusername.github.io/repository-name`

### Option 2: Netlify (FREE & Fast)

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Get instant live URL!

### Option 3: Run Locally

```bash
# Clone/download the files
cd will-you-be-my-valentine

# Start a local server
python -m http.server 8080

# Open http://localhost:8080 in your browser
```

## 🎨 Customization

### Change the GIFs

Edit `index.html` and replace the GIF URLs:

```html
<!-- Initial begging GIF -->
<img id="mainGif" src="YOUR_GIF_URL_HERE" ...>

<!-- Success celebration GIF -->
<img id="successGif" src="YOUR_GIF_URL_HERE" ...>
```

**Find cute GIFs at:**
- [Giphy](https://giphy.com)
- [Tenor](https://tenor.com)

### Change Colors

Edit `css/style.css` and modify the CSS variables:

```css
:root {
    --color-bg-primary: #FFE4E1;    /* Background pink */
    --color-btn-yes: #E91E63;        /* Yes button color */
    --color-btn-no: #9C27B0;         /* No button color */
}
```

### Change Messages

Edit `js/app.js` and modify the button texts:

```javascript
const CONFIG = {
    noButtonTexts: [
        "No 😢",
        "Are you sure? 🤔",
        "Pretty please? 🥺",
        // Add your own!
    ]
};
```

## 🎯 How It Works

1. Your Valentine sees the question with cute puppy eyes
2. They try to click "No"... but it RUNS AWAY! 😱
3. The button cycles through funny messages begging them to reconsider
4. Eventually, they click "YES!" 💕
5. **CONFETTI EXPLOSION!** 🎉
6. Success message with celebration GIF appears

## 📁 Project Structure

```
will-you-be-my-valentine/
├── index.html          # Main page
├── css/
│   └── style.css       # All styling
├── js/
│   └── app.js          # Interactive magic
└── README.md           # This file
```

## 💝 Tips for Maximum Success

1. **Send the link creatively** - Hide it in a QR code, send as a "mystery link"
2. **Customize the GIFs** - Use inside jokes or their favorite characters
3. **Record their reaction** - Screen record when they try to click "No" 😂
4. **Have a backup plan** - If they somehow click "No" 100 times, maybe buy chocolate too

## 📝 License

Made with 💕 for Valentine's Day. Share the love!

---

**Good luck! May your Valentine say YES! 💖**
