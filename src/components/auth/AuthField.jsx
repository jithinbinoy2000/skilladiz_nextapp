// Small input component for auth forms.
export default function AuthField({ label, ...props }) {
  return (
    <label className="block text-sm text-white/70">
      {label}
      <input
        {...props}
        className="mt-2 w-full rounded-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
      />
    </label>
  );
}
