import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import {
  courses,
  currentStudent,
  currentUser,
  enrollments,
} from "@/lib/mock-data";

const initialEnrollments = Object.fromEntries(
  enrollments
    .filter((enrollment) => enrollment.studentId === currentStudent.studentId)
    .map((enrollment) => [enrollment.courseId, enrollment.enrolledAt ?? ""])
);

export default function Enrollent() {
  const [enrolledAtByCourse, setEnrolledAtByCourse] =
    useState<Record<string, string>>(initialEnrollments);

  const handleEnroll = (courseId: string, selectedTime: string) => {
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const enrolledAt = new Date();
    enrolledAt.setHours(hours, minutes, 0, 0);

    setEnrolledAtByCourse((prev) => ({
      ...prev,
      [courseId]: enrolledAt.toISOString(),
    }));
  };

  const handleCancel = (courseId: string) => {
    setEnrolledAtByCourse((prev) => {
      const next = { ...prev };
      delete next[courseId];
      return next;
    });
  };

  const availableCourses = courses.filter(
    (course) => !enrolledAtByCourse[course.courseId]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <p className="text-sm text-muted-foreground mt-1 mb-2">
            {currentUser.nickname} ({currentStudent.studentId})
          </p>
        </div>

        <div className="flex justify-end">
          <RegisterDialog
            availableCourses={availableCourses}
            onConfirm={handleEnroll}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrolledAt = enrolledAtByCourse[course.courseId];
          const isEnrolled = Boolean(enrolledAt);

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              isEnrolled={isEnrolled}
              enrolledAt={
                isEnrolled
                  ? new Intl.DateTimeFormat("th-TH", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(enrolledAt))
                  : undefined
              }
              onCancel={handleCancel}
            />
          );
        })}
      </div>
    </div>
  );
}
