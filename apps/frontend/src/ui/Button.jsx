function Button({ children, onClick, type = "primary", disabled = false }) {
  const base =
    "rounded-lg px-4 py-1 text-center font-semibold uppercase text-white ";
  const styles = {
    primary: base + "bg-amber-400 hover:bg-amber-500",
    secondary: base + "bg-lime-400 hover:bg-lime-500",
  };
  return (
    <button className={styles[type]} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
