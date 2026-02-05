"use client"
import React from "react";
import { createPortal } from "react-dom";
import { ReactNode, useEffect, useState, useRef} from "react";

type Props = {
  children: ReactNode
  handleShowPortal: React.MouseEventHandler<HTMLDivElement>
  showPortal: boolean
};

function NavbarMenu({ children, handleShowPortal, showPortal }: Props) {

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>)=>{
      const target = (e.target as HTMLDivElement).id;
        if(target == "containerRelative"){
            handleShowPortal(e)
        }
     }

  return (
    <div data-testid="navbar-menu" id="containerRelative" onClick={handleCloseModal} tabIndex={1} className={`fixed inset-0 z-40 transition-opacity transition-colors duration-300 ${showPortal ? 'opacity-100 pointer-events-auto bg-black/20' : 'opacity-0 pointer-events-none'}`}>
      <div className={`absolute top-0 left-0 h-screen z-50 bg-white px-3 py-5 w-1/2 sm:w-1/3 md:w-1/3 transform transition-transform duration-300 ${showPortal ? 'translate-x-0' : '-translate-x-full'}`}>
        {children}
      </div>
    </div>
  )
}

const NavMenuPortal = ({ children, handleShowPortal, showPortal }: Props) => {
    const elementRoot: React.MutableRefObject<Element | DocumentFragment | null> = useRef(null)
/*  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
 */
 useEffect(()=>{
  const rootElement = document.getElementById('root') || document.body
  elementRoot.current = rootElement
 },[])

  return elementRoot.current ? createPortal(
    <NavbarMenu handleShowPortal={handleShowPortal} showPortal={showPortal}>{children}</NavbarMenu>, elementRoot.current
    ) : null;
};

export default NavMenuPortal;
