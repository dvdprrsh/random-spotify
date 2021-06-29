import qs, { ParsedQs } from "qs";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQuery = <T extends ParsedQs = ParsedQs>(): T => {
  const location = useLocation();
  const parsed = useMemo(() => qs.parse(location.search.replace("?", "")) as T, [location.search]);

  return parsed;
};

export default useQuery;
