import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { UserRoundPlus } from "lucide-react";
import { currentStudent } from "@/lib/mock-data";
import type { Course } from "@/lib/types";

type RegisterDialogProps = {
  availableCourses: Course[];
  onConfirm?: (courseId: string, selectedTime: string) => void;
};

export function RegisterDialog({ availableCourses, onConfirm }: RegisterDialogProps) {
  const [fullName, setFullName] = useState(
    `${currentStudent.firstName} ${currentStudent.lastName}`
  );
  const [time, setTime] = useState("09:15");
  const [program, setProgram] = useState(currentStudent.program);

  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    setFullName(`${currentStudent.firstName} ${currentStudent.lastName}`);
    setProgram(currentStudent.program);
  }, []);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    if (!courseId) {
      setOpen(false);
      return;
    }

    onConfirm?.(courseId, time);
    setCourseId(""); // เคลียร์ฟอร์ม
    setOpen(false); // ปิด Dialog
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger>
        <Button disabled={availableCourses.length === 0}>
          <UserRoundPlus size={5} />
          ลงทะเบียน
        </Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>กรอกข้อมูลเพื่อลงทะเบียน</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="course">วิชา</Label>
            <Select value={courseId} onValueChange={(value) => setCourseId(value ?? "")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="เลือกวิชา" />
              </SelectTrigger>
              <SelectContent>
                {availableCourses.map((course) => (
                  <SelectItem key={course.courseId} value={course.courseId}>
                    {course.courseId} - {course.courseTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">เวลา</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ นศ.</Label>
            <Input id="fullName" value={fullName} readOnly />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input id="program" value={program} readOnly />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={!courseId}
              className="w-full bg-black text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            >
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
