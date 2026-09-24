"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export default function Reveal({children,className="",delay=0}:{children:ReactNode;className?:string;delay?:number}) {
  const ref=useRef<HTMLDivElement>(null);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const element=ref.current;
    if(!element)return;
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){setVisible(true);return;}
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){setVisible(true);observer.unobserve(element);}
    },{threshold:.1,rootMargin:"0px 0px -40px 0px"});
    observer.observe(element);
    return()=>observer.disconnect();
  },[]);
  return <div ref={ref} className={`kaytech-reveal ${visible?"kaytech-reveal-visible":""} ${className}`} style={{"--kaytech-delay":`${delay}ms`} as React.CSSProperties}>{children}</div>;
}
