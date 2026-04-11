"use client";

/**
 * Controlled toggle switch — matches the existing Switch.jsx visual style.
 *
 * Usage:
 *   <Toggle checked={form.is_active} onChange={(v) => set("is_active", v)} label="Active" />
 *
 * Props:
 *   checked   boolean         Current state (controlled)
 *   onChange  (bool) => void  Called with new value on click
 *   label     string?         Optional text label rendered after the track
 *   disabled  boolean?        Grays out and prevents interaction
 *   color     "blue"|"green"  Track color when checked (default: "blue")
 */
export default function Toggle({
  checked = false,
  onChange,
  label,
  disabled = false,
  color = "blue",
}) {
  const trackOn =
    color === "green"
      ? "bg-success-500"
      : "bg-brand-500";

  const handleClick = () => {
    if (!disabled && onChange) onChange(!checked);
  };

  return (
    <label
      className={`flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } text-gray-700 dark:text-gray-400`}
      onClick={handleClick}
    >
      {/* Track */}
      <div className="relative shrink-0">
        <div
          className={`block h-6 w-11 rounded-full transition duration-150 ease-linear ${
            checked
              ? trackOn
              : "bg-gray-200 dark:bg-white/10"
          }`}
        />
        {/* Knob */}
        <div
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-theme-sm transition duration-150 ease-linear transform ${
            checked ? "translate-x-full" : "translate-x-0"
          }`}
        />
      </div>
      {label && <span>{label}</span>}
    </label>
  );
}
