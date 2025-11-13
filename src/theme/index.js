import { extendTheme } from '@chakra-ui/react';

// iOS-inspired color palette
const colors = {
  brand: {
    50: '#E6F2FF',
    100: '#CCE5FF',
    200: '#99CBFF',
    300: '#66B0FF',
    400: '#3396FF',
    500: '#007AFF', // iOS blue
    600: '#0062CC',
    700: '#004999',
    800: '#003166',
    900: '#001933',
  },
  ios: {
    blue: '#007AFF',
    green: '#34C759',
    orange: '#FF9500',
    red: '#FF3B30',
    yellow: '#FFCC00',
    gray: '#8E8E93',
    lightGray: '#F2F2F7',
    systemBackground: '#FFFFFF',
    secondaryBackground: '#F2F2F7',
  },
};

// iOS-style component overrides
const components = {
  Button: {
    baseStyle: {
      fontWeight: '600',
      borderRadius: '10px',
    },
    variants: {
      solid: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
          transform: 'scale(0.98)',
        },
        _active: {
          bg: 'brand.700',
        },
      },
      ghost: {
        _hover: {
          bg: 'ios.lightGray',
        },
      },
    },
    defaultProps: {
      size: 'md',
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  Input: {
    variants: {
      filled: {
        field: {
          bg: 'ios.lightGray',
          borderRadius: '10px',
          _hover: {
            bg: 'ios.lightGray',
          },
          _focus: {
            bg: 'white',
            borderColor: 'brand.500',
          },
        },
      },
    },
    defaultProps: {
      variant: 'filled',
    },
  },
  Modal: {
    baseStyle: {
      dialog: {
        borderRadius: '14px',
      },
    },
  },
  Alert: {
    baseStyle: {
      container: {
        borderRadius: '10px',
      },
    },
  },
};

const theme = extendTheme({
  colors,
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif`,
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
  },
  radii: {
    base: '10px',
    md: '12px',
    lg: '14px',
    xl: '16px',
  },
  shadows: {
    base: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 2px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 16px rgba(0, 0, 0, 0.1)',
  },
  components,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'ios.secondaryBackground',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
      },
    }),
  },
});

export default theme;
