"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Container from "./Container";

export default function Section({children,className="",id}:{children:ReactNode;className?:string;id?:string}) {
  const ref=useRef<HTMLElement>(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const element=ref.current;
    if(!element)return;
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){setVisible(true);return;}
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){setVisible(true);observer.unobserve(element);}
    },{threshold:.12,rootMargin:"0px 0px -60px 0px"});
    observer.observe(element);
    return()=>observer.disconnect();
  },[]);
  return <section ref={ref} id={id} className={`kaytech-reveal py-16 md:py-24 ${visible?"kaytech-reveal-visible":""} ${className}`}><Container>{children}</Container></section>;
}
