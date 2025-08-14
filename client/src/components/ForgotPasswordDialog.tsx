import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function ForgotPasswordDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="ml-auto cursor-pointer text-sm underline-offset-4 hover:underline">
          Forgot your password?
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Forgot your password</DialogTitle>
          <DialogDescription>
            Please enter the email address you'd like your password reset
            information sent to
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="grid gap-3">
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="eg: johndoe@example.com"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="bg-[#8B5DFF] hover:bg-[#6A42C2] cursor-pointer"
            type="submit"
          >
            Request Reset Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ForgotPasswordDialog;
