# Valentine's Website - Product Requirements Document

## Overview
A playful, romantic single-page website designed to ask someone to be your Valentine. The experience features an "unclickable" No button that playfully evades the cursor, creating a fun and memorable interaction.

---

## Core Functionality

### Main Feature
- **Question Display**: "Will you be my Valentine?" 
- **Two Response Options**:
  - **Yes Button**: Standard clickable button that leads to success state
  - **No Button**: Dramatically unclickable - jumps to a random location on screen whenever hovered

### Button Behavior

#### Yes Button
- Static position
- Triggers success/celebration state on click
- No special hover effects beyond standard styling

#### No Button (The Star of the Show)
- **Primary Mechanic**: On hover, instantly relocates to a random position within the viewport
- **Secondary Behavior**: Optional text cycling through phrases like:
  - "No"
  - "Are you sure?"
  - "Think again!"
  - "Pretty please?"
  - "Wrong button!"
- **Animation**: Smooth but quick transition (200-300ms) when jumping
- **Constraints**: Always stays within visible viewport bounds
- **Z-Index**: Above other content to ensure it can always be interacted with (and escaped)

---

## Visual Design

### Color Scheme
| Element | Color | Hex Code |
|---------|-------|----------|
| Primary Background | Soft Pink | `#FFE4E1` |
| Secondary/Accent | Deep Rose | `#FF6B9D` |
| Yes Button | Romantic Red | `#E91E63` |
| Yes Button Hover | Darker Red | `#C2185B` |
| No Button | Playful Purple | `#9C27B0` |
| Text Primary | Dark Charcoal | `#2C1810` |
| Text Secondary | Soft Brown | `#6D4C41` |

**Gradient Accents**: 
- Button gradients from `#FF6B9D` to `#E91E63`
- Optional subtle background gradient overlay

### Typography
- **Primary Font**: "Quicksand" (Google Fonts)
  - Weights: 500, 600, 700
  - Style: Rounded, friendly, playful
- **Secondary Font (for question)**: "Pacifico" (Google Fonts)
  - Style: Elegant script for the main question
- **Fallback Stack**: `'Quicksand', 'Helvetica Neue', Arial, sans-serif`

### Background
- **Type**: Animated gradient mesh with floating hearts
- **Colors**: Soft pink to blush rose gradient
- **Animation**: 
  - Slowly morphing gradient (20s cycle)
  - Floating heart particles (15-20 small hearts drifting slowly)
  - Hearts use opacity 0.3-0.6, varying sizes (10-30px)
  - Hearts move in sine wave patterns

### Button Style

#### Yes Button
```
- Shape: Pill-shaped (border-radius: 50px)
- Size: 160px × 60px
- Background: Linear gradient (45deg, #FF6B9D → #E91E63)
- Text: White, bold, 20px
- Shadow: 0 4px 15px rgba(233, 30, 99, 0.4)
- Hover Shadow: 0 6px 20px rgba(233, 30, 99, 0.6)
- Hover Scale: 1.05
- Transition: all 0.3s ease
```

