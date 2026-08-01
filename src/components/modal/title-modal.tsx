import { X } from "lucide-react";
import type { ReactNode } from "react";
import { IconButton } from "../button";
import { Text } from "../text";
import { useModalContext } from "./context-modal";
import * as styles from "./title-modal.css";

interface ModalTitleProps {
  children: ReactNode;
}

export function ModalTitle({ children }: ModalTitleProps) {
  const { titleId, state } = useModalContext();
  const { close } = state;

  return (
    <div className={styles.wrapper}>
      <Text id={titleId} variant="headlineSmall">
        {children}
      </Text>
      <IconButton onPress={close} aria-label="close button">
        <X />
      </IconButton>
    </div>
  );
}
