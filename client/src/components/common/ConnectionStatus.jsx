import"./ConnectionStatus.css";
export default function ConnectionStatus({ status = "connected" }) {
  const labels = {
    connected: "Live",
    connecting: "Reconnecting...",
    offline: "Offline",
  };

  return (
    <span className={`conn-status conn-${status}`}>
      <span className="conn-dot" />
      {labels[status]}
    </span>
  );
}