"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { MountedCheck } from "@/lib/mounted-check";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LoginModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <MountedCheck>
      <Modal
        title="Login failed!"
        description="This email is already registered. Please use a different email."
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex items-center justify-end w-full pt-6 space-x-2">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Continue
          </Button>
        </div>
      </Modal>
    </MountedCheck>
  );
};
