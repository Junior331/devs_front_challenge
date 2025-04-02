import { Button } from "@/app/components/atoms";
import { useRouter } from "next/navigation";
import { AlertMessageType } from "./@types";

export function AlertMessage({ type, title, message }: AlertMessageType) {
  const router = useRouter();

  return (
    <div className="flex items-center flex-col m-auto ">
      <div
        className={`flex w-[100px] h-[100px] flex-col justify-center items-center aspect-square rounded-full ${
          type === "success" ? "bg-[#16A34A]" : "bg-[#FF0000] p-5"
        }`}
      >
        {type === "success" ? (
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 12L18 34L8 24"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                fill="#fff"
              ></path>
            </g>
          </svg>
        )}
      </div>
      <h2 className="text-[#18181B] text-center font-[Segoe UI] text-[36px] font-semibold leading-normal">
        {title}
      </h2>

      <p className="text-[#71717A] text-center font-[Segoe UI] text-[24px] font-normal leading-normal max-w-[500px]">
        {message}
      </p>

      <Button
        fullWidth
        type="button"
        onClick={() => router.push("/auth/login")}
        className="flex items-center justify-center gap-2 max-w-52 w-full px-4 py-5 mt-7"
      >
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.50004 12.6666L3.83337 7.99992M3.83337 7.99992L8.50004 3.33325M3.83337 7.99992H13.1667"
            stroke="white"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Voltar
      </Button>
    </div>
  );
}
