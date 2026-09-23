import { Link } from "react-router";
import { currentStudent } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col items-center pt-2 px-4">
        <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-6">
          <p className="mb-4 font-semibold text-foreground">
            ระบบลงทะเบียนเรียน CPE & ISNE
          </p>
          <Link
            to="/enrollment"
            className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition hover:bg-primary/80">
            ไปหน้าลงทะเบียนเรียน
          </Link>
        </div>

        <p className="text-blue-500 text-sm mt-6">
          จัดทำโดย {currentStudent.firstName} {currentStudent.lastName} รหัสนักศึกษา {currentStudent.studentId}
        </p>
      </div>
    </>
  );
}
