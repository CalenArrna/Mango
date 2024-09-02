function Button({ children, onClick, type = "primary", disabled = false }) {
  const base =
    "rounded-lg px-4 py-1 text-center font-semibold uppercase text-white ";
  const styles = {
    primary: base + "bg-green-500",
    secondary: base + "bg-red-500",
  };
  return (
    <button className={styles[type]} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
