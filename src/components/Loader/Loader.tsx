import { useEffect } from "react";
import { useIsOnline } from "react-use-is-online";

export default function Loader() {
  const { isOnline } = useIsOnline();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    sessionStorage.setItem("loader", "true");
    return () => {
      document.body.style.overflow = "auto";
      sessionStorage.removeItem("loader");
    };
  }, []);

  return (
    <>
      {isOnline && (
        <div className="bg-neutral-50 fixed inset-0 z-20 bg-opacity-80 flex justify-center items-center">
          <div className="w-20 h-20 rounded-full border-[10px] border-t-popover border-main-color animate-spin mr-3"></div>
        </div>
      )}
    </>
  );
}
