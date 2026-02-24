export default function Skeleton({
  width = "100%",
  height = "1rem",
  borderRadius = "4px",
  padding = "0px",
}) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, padding }}
    />
  );
}
