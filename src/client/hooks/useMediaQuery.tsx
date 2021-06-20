import { useCallback, useEffect, useState } from "react";

type ReturnType<MatchValue, NoMatchValue> = MatchValue extends undefined
  ? NoMatchValue extends undefined
    ? boolean
    : boolean | NoMatchValue
  : NoMatchValue extends undefined
  ? boolean | MatchValue
  : MatchValue | NoMatchValue;

const useMediaQuery = <MatchValue, NoMatchValue>(mediaQuery: string, matchValue?: MatchValue, noMatchValue?: NoMatchValue): ReturnType<MatchValue, NoMatchValue> => {
  const [match, setMatch] = useState<any>(noMatchValue || false);

  const onMediaQueryMatchChange = useCallback(function (this: MediaQueryList, ev: MediaQueryListEvent) {
    if (ev.matches) return setMatch(matchValue || true);
    setMatch(noMatchValue || ev.matches);
  }, []);

  useEffect(() => {
    const mediaQueryMatch = window.matchMedia(mediaQuery);
    mediaQueryMatch.addEventListener("change", onMediaQueryMatchChange);
  }, []);

  return match;
};

export default useMediaQuery;
