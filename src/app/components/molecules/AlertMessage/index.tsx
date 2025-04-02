import { Button } from "@/app/components/atoms";
import { useRouter } from "next/navigation";
import { AlertMessageType } from "./@types";

export function AlertMessage({ type, title, message }: AlertMessageType) {
  const router = useRouter();

  return (
    <div className="flex max-w-[800px] w-full py-16 px-2 md:px-16 flex-col m-auto items-center gap-6 flex-shrink-0 rounded-[24px] border border-slate-300 bg-[rgba(250,250,250,0.75)] backdrop-blur-[4px]">
      <div className="flex items-center flex-col m-auto ">
        <div
          className={`flex w-[100px] h-[100px] flex-col justify-center items-center aspect-square rounded-full bg-[${
            type === "success" ? "#16A34A" : "#FF0000"
          }]`}
        >
          {type === "success" ? (
            <svg
              width="48"
              height="49"
              viewBox="0 0 48 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33 16.5C33.5523 16.5 34 16.0523 34 15.5C34 14.9477 33.5523 14.5 33 14.5C32.4477 14.5 32 14.9477 32 15.5C32 16.0523 32.4477 16.5 33 16.5Z"
                fill="black"
              />
              <path
                d="M5.172 35.3278C4.4218 36.0778 4.00023 37.0951 4 38.1558V42.4998C4 43.0303 4.21071 43.539 4.58579 43.914C4.96086 44.2891 5.46957 44.4998 6 44.4998H12C12.5304 44.4998 13.0391 44.2891 13.4142 43.914C13.7893 43.539 14 43.0303 14 42.4998V40.4998C14 39.9694 14.2107 39.4607 14.5858 39.0856C14.9609 38.7105 15.4696 38.4998 16 38.4998H18C18.5304 38.4998 19.0391 38.2891 19.4142 37.914C19.7893 37.539 20 37.0303 20 36.4998V34.4998C20 33.9694 20.2107 33.4607 20.5858 33.0856C20.9609 32.7105 21.4696 32.4998 22 32.4998H22.344C23.4048 32.4996 24.422 32.078 25.172 31.3278L26.8 29.6998C29.5797 30.6681 32.6057 30.6644 35.383 29.6893C38.1603 28.7142 40.5244 26.8255 42.0887 24.3321C43.653 21.8387 44.3248 18.8882 43.9942 15.9633C43.6636 13.0384 42.3502 10.3123 40.2689 8.23097C38.1875 6.14961 35.4614 4.8362 32.5365 4.50561C29.6117 4.17502 26.6612 4.84682 24.1677 6.41111C21.6743 7.97541 19.7856 10.3396 18.8105 13.1169C17.8354 15.8942 17.8317 18.9202 18.8 21.6998L5.172 35.3278Z"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M33 16.5C33.5523 16.5 34 16.0523 34 15.5C34 14.9477 33.5523 14.5 33 14.5C32.4477 14.5 32 14.9477 32 15.5C32 16.0523 32.4477 16.5 33 16.5Z"
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
    </div>
  );
}
