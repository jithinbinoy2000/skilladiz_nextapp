// Primary auth button style.
export default function AuthButton({ children, variant = "primary", ...props }) {
  const base =
    "w-full rounded-full px-6 py-3 text-xs uppercase tracking-[0.2em] transition";
  const styles =
    variant === "outline"
      ? "border border-white/20 text-white hover:bg-white/10"
      : "bg-pink text-black hover:bg-pink/90";

  return (
    <button {...props} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
