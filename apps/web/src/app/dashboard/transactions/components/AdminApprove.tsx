import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import { EllipsisIcon } from "lucide-react";
import { FC } from "react";
import AlertDialogAprove from "./AlertDialog";
import { Button } from "@/components/ui/button";
import { IStatusTransaction, TRX } from "@/types/transaction.type";
import Image from "next/image";
import useAcceptTransaction from "@/hooks/api/transactions/useAcceptTransaction";
import useRejectTransaction from "@/hooks/api/transactions/useRejectTransaction";

interface ApprovalAdmin extends Partial<TRX> {
  paymentProof: string;
}

const AdminApprove: FC<ApprovalAdmin> = ({ status, paymentProof, id }) => {
  const { accepting } = useAcceptTransaction();
  const { rejecting } = useRejectTransaction();
  const values = { id: Number(id) };
  return (
    <Dialog>
      <DialogTrigger>
        <EllipsisIcon />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction is {status}</DialogTitle>
          <div className="relative h-48 w-48">
            <Image
              src={paymentProof}
              alt="thumbnail"
              fill
              className="rounded-lg object-cover group-hover:rotate-2 group-hover:scale-110 group-hover:transition-all group-hover:duration-500"
            />
          </div>
          <DialogDescription className="flex justify-center gap-4">
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-red-700 hover:bg-red-900 hover:shadow-md">
                    Reject
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Make sure to double check
                      the payment proof.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        rejecting(values);
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-green-700 hover:bg-green-900 hover:shadow-md">
                    Approve
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Make sure to double check
                      the payment proof.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        accepting(values);
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AdminApprove;
