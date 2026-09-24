import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialForm from "@/components/testimonials/TestimonialForm";
export const metadata: Metadata = { title: "Share Your Experience | Kaytech Web Solutions", description: "Share your experience working with Kaytech Web Solutions.", robots: { index: false, follow: false } };
export default function TestimonialPage() { return <main><Section><SectionHeading eyebrow="CLIENT FEEDBACK" heading="Share your experience with Kaytech." description="Worked with us before? We’d love to hear about your experience. Your testimonial will be reviewed before it is published." /><div className="mx-auto mt-10 max-w-3xl"><TestimonialForm /></div></Section></main>; }