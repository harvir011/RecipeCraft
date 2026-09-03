# RecipeCraft Design System

## 🎨 Design Philosophy: Neo-Brutalism meets Hand-Drawn Sketch

The RecipeCraft design system combines harsh, bold brutalist elements with playful, hand-drawn aesthetics to create a unique and engaging user experience.

---

## 🎯 Core Design Principles

### Visual Style
- **Bold Borders**: 3px-4px thick dark charcoal borders (`#1A1A1A`) on all interactive elements
- **Hard Shadows**: Offset box shadows (`4px 4px 0px #1A1A1A`) creating a "pressed" effect
- **Bright Colors**: Vibrant pop palette using pastel and neon tones
- **Sketchy Accents**: Hand-drawn style elements for badges and notes
- **Rounded Elements**: Generous border-radius on buttons and cards

### Typography
- **Headers**: Bold, chunky typeface (`Chicle`, `Fredoka`) for maximum impact
- **Body Text**: Clean, readable typeface (`Plus Jakarta Sans`) for accessibility
- **Sketchy Accents**: Hand-drawn typeface (`Architects Daughter`, `Caveat`) for badges and casual elements

---

## 🎨 Color Palette

### Primary Colors
```css
--electric-orange: #FF5A36    /* Primary action, highlights */
--vibrant-yellow: #FFC700    /* Secondary action, emphasis */
--deep-mint: #00D084         /* Tertiary action, success */
--dark-bg: #1A1A1E           /* Text, borders, shadows */
```

### Usage
- **Electric Orange**: Primary buttons, icons, headings
- **Vibrant Yellow**: Secondary buttons, hover states
- **Deep Mint**: Success states, tertiary actions
- **Dark Charcoal**: Borders, text, shadows, structure

### Neutral Colors
```css
white              /* Background, cards */
gray-100 - gray-900 /* Text hierarchy, disabled states */
```

---

## 📐 Component Library

### Button Component

**Variants:**
- `primary`: Electric orange background
- `secondary`: Vibrant yellow background
- `tertiary`: Deep mint background
- `outline`: White background with dark border

**Sizes:**
- `sm`: Small (px-3 py-1.5 text-sm)
- `md`: Medium (px-4 py-2.5 text-base) - Default
- `lg`: Large (px-6 py-3 text-lg)

**Features:**
- Active click press animation: `translate-x-1 translate-y-1 shadow-none`
- Loading spinner with disabled state
- Focus ring for accessibility
- Hover shadow enhancement

**Example:**
```jsx
<Button variant="primary" size="md" loading={false}>
  Click Me
</Button>
```

---

### Card Component

**Features:**
- White background with 3px dark border
- Hard offset shadow (`shadow-brutal`)
- Rounded corners (lg radius)
- Optional accent corner decoration
- Responsive padding

**Example:**
```jsx
<Card accent>
  <h2>Recipe Title</h2>
  <p>Recipe content goes here</p>
</Card>
```

---

### Input Component

**Features:**
- Thick dark border (3px)
- Clear focus state with ring
- Error state styling
- Label support
- Placeholder text
- Disabled state

**Example:**
```jsx
<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  error={errors.email}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

### Select Component

**Features:**
- Consistent with Input styling
- Dark border (3px)
- Focus state with ring
- Error state styling
- Label support
- Option array support

**Example:**
```jsx
<Select
  label="Cuisine Type"
  value={cuisine}
  onChange={(e) => setCuisine(e.target.value)}
  options={[
    { label: 'Italian', value: 'italian' },
    { label: 'Asian', value: 'asian' }
  ]}
/>
```

---

### Badge Component

**Variants:**
- `primary`: Electric orange when selected
- `dietary`: Deep mint when selected
- `cuisine`: Vibrant yellow when selected

**Features:**
- Hand-drawn style font (`font-sketch`)
- Pill-shaped with full border
- Click handler for selection toggle
- Visual feedback for selected state

**Example:**
```jsx
<Badge
  variant="dietary"
  selected={selectedDietary.includes('Vegan')}
  onClick={() => toggleDietary('Vegan')}
>
  Vegan
</Badge>
```

---

## 🏗️ Layout Components

### Layout
Main container that wraps all pages with Navbar and Footer.

```jsx
<Layout>
  <YourContent />
</Layout>
```

### Navbar
- Responsive header with logo
- Navigation links
- Authentication state handling
- Mobile menu toggle
- User profile display

### Footer
- Quick links section
- Contact information
- Copyright notice
- Responsive footer grid

---

## 🔐 State Management

### AuthContext

**Provides:**
- `user`: Current user object
- `token`: JWT authentication token
- `loading`: Loading state during auth operations
- `error`: Error messages from auth operations
- `isAuthenticated`: Boolean for auth status

**Methods:**
- `register(name, email, password)`: User registration
- `login(email, password)`: User login
- `logout()`: Clear user session

**Example:**
```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  // Use auth state and methods
}
```

---

## 📡 API Integration

### Axios Instance

**Features:**
- Automatic Bearer token injection
- Base URL configuration from environment
- Request/response interceptors
- Automatic 401 logout redirect

**Example:**
```jsx
import api from '../api/axios';

