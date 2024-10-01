import { ModalStatusId } from "../App";

type ModalContentProps = {
  modalStatusId: ModalStatusId;
  onSelectDifficulty: () => void;
};

export function ModalContent({
  modalStatusId,
  onSelectDifficulty,
}: ModalContentProps) {
  switch (modalStatusId) {
    case "welcome":
      return (
        <>
          <p>Welcome to my game!</p>
          <button onClick={onSelectDifficulty}>Close</button>
        </>
      );
    case "loading":
      // Return loading modal
      break;
    case "lost":
      // Return lost modal
      break;
    case "won":
      // Return won modal
      break;
    default:
      throw new Error("Invalid modal id");
  }
}
