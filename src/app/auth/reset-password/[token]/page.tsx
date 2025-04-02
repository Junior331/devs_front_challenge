"use client";
import { use } from 'react';

import { NewPasswordForm } from "@/app/components/organisms";

type Params = Promise<{ token: string }>

export default function ResetPasswordTokenPage(props: { params: Params }) {
  const params = use(props.params);
  const token = params.token;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="w-[300px] h-[300px] rotate-[74.115deg] aspect-square absolute left-[20px] top-[20px] rounded-full bg-[radial-gradient(84.4%_84.4%_at_27.78%_24.07%,_#BBF7D0_0%,_#22C55E_60.46%,_#15803D_79.62%,_#14532D_100%)]" />

      <div className="w-full space-y-8 relative z-10">
        <NewPasswordForm token={token} />
      </div>

      <div className="w-[150px] h-[150px] rotate-[154.201deg] aspect-square absolute left-[53.498px] bottom-[81.171px] rounded-full bg-[radial-gradient(84.4%_84.4%_at_27.78%_24.07%,_#BBF7D0_0%,_#22C55E_60.46%,_#15803D_79.62%,_#14532D_100%)]" />

      <div className="w-[400px] h-[400px] aspect-square absolute right-[-95px] bottom-[-89px] rounded-full bg-[radial-gradient(84.4%_84.4%_at_27.78%_24.07%,_#BBF7D0_0%,_#22C55E_60.46%,_#15803D_79.62%,_#14532D_100%)]" />
    </div>
  );
}