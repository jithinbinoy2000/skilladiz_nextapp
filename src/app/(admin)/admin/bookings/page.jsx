import BookingCalendar from "@/components/admin/BookingCalendar";

export const metadata = {
  title: "Bookings — Skilladiz Admin",
};

export default function BookingsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
          Booking Calendar
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View and manage all bookings. Click any date to drill into hourly slots.
          Mark dates as shop closed to block public bookings.
        </p>
      </div>
      <BookingCalendar />
    </div>
  );
}
