import { useEffect } from "react";
import { useLocation } from "react-router";

export default function TrackPreviousRoute() {
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem("previousPath", location.pathname);
  }, [location.pathname]);

  return null;
}
