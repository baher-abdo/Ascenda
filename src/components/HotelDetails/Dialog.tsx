import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../../components/ui/dialog";
import { X } from "lucide-react";
import { CarouselDemo } from "./Carousel";

type Props = {
  openDialog: boolean;
  setOpenDialog: Function;
  imgSrc: string | string[];
};
export function DialogDemo(props: Props) {
  const { openDialog, setOpenDialog, imgSrc } = props;
  return (
    <Dialog open={openDialog}>
      <DialogContent>
        <DialogTitle className="absolute z-50 right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogTitle>
        <div className="flex items-center justify-center">
          {typeof imgSrc === "string" ? (
            <img src={imgSrc} alt="img" draggable="false" className="md:max-h-[90vh] w-full object-contain" />
          ) : (
            typeof imgSrc === "object" && <CarouselDemo images={imgSrc} />
          )}
        </div>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
