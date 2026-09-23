import { currentStudent } from "@/lib/mock-data";

export default function Footer() {
  return (
    <footer className="w-full shrink-0 border-t text-center">
      <p className="m-0 p-4 text-sm text-muted-foreground">
        จัดทำโดย {currentStudent.firstName} {currentStudent.lastName} รหัสนักศึกษา{" "}
        {currentStudent.studentId}
      </p>
    </footer>
  );
}