import FAQClient from "./FAQClient"; import {createClient} from "@/lib/supabase/server"; import {FAQS} from "@/lib/content";
export default async function FAQSection(){const s=await createClient();const{data}=await s.from("faqs").select("*").eq("is_active",true).order("display_order");return <FAQClient faqs={data?.length?data:FAQS.map((f,i)=>({...f,id:String(i)}))}/>;}
