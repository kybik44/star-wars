import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const useResponsive = () => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const getBreakpoint = () => {
    if (isXs) return "xs";
    if (isSm) return "sm";
    if (isMd) return "md";
    if (isLg) return "lg";
    if (isXl) return "xl";
    return "md";
  };

  const getNavigationHeight = () => {
    const breakpoint = getBreakpoint();
    return `var(--navigation-height-${breakpoint})`;
  };

  const getNavigationPadding = () => {
    const breakpoint = getBreakpoint();
    return `var(--navigation-padding-${breakpoint})`;
  };

  const getLogoSize = () => {
    const breakpoint = getBreakpoint();
    return `var(--logo-size-${breakpoint})`;
  };

  const getNavigationIconSize = () => {
    const breakpoint = getBreakpoint();
    return `var(--navigation-icon-size-${breakpoint})`;
  };

  const getNavigationLinkWidth = () => {
    const breakpoint = getBreakpoint();
    return `var(--navigation-link-width-${breakpoint})`;
  };

  const getNavigationGap = () => {
    const breakpoint = getBreakpoint();
    return `var(--navigation-gap-${breakpoint})`;
  };

  const getTitleSize = () => {
    const breakpoint = getBreakpoint();
    return `var(--title-size-${breakpoint})`;
  };

  const getLabelSize = () => {
    const breakpoint = getBreakpoint();
    return `var(--label-size-${breakpoint})`;
  };

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isMobile,
    isTablet,
    isDesktop,
    getBreakpoint,
    getNavigationHeight,
    getNavigationPadding,
    getLogoSize,
    getNavigationIconSize,
    getNavigationLinkWidth,
    getNavigationGap,
    getTitleSize,
    getLabelSize,
  };
};
