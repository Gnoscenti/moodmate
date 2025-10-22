# MoodMate UI/UX Design Documentation

## Design Philosophy

MoodMate's interface is designed with three core principles:

1. **Calming & Approachable** - Soft colors, rounded corners, and ample white space create a peaceful environment
2. **Intuitive & Simple** - Clear navigation, minimal cognitive load, easy-to-understand icons
3. **Professional & Trustworthy** - Clean iOS-style design that feels legitimate and secure

---

## Color Palette

### Primary Colors
- **Primary Blue:** `#007AFF` - Main brand color, buttons, headers
- **White:** `#FFFFFF` - Background, cards
- **Light Gray:** `#F5F5F5` - Secondary background

### Accent Colors
- **Light Blue:** `#E8F4FD` - Insights card background
- **Yellow Warning:** `#FFF3CD` - Disclaimer boxes
- **Red Error:** `#FF3B30` - Error messages, logout
- **Green Success:** `#34C759` - Success states

### Text Colors
- **Primary Text:** `#000000` - Headings, main content
- **Secondary Text:** `#666666` - Subtitles, descriptions
- **Tertiary Text:** `#999999` - Placeholders, disabled states

---

## Typography

### Font Family
- **iOS:** San Francisco (system default)
- **Android:** Roboto (system default)
- **Web:** -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

### Font Sizes
- **Title:** 32px (bold) - Screen titles
- **Heading:** 24-28px (bold) - Section headings
- **Subheading:** 20px (bold) - Card titles
- **Body:** 16px (regular) - Main content
- **Small:** 14px (regular) - Secondary info
- **Tiny:** 12px (regular) - Disclaimers, captions

---

## Screen Designs

### 1. Login Screen

**Visual Mockup:** `mockups/01_login_screen.png`

**Layout:**
```
┌─────────────────────────┐
│                         │
│      MoodMate💙         │  ← Logo with heart icon
│                         │
│  Welcome to MoodMate    │  ← H1 heading
│  Track your mental      │  ← Subtitle
│  wellness journey       │
│                         │
│  ⚠️ For self-reflection │  ← Yellow disclaimer box
│  only, not medical      │
│  advice                 │
│                         │
│  ┌───────────────────┐  │
│  │ Email             │  │  ← Input field
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │ Password          │  │  ← Input field
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │      Login        │  │  ← Primary button
│  └───────────────────┘  │
│                         │
│  Don't have an account? │
│  Register               │  ← Link
│                         │
└─────────────────────────┘
```

**Key Features:**
- Large, friendly logo with heart icon
- Clear disclaimer prominently displayed
- Rounded input fields with subtle borders
- Large, accessible button
- Simple navigation to registration

**Colors:**
- Background: White
- Logo: #007AFF
- Disclaimer: #FFF3CD background, #856404 text
- Button: #007AFF
- Link: #007AFF

---

### 2. Dashboard Screen

**Visual Mockup:** `mockups/02_dashboard_screen.png`

