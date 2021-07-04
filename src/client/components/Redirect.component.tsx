import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  to: string;
}

const Redirect: FC<Props> = ({ to }) => {
  const navigate = useNavigate();
  console.log("here");
  if (typeof window === "undefined") {
    const error = new Error(to);
    error.name = "SSR_REDIRECT";
    throw error;
  } else {
    navigate(to);
  }
  return null;
};

export default Redirect;