const response = await api.post('/recipes/generate', {
  ingredients: ['chicken', 'garlic'],
  cuisine: 'Mediterranean'
});
```

---

## 📱 Responsive Design

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Grid System
- Mobile-first approach
- Responsive grid layouts
- Hidden elements at different breakpoints
- Flexible containers

**Example:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items automatically adjust at breakpoints */}
</div>
```

---

## ♿ Accessibility Features

- Semantic HTML structure
- Focus states on interactive elements
- ARIA labels where needed
- Color contrast compliance
- Keyboard navigation support
- Error messages for form validation

---

## 🎭 Component States

### Interactive States
- **Default**: Normal appearance
- **Hover**: Enhanced shadow or color change
- **Active**: Press animation (translate + no shadow)
- **Focus**: Ring outline
- **Disabled**: Reduced opacity, no interaction
- **Loading**: Spinner animation

### Form States
- **Normal**: Neutral appearance
- **Focus**: Ring highlight
- **Error**: Red border and error message
- **Disabled**: Gray background, no interaction
- **Success**: Green indicator (if needed)

---

## 🎨 Shadow System

```css
shadow-brutal      /* 4px 4px 0px #1A1A1A */
shadow-brutal-lg   /* 8px 8px 0px #1A1A1E */
shadow-brutal-sm   /* 2px 2px 0px #1A1A1E */
```

These shadows create the characteristic brutalist "pressed" effect.

---

## 🔤 Typography Scale

### Headers
- h1: text-5xl md:text-7xl (font-header)
- h2: text-4xl (font-header)
- h3: text-xl (font-header)
- h4: text-lg (font-header)

### Body
- Base: text-base (font-body)
- Small: text-sm (font-body)
- Xs: text-xs (font-body)

### Sketchy
- Badges: text-sm (font-sketch)
- Notes: text-base (font-sketch)

---

## 📝 Font Families

```css
font-sketch     /* Architects Daughter - sketchy accents */
font-caveat     /* Caveat - hand-written details */
font-header     /* Chicle, Fredoka - bold headers */
font-bold       /* Fredoka - bold sans-serif */
font-body       /* Plus Jakarta Sans - body text */
```

---

## 🧩 Component Organization

```
/src/components/
├── ui/
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Input.jsx
│   ├── Select.jsx
│   ├── Badge.jsx
│   └── index.js
├── Layout.jsx
├── Navbar.jsx
├── Footer.jsx
├── ProtectedRoute.jsx
└── index.js
```

---

## 🚀 Usage Examples

### Complete Form
```jsx
import { Button, Input, Card } from '../components/ui';

<Card>
  <form onSubmit={handleSubmit}>
    <Input
      label="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      error={errors.email}
    />
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </form>
</Card>
```

### Filter Badges
```jsx
import { Badge } from '../components/ui';

const [selected, setSelected] = useState([]);

{diets.map(diet => (
  <Badge
    key={diet}
    selected={selected.includes(diet)}
    onClick={() => toggleDiet(diet)}
  >
    {diet}
  </Badge>
))}
```

### Protected Page
```jsx
import { ProtectedRoute } from '../components';

<Route
  path="/generate"
  element={
    <ProtectedRoute>
      <GenerateRecipe />
    </ProtectedRoute>
  }
/>
```

---

## 🎯 Design Tokens

All design values are defined in Tailwind configuration:

```javascript
// tailwind.config.js
colors: {
  'electric-orange': '#FF5A36',
  'vibrant-yellow': '#FFC700',
  'deep-mint': '#00D084',
  'dark-bg': '#1A1A1E',
}

borderWidth: {
  '3': '3px',
  '4': '4px',
}

boxShadow: {
  'brutal': '4px 4px 0px 0px #1E1E1E',
  'brutal-lg': '8px 8px 0px 0px #1E1E1E',
  'brutal-sm': '2px 2px 0px 0px #1E1E1E',
}

fontFamily: {
  'sketch': ['Architects Daughter', 'cursive'],
  'header': ['Chicle', 'cursive'],
  'bold': ['Fredoka', 'sans-serif'],
  'body': ['Plus Jakarta Sans', 'sans-serif'],
}
```

---

## 📚 Best Practices

1. **Always use the design system components** - Don't add custom styling
2. **Maintain consistent spacing** - Use Tailwind spacing classes
3. **Use semantic colors** - Assign colors by purpose, not appearance
4. **Test accessibility** - Check keyboard navigation and screen readers
5. **Mobile-first approach** - Start with mobile, enhance for larger screens
6. **Consistent typography** - Use the font scale defined in the system
7. **Shadow hierarchy** - Use shadow intensity for visual hierarchy

---

## 🔄 Future Enhancements

- Animation library for transitions
- Dark mode variant
- Customizable color themes
- Expanded icon set
- Component composition patterns
- Storybook documentation
