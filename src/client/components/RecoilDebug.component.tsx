import React, { useEffect, useMemo } from "react";
import { useRecoilSnapshot } from "recoil";

const RecoilDebug: React.FC = () => {
  const snapshot = useRecoilSnapshot();

  const nodes = useMemo(() => {
    return Array.from(snapshot.getNodes_UNSTABLE({ isModified: true })).map((node) => {
      const { state, contents, ...loadable } = snapshot.getLoadable(node);
      return { _key: node.key, ...contents, ...loadable };
    });
  }, [snapshot]);

  useEffect(() => {
    nodes.forEach((node) => console.table(node));
  }, [nodes]);

  return null;
};

export default RecoilDebug;