#### No Button
```
- Shape: Pill-shaped (border-radius: 50px)
- Size: 140px × 55px (slightly smaller than Yes)
- Background: Linear gradient (45deg, #AB47BC → #7B1FA2)
- Text: White, bold, 18px
- Shadow: 0 4px 12px rgba(156, 39, 176, 0.3)
- Position: absolute (required for jumping)
- Transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Overall Aesthetic
- **Style**: Cute, kawaii, playful romantic
- **Vibe**: Whimsical, slightly cheeky, heartwarming
- **Inspiration**: Japanese kawaii culture meets modern clean design
- **Mood**: Lighthearted pressure (in a fun way), celebration of love

---

## Content

### Initial Question
```
"Will you be my Valentine?"
```
- Font: Pacifico, 48px (desktop), 32px (mobile)
- Color: #2C1810
- Text shadow: 2px 2px 4px rgba(255, 107, 157, 0.3)
- Animation: Gentle pulse (scale 1.0 → 1.02 → 1.0, 3s infinite)

### Button Labels
- **Yes Button**: "YES! 💕"
- **No Button**: 
  - Initial: "No 😢"
  - Rotating alternatives:
    - "Are you sure? 🤔"
    - "Pretty please? 🥺"
    - "Wrong button! ⬅️"
    - "Think again! 💭"
    - "Don't break my heart! 💔"

### Success State

#### Success Message
```
"Yay! I knew you'd say yes! 💖
You're the best Valentine ever!"
```
- Font: Quicksand Bold, 36px (desktop), 24px (mobile)
- Color: #E91E63
- Animation: Bounce in effect

---

## Media

### Initial State GIF
**Description**: Cute puppy/character with big pleading puppy eyes
**Specs**:
- Dimensions: 300px × 300px (responsive)
- Style: Kawaii animated GIF
- Mood: Begging, hopeful, adorable
- Suggested sources: Giphy, Tenor (search: "puppy eyes", "begging gif", "cute please gif")
- Fallback: Static PNG with puppy eyes if GIF fails to load

### Success State GIF
**Description**: Celebratory animation - could be:
- Happy dancing character
- Exploding hearts
- Celebration confetti with cute character
- Happy puppy celebration

**Specs**:
- Dimensions: 350px × 350px (responsive, slightly larger than initial)
- Style: Kawaii animated GIF
- Mood: Joyful, celebratory, excited
- Suggested searches: "celebration gif", "happy dance", "hearts explosion cute"

---

## Animations & Effects

### Background Animations
1. **Gradient Mesh**: Slowly shifting gradient colors (20s cycle)
2. **Floating Hearts**: 
   - 15-20 small heart icons
   - Float upward with gentle horizontal drift
   - Random sizes (10-30px)
   - Random speeds (15-25s per cycle)
   - Opacity: 0.3-0.6
   - Color: #FF6B9D with varying opacity

### Interactive Effects

#### Yes Button Hover
- Scale: 1.05
- Shadow intensifies
- Optional: Sparkle particles emit from button edges

#### No Button Jump
- **Trigger**: Mouse enter event
- **Movement**: Teleports to random X,Y within viewport (keeping button fully visible)
- **Animation**: 
  - Duration: 250ms
  - Easing: cubic-bezier(0.68, -0.55, 0.265, 1.55) (slight overshoot for playfulness)
  - Optional rotation: Random -10deg to 10deg on each jump

### Success State Effects
1. **Confetti Explosion**:
   - Triggered immediately on Yes click
   - Duration: 3-5 seconds
   - Colors: #E91E63, #FF6B9D, #F8BBD9, #FFF, #FFD700
   - Density: Medium-high
   - Falls from top with gravity effect

2. **Heart Burst**:
   - Explosion of hearts from center
   - 20-30 hearts
   - Fly outward then fade

3. **Screen Effects**:
   - Gentle screen flash (white, 0.3s fade)
   - Optional: Screen shake (very subtle, 2px, 0.3s)

4. **Music** (Optional):
   - Soft celebratory sound effect
   - Or romantic jingle
   - Must be optional/muted by default (browser autoplay policies)

---

## Responsive Behavior

### Desktop (>768px)
- Full layout as designed
- Buttons side by side or Yes on left, No on right
- GIF size: 300-350px

### Tablet (768px)
- Slightly reduced spacing
- Buttons may stack vertically with Yes on top
- GIF size: 250px

### Mobile (<480px)
- Vertical layout: Question → GIF → Yes Button → No Button (but No still jumps!)
- Touch interaction: No button jumps on touchstart/tap
- Reduced animation complexity for performance
- GIF size: 200px
- Font sizes reduced proportionally

### No Button Mobile Adaptation
- On touch devices, trigger jump on tap/touchstart
- Ensure button doesn't get trapped in corners
- Minimum distance from edges: 20px

---

## Technical Requirements

### Performance
- Target: 60fps for all animations
- Use CSS transforms and opacity for animations (GPU accelerated)
- Limit concurrent animations
- Debounce No button jump events (100ms)

### Accessibility
- **Reduced Motion**: Respect `prefers-reduced-motion` media query
  - Disable floating hearts
  - Disable No button jumping (make it static with humorous message instead)
  - Instant transitions instead of animations
- **Screen Readers**: 
  - Proper aria-labels on buttons
  - Live region for success message
  - Alt text for GIFs

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- CSS Grid/Flexbox support required
- ES6+ JavaScript

---

## File Structure
```
project/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── app.js          # Interactive logic
├── assets/
│   ├── gif/
│   │   ├── puppy-eyes.gif    # Initial state GIF
│   │   └── celebration.gif   # Success state GIF
│   └── fonts/          # If self-hosting fonts (optional)
└── PRD.md              # This document
```

---

## Success Criteria
- [ ] No button is genuinely difficult/impossible to click
- [ ] Jump animation feels playful, not frustrating
- [ ] Success state feels rewarding and celebratory
- [ ] Page loads quickly (< 2s on 3G)
- [ ] Animations run smoothly (60fps)
- [ ] Mobile experience is equally fun
- [ ] Accessible to users with motion sensitivity
- [ ] Brings a smile to the recipient's face 💝

---

## GIF Suggestions

### Initial State Options
1. **Search Terms**: "puppy eyes gif", "begging eyes anime", "cute please gif", "puppy begging gif"
2. **Style**: Cute animals or kawaii characters with large pleading eyes
3. **Examples to look for**:
   - Puss in Boots big eyes (Shrek)
   - Cute anime characters with sparkles
   - Real puppies with sad eyes
   - Cartoon characters begging

### Success State Options
1. **Search Terms**: "celebration gif cute", "happy dance anime", "hearts explosion gif", "celebrate gif kawaii"
2. **Style**: Joyful, energetic, lots of hearts/sparkles
3. **Examples to look for**:
   - Dancing characters
   - Heart explosions
   - Happy animals celebrating
   - Confetti with cute characters

**Recommended Sources**: Giphy.com, Tenor.com, Gifer.com

---

## Notes for Developer
- The No button's jump logic should calculate viewport bounds dynamically
- Consider adding a "chaos mode" where No button jumps even faster after 3-4 attempts
- Test thoroughly on mobile - touch events are trickier than hover
- The "Yes" button should be satisfying to click - consider haptic feedback if possible
- Keep the tone light and fun - this is about creating a happy memory!

---

*Last Updated: February 2026*
*Created with 💕 for a special Valentine*
