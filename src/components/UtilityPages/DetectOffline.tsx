import { useEffect } from "react";
import { useIsOnline } from "react-use-is-online";
import { useToast } from "../../hooks/use-toast";
import { MdSignalWifiConnectedNoInternet1 } from "react-icons/md";

export default function DetectOffline() {
  const { isOffline } = useIsOnline();
  const { toast } = useToast();

  const handleInternetConnection = () => {
    if (isOffline) {
      toast({
        variant: "destructive",
        title: "We're offline!",
        description: "opps! Internet is disconnected.",
        duration: 5000,
      });
      document.body.style.overflow = "hidden";
    } else {
      toast({
        title: "We're back online!",
        description: "Hurray! Internet is connected.",
        duration: 5000,
      });
      if (sessionStorage.getItem("loader")) {
        sessionStorage.removeItem("loader");
        window.location.reload();
      }
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    handleInternetConnection();
  }, [isOffline, toast]);

  return (
    <div>
      {isOffline && (
        <div className="fixed z-20 inset-0 flex flex-col items-center justify-center space-y-2 bg-card">
          <MdSignalWifiConnectedNoInternet1 size={150} className="text-gray-400" />
          <div className="text-center space-y-2 container">
            <h3 className="text-md xl:text-4xl font-semibold text-gray-400">You aren't connected to a working internet connection</h3>
            <p className="text-gray-400">Please check your Wi-Fi or mobile data and try again.</p>
          </div>
        </div>
      )}
    </div>
  );
}
