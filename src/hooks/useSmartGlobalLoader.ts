import { useState, useEffect, useRef } from "react";
import { useIsFetching } from "@tanstack/react-query";

interface UseSmartGlobalLoaderOptions {
  showDelay?: number; // Delay before showing loader to avoid flashing
  minShowTime?: number; // Minimum time to show loader for better UX
  showOnInitialLoad?: boolean; // Show loader on app initial load
  initialLoadDelay?: number; // How long to show initial load
  debug?: boolean; // Enable debug logging
}

export const useSmartGlobalLoader = (
  options: UseSmartGlobalLoaderOptions = {}
) => {
  const {
    showDelay = 200, // 200ms delay before showing
    minShowTime = 500, // Show for at least 500ms
    showOnInitialLoad = true,
    initialLoadDelay = 1000, // 1 second for initial app load
    debug = false,
  } = options;

  const isFetching = useIsFetching();
  const [isLoading, setIsLoading] = useState(showOnInitialLoad);
  const [showStartTime, setShowStartTime] = useState<number | null>(null);
  const [hasShownInitialLoad, setHasShownInitialLoad] = useState(false);

  const showTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isShowingRef = useRef(showOnInitialLoad);
  const fetchingRef = useRef(isFetching);

  const log = (message: string, data?: unknown) => {
    if (debug) {
      console.log(`[SmartGlobalLoader] ${message}`, data || "");
    }
  };

  useEffect(() => {
    isShowingRef.current = isLoading;
    fetchingRef.current = isFetching;
    log(`State updated - isLoading: ${isLoading}, isFetching: ${isFetching}`);
  });

  const clearAllTimers = () => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
      log("Cleared show timer");
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
      log("Cleared hide timer");
    }
  };

  useEffect(() => {
    if (showOnInitialLoad && !hasShownInitialLoad) {
      log(`Starting initial load delay: ${initialLoadDelay}ms`);
      const timer = setTimeout(() => {
        log("Initial load timeout completed");
        setHasShownInitialLoad(true);
        if (isFetching === 0) {
          setIsLoading(false);
          isShowingRef.current = false;
          log("No fetching during initial load, hiding loader");
        }
      }, initialLoadDelay);

      return () => clearTimeout(timer);
    }
  }, [showOnInitialLoad, hasShownInitialLoad, initialLoadDelay, isFetching]);

  useEffect(() => {
    if (showOnInitialLoad && !hasShownInitialLoad) {
      log("Skipping - still in initial load phase");
      return;
    }

    log(
      `Processing state change - isFetching: ${isFetching}, isShowing: ${isShowingRef.current}`
    );

    clearAllTimers();

    if (isFetching > 0) {
      if (!isShowingRef.current) {
        log(`Setting show timer: ${showDelay}ms`);
        showTimerRef.current = setTimeout(() => {
          log("Show timer fired - displaying loader");
          setIsLoading(true);
          setShowStartTime(Date.now());
          isShowingRef.current = true;
        }, showDelay);
      } else {
        log("Already showing, no action needed");
      }
    } else if (isFetching === 0 && isShowingRef.current) {
      const now = Date.now();
      const showDuration = showStartTime ? now - showStartTime : 0;
      const remainingTime = Math.max(0, minShowTime - showDuration);

      log(
        `Setting hide timer: ${remainingTime}ms (shown for ${showDuration}ms)`
      );

      hideTimerRef.current = setTimeout(() => {
        if (fetchingRef.current === 0) {
          log("Hide timer fired - hiding loader");
          setIsLoading(false);
          setShowStartTime(null);
          isShowingRef.current = false;
        } else {
          log("Hide timer fired but new fetching detected, keeping loader");
        }
      }, remainingTime);
    }

    return clearAllTimers;
  }, [
    isFetching,
    showDelay,
    minShowTime,
    showStartTime,
    hasShownInitialLoad,
    showOnInitialLoad,
    log,
    clearAllTimers,
  ]);

  useEffect(() => {
    return () => {
      log("Component unmounting, clearing timers");
      clearAllTimers();
    };
  }, []);

  const showLoader = () => {
    log("Manual show loader triggered");
    clearAllTimers();
    setIsLoading(true);
    setShowStartTime(Date.now());
    isShowingRef.current = true;
  };

  const hideLoader = () => {
    log("Manual hide loader triggered");
    clearAllTimers();
    setIsLoading(false);
    setShowStartTime(null);
    isShowingRef.current = false;
  };

  return {
    isLoading,
    isFetching: isFetching > 0,
    activeFetchCount: isFetching,
    showLoader,
    hideLoader,
  };
};

/**
 * Fast loader - minimal delays, good for quick operations
 */
export const useSmartGlobalLoaderFast = () => {
  return useSmartGlobalLoader({
    showDelay: 100,
    minShowTime: 300,
    showOnInitialLoad: true,
    initialLoadDelay: 500,
  });
};

/**
 * Smooth loader - balanced delays for good UX
 */
export const useSmartGlobalLoaderSmooth = () => {
  return useSmartGlobalLoader({
    showDelay: 200,
    minShowTime: 500,
    showOnInitialLoad: true,
    initialLoadDelay: 1000,
  });
};

/**
 * Patient loader - longer delays, good for slower connections
 */
export const useSmartGlobalLoaderPatient = () => {
  return useSmartGlobalLoader({
    showDelay: 300,
    minShowTime: 800,
    showOnInitialLoad: true,
    initialLoadDelay: 1500,
  });
};

/**
 * Data-only loader - no initial load, only tracks data fetching
 */
export const useSmartGlobalLoaderDataOnly = () => {
  return useSmartGlobalLoader({
    showDelay: 200,
    minShowTime: 500,
    showOnInitialLoad: false,
    initialLoadDelay: 0,
  });
};

/**
 * Debug version - helps identify loader behavior issues
 */
export const useSmartGlobalLoaderDebug = () => {
  return useSmartGlobalLoader({
    showDelay: 200,
    minShowTime: 500,
    showOnInitialLoad: true,
    initialLoadDelay: 1000,
    debug: true,
  });
};
