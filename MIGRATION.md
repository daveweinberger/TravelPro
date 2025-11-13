# Chakra UI Migration Progress

## ✅ Completed

### Core Setup
- [x] Installed Chakra UI v2.8.2 and dependencies
- [x] Created iOS-inspired theme (`src/theme/index.js`)
- [x] Updated `src/index.js` with ChakraProvider
- [x] Backed up original Material-UI components

### Theme Features
- iOS color palette (SF Blue #007AFF)
- SF Pro font family
- iOS-style border radius (10-14px)
- Subtle shadows matching iOS design
- System color mode support
- Custom component styles (Button, Card, Input, Modal, Alert)

### Converted Components
- [x] **HomeScreen** - Fully converted to Chakra UI
  - iOS-style navigation bar with sticky positioning
  - Chakra Menu, IconButton, Badge
  - Chakra Tabs with iOS styling
  - Chakra Modal for import dialog
  - Responsive container layout
  - Clean, minimal aesthetic

- [x] **Calendar** - Fully converted to Chakra UI
  - Grid-based layout with responsive sizing
  - iOS-style day cells with rounded corners
  - Smooth hover animations (scale and shadow)
  - Color-coded alerts and selections
  - Touch-friendly on mobile

- [x] **TripDetails** - Fully converted to Chakra UI
  - Card-based event display
  - iOS-style alerts for gaps
  - Clean typography hierarchy
  - Responsive flex layout
  - Tag badges for trip categories

- [x] **ListView** - Fully converted to Chakra UI
  - Date-grouped event display
  - iOS-style select dropdowns
  - Card-based day containers
  - Alert components for gaps
  - Responsive spacing

- [x] **ImportPlans** - Temporary stub (needs full conversion)
- [x] **AlertsView** - Temporary stub (needs full conversion)

## 🚧 In Progress / To Do

### Components to Convert

#### High Priority
- [ ] **Calendar** - Needs Chakra UI conversion
- [ ] **TripDetails** - Needs Chakra UI conversion
- [ ] **ListView** - Needs Chakra UI conversion
- [ ] **ImportPlans** - Needs Chakra UI conversion
- [ ] **AlertsView** - Needs Chakra UI conversion

#### Medium Priority
- [ ] **Recommendations** - Needs Chakra UI conversion
- [ ] **TripsOverview** - Needs Chakra UI conversion
- [ ] **GapDetail** - Needs Chakra UI conversion

#### Low Priority
- [ ] **ImportProcessing** - Needs Chakra UI conversion
- [ ] **ImportReview** - Needs Chakra UI conversion

### CSS Files to Update/Remove
- [ ] Remove or update `src/styles/global.css`
- [ ] Remove Material-UI specific CSS files
- [ ] Update component-specific CSS to work with Chakra

## 📝 Migration Guidelines

### Component Conversion Pattern

**Material-UI → Chakra UI Mapping:**

```javascript
// Material-UI
import { Button, Box, Typography } from '@mui/material';

// Chakra UI
import { Button, Box, Text, Heading } from '@chakra-ui/react';
```

**Common Conversions:**

| Material-UI | Chakra UI | Notes |
|-------------|-----------|-------|
| `<Typography variant="h4">` | `<Heading size="lg">` | Use size prop |
| `<Typography variant="body1">` | `<Text>` | Default text |
| `<Paper>` | `<Box bg="white" borderRadius="lg" boxShadow="base">` | Custom styling |
| `<Container>` | `<Container maxW="container.xl">` | Similar API |
| `<IconButton>` | `<IconButton>` | Similar API |
| `sx={{ ... }}` | Direct props | Use Chakra props |
| `<Stack spacing={2}>` | `<Stack spacing={2}>` | Same API |

### iOS Design Principles

1. **Border Radius**: Use 10-14px for cards and buttons
2. **Shadows**: Subtle, use `boxShadow="base"` or `"md"`
3. **Colors**: Use `brand.500` for primary actions (#007AFF)
4. **Typography**: SF Pro fonts automatically applied
5. **Spacing**: Use Chakra spacing scale (2, 4, 6, 8)
6. **Transitions**: Smooth, use `transition="all 0.2s"`

### Example Conversion

**Before (Material-UI):**
```javascript
<Paper elevation={2} sx={{ p: 3, mb: 2 }}>
  <Typography variant="h6">Title</Typography>
  <Button variant="contained" color="primary">
    Action
  </Button>
</Paper>
```

**After (Chakra UI):**
```javascript
<Box bg="white" borderRadius="lg" boxShadow="md" p={6} mb={4}>
  <Heading size="md" mb={4}>Title</Heading>
  <Button colorScheme="brand">
    Action
  </Button>
</Box>
```

## 🎨 iOS Design Features

### Implemented
- ✅ iOS blue (#007AFF) as primary color
- ✅ SF Pro font family
- ✅ Rounded corners (10-14px)
- ✅ Subtle shadows
- ✅ System color mode support
- ✅ iOS-style navigation bar
- ✅ Native-feeling buttons

### To Implement
- [ ] Bottom sheet modals
- [ ] Pull-to-refresh
- [ ] Swipe gestures
- [ ] iOS-style action sheets
- [ ] Native transitions
- [ ] Haptic feedback simulation

## 🔧 Testing Checklist

- [ ] Test on iOS Safari
- [ ] Test on Chrome mobile
- [ ] Test dark mode
- [ ] Test responsive breakpoints
- [ ] Test all navigation flows
- [ ] Test form inputs
- [ ] Test modals and overlays
- [ ] Verify accessibility

## 📦 Dependencies

### Added
- `@chakra-ui/react` - Core UI library
- `@chakra-ui/icons` - Icon set
- `@emotion/react` - CSS-in-JS
- `@emotion/styled` - Styled components
- `framer-motion` - Animations

### Can Remove (After Full Migration)
- `@mui/material`
- `@mui/icons-material`
- `@cloudscape-design/components`
- `@cloudscape-design/global-styles`

## 🚀 Next Steps

1. Convert Calendar component
2. Convert TripDetails component
3. Convert ListView component
4. Test HomeScreen thoroughly
5. Continue with remaining components
6. Remove Material-UI dependencies
7. Update documentation
8. Final testing and polish

## 📚 Resources

- [Chakra UI Docs](https://chakra-ui.com/docs/getting-started)
- [iOS Design Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios)
- [Chakra UI Recipes](https://chakra-ui.com/docs/components)
- [Migration Guide](https://chakra-ui.com/docs/migration)
