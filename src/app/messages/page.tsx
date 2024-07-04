import HeaderContainer from "@/components/HeaderContainer";
import { ChatLayout } from "@/components/chat/chat-layout";
import { cookies } from "next/headers";
import React from "react";

const page = () => {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  return (
    <HeaderContainer>
      <div className="pt-20 pb-20 w-full">
        <div className="z-10 border rounded-lg w-full h-full text-sm lg:flex">
          <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
        </div>
      </div>
    </HeaderContainer>
  );
};

export default page;
