"use client"
import React from "react";
import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode
  handleShowPortal: React.MouseEventHandler<HTMLDivElement>
  showPortal: boolean
};

function NavbarMenu({ children, handleShowPortal, showPortal }: Props) {

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>)=>{
      const target = e.currentTarget.id 
        if(target == "containerRelative"){
            handleShowPortal(e)
        }
     }

  return <div id="containerRelative" onClick={handleCloseModal} tabIndex={1} className={ showPortal ? "transition ease-in-out delay-50 duration-300 absolute w-full top-0 h-screen z-40 bg-black/20" : "transition ease-in-out delay-50 duration-300"}>
        <div className={showPortal ? "transition ease-in-out delay-300 duration-300 absolute px-3 py-5 w-1/2 bg-white h-screen z-50 left-0 top-0 sm:w-1/3 md:w-1/3" : "transition ease-in-out delay-300 duration-300 absolute px-3 py-5 w-1/2 bg-white h-screen z-50 -left-full top-0 sm:w-1/3 md:w-1/3"}>
              {children}</div>
  </div>
}

const NavMenuPortal = ({ children, handleShowPortal, showPortal }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set the isClient state to true when the component mounts on the client-side
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return null on the server-side rendering
    return null;
  }

  return createPortal(
    <NavbarMenu handleShowPortal={handleShowPortal} showPortal={showPortal}>{children}</NavbarMenu>,
    document.getElementById("root")!
  );
};

export default NavMenuPortal;
