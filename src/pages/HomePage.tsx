import { Link } from "react-router";
import { currentStudent } from "@/lib/mock-data";

export default function HomePage() {
  return(
    <>
    <div className="flex flex-col items-center pt-2 px-4">
      <div className="w-full max-w-2xl rounded-xl border border-gray-200 p-6">
          <p className="font-semibold text-gray-900 mb-4">
            ระบบลงทะเบียนเรียน CPE & ISNE
          </p>
          <Link
            to="/enrollment"
            className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-500 transition">
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
