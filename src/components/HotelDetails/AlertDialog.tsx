import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";

export function AlertDialogDemo({ cancelBook, roomId, type }: { cancelBook: Function; roomId: number; type: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="px-14 xl:px-16 bg-red-600 hover:bg-red-500 self-start md:self-end">Cancel</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Booking Cancellation Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel your booking for <span className="font-semibold">{type}</span> room? <br /> This action may not be reversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => cancelBook(roomId)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
