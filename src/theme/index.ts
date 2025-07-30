import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: "dark" as const,
    primary: {
      main: "#ffffff", // var(--color-primary-gold)
      light: "#ffed4e", // var(--color-primary-gold-light)
      dark: "#b8860b", // var(--color-primary-gold-dark)
      contrastText: "#1a1a1a", // var(--color-text-inverse)
    },
    secondary: {
      main: "#2196f3", // var(--color-status-info)
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#ffffff", // var(--color-text-primary)
    },
    background: {
      default: "#0d1117", // var(--color-background-default)
      paper: "#161b22", // var(--color-background-paper)
    },
    text: {
      primary: "#ffffff", // var(--color-text-primary)
      secondary: "#b0b0b0", // var(--color-text-secondary)
      disabled: "#666666", // var(--color-text-disabled)
    },
    error: {
      main: "#f44336", // var(--color-status-error)
    },
    warning: {
      main: "#ff9800", // var(--color-status-warning)
    },
    info: {
      main: "#2196f3", // var(--color-status-info)
    },
    success: {
      main: "#4caf50", // var(--color-status-success)
    },
  },
  typography: {
    fontFamily: "Lexend, Roboto, Helvetica, Arial, sans-serif", // var(--font-family-primary)
    h1: {
      fontSize: "3rem", // var(--font-size-5xl)
      fontWeight: 700, // var(--font-weight-bold)
      lineHeight: 1.25, // var(--line-height-tight)
      letterSpacing: "-0.025em", // var(--letter-spacing-tight)
    },
    h2: {
      fontSize: "2.25rem", // var(--font-size-4xl)
      fontWeight: 600, // var(--font-weight-semibold)
      lineHeight: 1.25, // var(--line-height-tight)
      letterSpacing: "-0.025em", // var(--letter-spacing-tight)
    },
    h3: {
      fontSize: "1.875rem", // var(--font-size-3xl)
      fontWeight: 600, // var(--font-weight-semibold)
      lineHeight: 1.5, // var(--line-height-normal)
    },
    h4: {
      fontSize: "1.5rem", // var(--font-size-2xl)
      fontWeight: 500, // var(--font-weight-medium)
      lineHeight: 1.5, // var(--line-height-normal)
    },
    h5: {
      fontSize: "1.25rem", // var(--font-size-xl)
      fontWeight: 500, // var(--font-weight-medium)
      lineHeight: 1.5, // var(--line-height-normal)
    },
    h6: {
      fontSize: "1.125rem", // var(--font-size-lg)
      fontWeight: 500, // var(--font-weight-medium)
      lineHeight: 1.5, // var(--line-height-normal)
    },
    subtitle1: {
      fontSize: "3rem", // var(--font-size-lg)
      fontWeight: 100, // var(--font-weight-normal)
      lineHeight: 1.5, // var(--line-height-normal)
    },
    subtitle2: {
      fontSize: "1rem", // var(--font-size-md)
      fontWeight: 400, // var(--font-weight-normal)
      lineHeight: 1.5, // var(--line-height-normal)
    },
    body1: {
      fontSize: "1rem", // var(--font-size-md)
      fontWeight: 400, // var(--font-weight-normal)
      lineHeight: 1.75, // var(--line-height-relaxed)
    },
    body2: {
      fontSize: "0.875rem", // var(--font-size-sm)
      fontWeight: 400, // var(--font-weight-normal)
      lineHeight: 1.75, // var(--line-height-relaxed)
    },
    button: {
      fontSize: "0.875rem", // var(--font-size-sm)
      fontWeight: 500, // var(--font-weight-medium)
      textTransform: "none" as const,
      letterSpacing: "0.025em", // var(--letter-spacing-wide)
    },
    caption: {
      fontSize: "0.75rem", // var(--font-size-xs)
      fontWeight: 400, // var(--font-weight-normal)
      lineHeight: 1.5, // var(--line-height-normal)
    },
    overline: {
      fontSize: "0.75rem", // var(--font-size-xs)
      fontWeight: 500, // var(--font-weight-medium)
      textTransform: "uppercase" as const,
      letterSpacing: "0.1em", // var(--letter-spacing-widest)
    },
  },
  shape: {
    borderRadius: 6,
  },
  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", // var(--shadow-small)
    "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", // var(--shadow-medium)
    "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)", // var(--shadow-large)
    "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)", // var(--shadow-xlarge)
    "0 0 20px rgba(255, 215, 0, 0.3)", // var(--shadow-glow)
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
    "none",
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#ffd700 #161b22", // var(--color-primary-gold) var(--color-background-paper)
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: "4px", // var(--border-radius-small)
            backgroundColor: "#ffd700", // var(--color-primary-gold)
            minHeight: "24px",
            border: "2px solid #161b22", // var(--color-background-paper)
          },
          "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
            borderRadius: "4px", // var(--border-radius-small)
            backgroundColor: "#161b22", // var(--color-background-paper)
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "6px", // var(--border-radius-large)
          boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", // var(--shadow-medium)
          transition: "all 0.2s ease-in-out", // var(--transition-normal)
          "&:hover": {
            boxShadow:
              "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)", // var(--shadow-large)
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px", // var(--border-radius-medium)
          textTransform: "none" as const,
          fontWeight: 500, // var(--font-weight-medium)
          transition: "all 0.2s ease-in-out", // var(--transition-normal)
          minHeight: "36px",
          padding: "8px 16px",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        outlined: {
          "&:hover": {
            borderColor: "#ffd700",
            color: "#ffd700",
          },
        },
        contained: {
          "&:hover": {
            backgroundColor: "#ffd700",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "6px", // var(--border-radius-medium)
            transition: "all 0.15s ease-in-out", // var(--transition-fast)
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffd700", // var(--color-primary-gold)
              },
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffd700", // var(--color-primary-gold)
                borderWidth: "2px",
              },
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "6px", // var(--border-radius-medium)
          transition: "all 0.15s ease-in-out", // var(--transition-fast)
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: "1.5rem", // var(--font-size-2xl)
          fontWeight: 700, // var(--font-weight-bold)
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px", // var(--border-radius-medium)
          fontWeight: 500, // var(--font-weight-medium)
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", // var(--shadow-medium)
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          border: "none",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease-in-out", // var(--transition-normal)
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease-in-out", // var(--transition-normal)
          "&:hover": {
            backgroundColor: "rgba(255, 215, 0, 0.1)", // var(--color-primary-gold) with opacity
          },
        },
      },
    },
    // Entity-specific components
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            fontSize: "0.875rem", // var(--font-size-sm)
            fontWeight: 500, // var(--font-weight-medium)
          },
          "& .MuiInputBase-input": {
            fontSize: "1rem", // var(--font-size-md)
          },
          "& .MuiFormHelperText-root": {
            fontSize: "0.75rem", // var(--font-size-xs)
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem", // var(--font-size-sm)
          fontWeight: 500, // var(--font-weight-medium)
          "&.Mui-focused": {
            color: "#ffd700", // var(--color-primary-gold)
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "6px", // var(--border-radius-medium)
          fontSize: "0.875rem", // var(--font-size-sm)
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontSize: "0.75rem", // var(--font-size-xs)
          fontWeight: 500, // var(--font-weight-medium)
          backgroundColor: "#ffd700",
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "& .MuiBreadcrumbItem-root": {
            color: "#ffffff",
          },
          "& .MuiBreadcrumbItem-root:hover": {
            color: "#ffd700",
          },
          "& .MuiBreadcrumbItem-root:active": {
            color: "ffd700",
          },
          "& .MuiBreadcrumbs-separator": {
            margin: "0 4px",
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiPaginationItem-root": {
            transition: "all 0.2s ease-in-out", // var(--transition-normal)
      
            "&:hover": {
              transform: "translateY(-1px)",
            },
            "&.Mui-selected": {
              backgroundColor: "#ffd700", // var(--color-primary-gold)
              color: "#1a1a1a", // var(--color-text-inverse)
              "&:hover": {
                backgroundColor: "#ffed4e", // var(--color-primary-gold-light)
              },
            },
          },
        },
      },
    },
  },
});

export default theme;
