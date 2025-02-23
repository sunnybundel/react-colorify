import React from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactPortal | null => {
  return document.body ? createPortal(<>{children}</>, document.body) : null;
};

export default ModalPortal;