**Layout:**
```
┌─────────────────────────────────┐
│ MoodMate Dashboard    Logout    │  ← Blue header
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │ Log Your Mood           │   │  ← Card 1
│  │                         │   │
│  │ 😊 Happy ▼              │   │  ← Mood picker
│  │ 😢 Sad                  │   │
│  │ 😰 Anxious              │   │
│  │ 😌 Calm                 │   │
│  │                         │   │
│  │ ┌─────────────────────┐ │   │
│  │ │ Notes               │ │   │  ← Text area
│  │ └─────────────────────┘ │   │
│  │                         │   │
│  │ [Log Mood]              │   │  ← Button
│  └─────────────────────────┘   │
│                                 │
│  ┌──────────┐  ┌──────────┐    │
│  │💡 AI     │  │ Mood     │    │  ← Cards 2 & 3
│  │ Insights │  │ Trends   │    │
│  │          │  │  📈      │    │
│  │ Taking a │  │          │    │
│  │ deep...  │  │          │    │
│  └──────────┘  └──────────┘    │
│                                 │
│  ┌─────────────────────────┐   │
│  │ Recent Moods            │   │  ← Card 4
│  │                         │   │
│  │ 😊 Apr 24  Met with...  │   │
│  │ 😰 Apr 23  Busy day...  │   │
│  │ 😊 Apr 22  Felt over... │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

**Key Features:**
- Blue navigation bar with logout
- Card-based layout with shadows
- Mood picker with emoji + text
- Side-by-side insights and chart
- Scrollable mood history
- Pull-to-refresh functionality

**Card Styling:**
- Background: White
- Border radius: 10px
- Shadow: 0 2px 4px rgba(0,0,0,0.1)
- Padding: 15px
- Margin: 10px

---

### 3. Mood Chart

**Visual Mockup:** `mockups/03_mood_chart.png`

**Layout:**
```
┌─────────────────────────┐
│                         │
│    Mood Trends          │  ← Heading
│                         │
│  5 ─────────────────●   │  ← Line chart
│    ╱                    │
│  4 ╱                    │
│   ╱        ●            │
│  3        ╱             │
│          ╱              │
│  2      ●               │
│        ╱                │
│  1    ●                 │
│    ────────────────────  │
│    1/15  1/16  1/17     │  ← Date labels
│                         │
│  📈 Higher scores =     │  ← Legend
│     Better mood         │
│                         │
└─────────────────────────┘
```

**Key Features:**
- Clean line chart with data points
- Blue line (#007AFF)
- Smooth bezier curves
- Clear axis labels
- Helpful legend
- Responsive sizing

**Chart Configuration:**
- Background: White
- Line color: #007AFF
- Point color: #007AFF
- Grid lines: Light gray
- Y-axis: 0-5 (mood scores)
- X-axis: Dates (last 7 entries)

---

### 4. Mood Form (Expanded Picker)

**Visual Mockup:** `mockups/04_mood_form.png`

**Layout:**
```
┌─────────────────────────┐
│                         │
│  😊 Happy               │
│  😢 Sad                 │
│  😰 Anxious             │
│  😫 Stressed            │
│  😌 Calm                │
│  ⚡ Energetic           │
│  😔 Depressed           │
│  😠 Angry               │
│  🤩 Excited             │
│  😴 Tired               │
│  😊 Content             │
│  😤 Frustrated          │
│  🌟 Hopeful             │
│  😵 Overwhelmed         │
│  ☮️ Peaceful            │
│                         │
│  ┌───────────────────┐  │
│  │ Add notes         │  │  ← Text area
│  │ (optional)...     │  │
│  │                   │  │
│  └───────────────────┘  │
│                         │
└─────────────────────────┘
```

**Key Features:**
- 15 mood options with emoji
- Large touch targets (easy to tap)
- Optional notes field
- Clear visual hierarchy
- Scrollable list

**Mood Options:**
1. 😊 Happy
2. 😢 Sad
3. 😰 Anxious
4. 😫 Stressed
5. 😌 Calm
6. ⚡ Energetic
7. 😔 Depressed
8. 😠 Angry
9. 🤩 Excited
10. 😴 Tired
11. 😊 Content
12. 😤 Frustrated
13. 🌟 Hopeful
14. 😵 Overwhelmed
15. ☮️ Peaceful

---

### 5. AI Insights Display

**Visual Mockup:** `mockups/05_insights_display.png`

**Layout:**
```
┌─────────────────────────────┐
│ │                           │  ← Blue left border
│ │  💡 AI Insights           │
│ │                           │
│ │  I wonder if exploring    │  ← Italic text
│ │  mindfulness practices    │
│ │  might help you find      │
│ │  more calm in your day.   │
│ │  Studies have shown that  │
│ │  those who practice daily │
│ │  meditation often report  │
│ │  reduced anxiety levels.  │
│ │                           │
│ │  Remember: This is for    │  ← Small gray text
│ │  reflection only, not     │
│ │  medical advice.          │
│ │                           │
└─────────────────────────────┘
```

**Key Features:**
- Light blue background (#E8F4FD)
- Blue left border accent (4px, #007AFF)
- Lightbulb icon
- Italic empathetic text
- Clear disclaimer at bottom
- Rounded corners

**Styling:**
- Background: #E8F4FD
- Border-left: 4px solid #007AFF
- Padding: 15px
- Border-radius: 10px
- Text: 16px italic
- Disclaimer: 12px gray italic

---

## Component Library

### Buttons

**Primary Button**
```
Background: #007AFF
Text: White, 18px, bold
Padding: 15px
Border-radius: 8px
Width: 100%
Shadow: 0 2px 4px rgba(0,122,255,0.3)
```

**Secondary Button**
```
Background: White
Text: #007AFF, 16px, bold
Border: 1px solid #007AFF
Padding: 12px
Border-radius: 8px
```

**Disabled State**
```
Background: #CCCCCC
Text: White
Opacity: 0.6
```

### Input Fields

**Text Input**
```
Border: 1px solid #DDDDDD
Background: White
Padding: 15px
Border-radius: 8px
Font-size: 16px
Placeholder: #999999
```

**Text Area**
```
Border: 1px solid #DDDDDD
Background: White
Padding: 12px
Border-radius: 8px
Font-size: 16px
Min-height: 80px
```

**Focus State**
```
Border-color: #007AFF
Shadow: 0 0 0 3px rgba(0,122,255,0.1)
```

### Cards

**Standard Card**
```
Background: White
Border-radius: 10px
Padding: 15px
Margin: 10px
Shadow: 0 2px 4px rgba(0,0,0,0.1)
```

**Insights Card**
```
Background: #E8F4FD
Border-left: 4px solid #007AFF
Border-radius: 10px
Padding: 15px
Margin: 10px
```

### Navigation

**Header Bar**
```
Background: #007AFF
Height: 60px
Padding: 0 20px
Text: White, 20px, bold
Shadow: 0 2px 4px rgba(0,0,0,0.1)
```

---

## Spacing System

### Padding/Margin Scale
- **xs:** 5px
- **sm:** 10px
- **md:** 15px
- **lg:** 20px
- **xl:** 30px

### Usage
- Screen padding: 20px
- Card padding: 15px
- Card margin: 10px
- Button padding: 15px vertical
- Input padding: 15px
- Section spacing: 20px

---

## Icons & Emojis

### Mood Emojis
All moods use native emoji for consistency across platforms:
- Happy: 😊
- Sad: 😢
- Anxious: 😰
- Stressed: 😫
- Calm: 😌
- Energetic: ⚡
- Depressed: 😔
- Angry: 😠
- Excited: 🤩
- Tired: 😴
- Content: 😊
- Frustrated: 😤
- Hopeful: 🌟
- Overwhelmed: 😵
- Peaceful: ☮️

### UI Icons
- Insights: 💡 (lightbulb)
- Chart: 📈 (trending up)
- Warning: ⚠️ (warning sign)
- Heart: 💙 (blue heart for logo)

---

## Responsive Design

### Breakpoints
- **Mobile:** < 768px (primary focus)
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px (web version)

### Mobile-First Approach
- All designs optimized for mobile
- Touch targets minimum 44x44px
- Thumb-friendly navigation
- Swipe gestures supported
- Pull-to-refresh enabled

---

## Accessibility

### WCAG 2.1 AA Compliance

**Color Contrast:**
- Text on white: 4.5:1 minimum
- Blue buttons: 4.5:1 contrast ratio
- Error messages: High contrast red

**Touch Targets:**
- Minimum 44x44px
- Adequate spacing between tappable elements

**Text Sizing:**
- Supports dynamic type
- Minimum 16px for body text
- Scalable fonts

**Screen Reader Support:**
- Semantic HTML/React Native elements
- ARIA labels where needed
- Logical tab order
- Descriptive button labels

---

## Animation & Transitions

### Micro-interactions
- Button press: Scale 0.95, 100ms
- Card tap: Opacity 0.8, 150ms
- Screen transitions: Slide, 300ms ease-in-out
- Loading states: Spinner, smooth rotation

### Pull-to-Refresh
- Pull distance: 80px
- Spinner appears at 60px
- Release to refresh
- Smooth spring animation

---

## Dark Mode (Future)

### Color Adjustments
- Background: #000000 → #1C1C1E
- Cards: #FFFFFF → #2C2C2E
- Text: #000000 → #FFFFFF
- Primary blue: Slightly lighter for contrast

---

## Design Assets

### Mockups
All mockups are available in `/mockups/` directory:

1. **01_login_screen.png** - Login/authentication
2. **02_dashboard_screen.png** - Main dashboard view
3. **03_mood_chart.png** - Mood trends visualization
4. **04_mood_form.png** - Mood picker expanded
5. **05_insights_display.png** - AI insights card

### Logo
- Primary logo: "MoodMate" text + 💙 heart icon
- Color: #007AFF
- Font: System bold

---

## Implementation Notes

### React Native Components Used
- `View` - Containers
- `Text` - All text
- `TextInput` - Input fields
- `TouchableOpacity` - Buttons, tappable items
- `ScrollView` - Scrollable content
- `Picker` - Mood selector
- `LineChart` (react-native-chart-kit) - Charts
- `RefreshControl` - Pull-to-refresh

### Styling Approach
- StyleSheet.create() for performance
- Consistent spacing variables
- Reusable style objects
- Platform-specific adjustments where needed

### Example Style Object
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

---

## User Flow

### First-Time User
1. **Login Screen** → Register
2. **Register Screen** → Create account
3. **Dashboard** → See empty state
4. **Log First Mood** → See form
5. **Get AI Insight** → See empathetic response
6. **View Chart** → See first data point

### Returning User
1. **Login Screen** → Enter credentials
2. **Dashboard** → See mood history
3. **Quick Log** → Add new mood
4. **View Trends** → Check progress
5. **Read Insights** → Get AI guidance

---

## Best Practices Implemented

### UX Principles
✅ **Clarity** - Clear labels, obvious actions
✅ **Feedback** - Loading states, success messages
✅ **Consistency** - Uniform styling throughout
✅ **Efficiency** - Quick mood logging
✅ **Forgiveness** - Easy to correct mistakes
✅ **Accessibility** - Large touch targets, high contrast

### Mental Health Considerations
✅ **Calming colors** - Soft blues, not aggressive
✅ **Positive language** - Encouraging, not judgmental
✅ **Clear disclaimers** - Not medical advice
✅ **Privacy-first** - Secure, confidential feel
✅ **Non-intrusive** - No dark patterns or pressure

---

## Future Enhancements

### Planned UI Improvements
- [ ] Dark mode toggle
- [ ] Custom mood categories
- [ ] Photo attachments to moods
- [ ] Voice note recording
- [ ] Animated mood transitions
- [ ] Haptic feedback
- [ ] Widget for home screen
- [ ] Apple Watch complication
- [ ] Customizable themes
- [ ] Mood streak celebrations

---

## Design Credits

**Design System:** iOS Human Interface Guidelines
**Color Inspiration:** Apple Health, Calm, Headspace
**Chart Library:** react-native-chart-kit
**Icons:** Native emoji + SF Symbols style

---

## Conclusion

MoodMate's UI is designed to be **calming, trustworthy, and easy to use**. The clean iOS-style design, combined with thoughtful color choices and clear information hierarchy, creates an app that users will feel comfortable using daily for their mental wellness journey.

The interface balances **professional credibility** with **approachable warmth**, making mental health tracking feel less clinical and more like a supportive companion.

