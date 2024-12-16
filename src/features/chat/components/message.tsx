import { format } from "date-fns";

interface MessageProps {
  isMine?: boolean;
  message: string;
  date: Date;
}

export default function Message({ isMine, date, message }: MessageProps) {
  return (
    <div className={`flex w-full ${isMine ? "justify-end" : ""}`}>
      <div className={`flex max-w-[55%] flex-col gap-2 rounded-lg ${isMine ? "bg-black" : "bg-gray-light"} px-3 py-2`}>
        <p className={`break-all font-regular text-p2 ${isMine ? "text-white" : "text-black"}`}>{message}</p>
        <p className={`font-regular text-p4 ${isMine ? "text-end text-gray-medium" : "text-gray-dark"}`}>
          {format(date, "dd/MM/yyyy, HH:mm")}
        </p>
      </div>
    </div>
  );
}
