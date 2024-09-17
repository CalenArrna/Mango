import Button from "./Button";

function AddButton({ onClick, disabled = false }) {
  return (
    <div className="flex justify-center items-center">
      <Button onClick={onClick} disabled={disabled} type="flat">
        ➕
      </Button>
    </div>
  );
}

export default AddButton;
