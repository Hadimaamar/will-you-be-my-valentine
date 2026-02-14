# 🚀 Deploy to GitHub Pages (2 Minutes!)

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name**: `will-you-be-my-valentine`
3. **Description**: `A playful Valentine's website with an unclickable No button 💕`
4. **Public** (selected by default)
5. **Check**: ✓ Add a README file
6. Click **Create repository**

## Step 2: Upload Files

### Option A: Drag & Drop (Easiest)

1. In your new repo, click **"Add file"** → **"Upload files"**
2. Drag these files from your computer:
   - `index.html`
   - `css/style.css`
   - `js/app.js`
3. Click **"Commit changes"**

### Option B: Command Line

```bash
git clone https://github.com/YOUR_USERNAME/will-you-be-my-valentine.git
cd will-you-be-my-valentine

# Copy your files here
cp /path/to/your/index.html .
cp /path/to/your/css/style.css css/
cp /path/to/your/js/app.js js/

git add .
git commit -m "Initial commit - Valentine's website"
git push origin main
```

## Step 3: Enable GitHub Pages

1. In your repo, click **"Settings"** (top tab)
2. On left sidebar, click **"Pages"**
3. **Source**: Select "Deploy from a branch"
4. **Branch**: Select "main" / "/ (root)"
5. Click **Save**

## Step 4: Get Your Link! 🎉

- Wait 2-3 minutes
- Refresh the Settings → Pages page
- Your link will appear: `https://yourusername.github.io/will-you-be-my-valentine`

## ✅ That's It!

Send this link to your Valentine! 💕

---

### 🎨 Customize Before Deploying

Want to change the GIFs or messages? Edit these files BEFORE uploading:

| Change | File | Line |
|--------|------|------|
| Begging GIF | `index.html` | ~32 |
| Celebration GIF | `index.html` | ~55 |
| Button messages | `js/app.js` | ~11-19 |
| Colors | `css/style.css` | ~7-15 |

---

### 🔗 Your Link Will Be:

```
https://YOUR_GITHUB_USERNAME.github.io/will-you-be-my-valentine
```

**Example**: If your GitHub username is `john123`, your link is:
`https://john123.github.io/will-you-be-my-valentine`

---

## 💡 Pro Tips

1. **Test the link** in an incognito window before sending
2. **Customize the GIFs** - Use giphy.com to find cute ones
3. **Send creatively** - Hide it in a QR code or "mystery link"
4. **Record their reaction** when the No button runs away! 😂

---

**Good luck! May they say YES! 💝**
