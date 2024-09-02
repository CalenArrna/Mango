function PriorityIcon({ priority }) {
  if (!priority) return <span>⁇</span>;

  const priorities = {
    low: "🟢",
    medium: "🟠",
    high: "🔴",
  };

  return <span>{priorities[priority]}</span>;
}

export default PriorityIcon;
