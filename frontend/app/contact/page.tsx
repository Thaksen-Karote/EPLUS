"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import HeroSlideshow from '@/components/HeroSlideshow';
import { heroImagesByPage } from '@/data/hero-images';
import SectionWrapper from "@/components/SectionWrapper";
import { submitContactForm } from "@/lib/api";
import { ContactFormData } from "@/types";
import {User,Mail,Phone,Building2,MessageSquare,Info,Send,Clock,MapPin,} from "lucide-react";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") || searchParams.get("subject") || "";

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: serviceParam ? `Enquiry about ${serviceParam}` : "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (serviceParam) {
      setFormData((prev) => ({
        ...prev,
        subject: `Enquiry about ${serviceParam}`,
      }));
    }
  }, [serviceParam]);

  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash !== "#message") return;
    const t = window.setTimeout(() => {
      document.getElementById("message")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
    return () => window.clearTimeout(t);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setSubmitStatus("success");
        setFormData({name: "", email: "", phone: "", company: "", subject: "", message: "",});
        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <HeroSlideshow
        images={heroImagesByPage.contact}
        ariaLabel="Contact hero"
        title="Get in Touch"
        subtitle="Have a project in mind? Let's discuss how we can help"
        showScrollHint
      />

      {/* Contact Form & Info */}
      <SectionWrapper
        id="message"
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out with any questions or project inquiries."
        bgColor="dark"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-slate-200 rounded-lg shadow-md p-8 space-y-6"
            >
              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Full Name *"
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 placeholder:text-slate-400 shadow-[inset_0_2px_6px_rgba(0,0,0,0.08)]  focus:ring-2 focus:ring-[var(--color-tertiary)] outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email Address *"
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 placeholder:text-slate-400 shadow-[inset_0_2px_6px_rgba(0,0,0,0.08)]  focus:ring-2 focus:ring-[var(--color-tertiary)] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phone + Company */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Phone Number *"
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 placeholder:text-slate-400 shadow-[inset_0_2px_6px_rgba(0,0,0,0.08)]  focus:ring-2 focus:ring-[var(--color-tertiary)] outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 placeholder:text-slate-400 shadow-[inset_0_2px_6px_rgba(0,0,0,0.08)]  focus:ring-2 focus:ring-[var(--color-tertiary)] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Mention Subject"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 placeholder:text-slate-400 shadow-[inset_0_2px_6px_rgba(0,0,0,0.08)]  focus:ring-2 focus:ring-[var(--color-tertiary)] outline-none transition-all"
                />
              </div>

              {/* Message */}
              <div className="relative scroll-mt-28">
                <Info className="absolute left-3 top-4 w-5 h-5 text-slate-500" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={serviceParam ? `Ask question about ${serviceParam}` : "Ask us your question..."}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 placeholder:text-slate-400 shadow-[inset_0_2px_6px_rgba(0,0,0,0.08)]  focus:ring-2 focus:ring-[var(--color-tertiary)] outline-none transition-all"
                />
              </div>

              {/* Status */}
              {submitStatus === "success" && (<div className="p-4 bg-green-100 text-green-700 rounded-lg"> Message sent successfully!</div>)}

              {submitStatus === "error" && (<div className="p-4 bg-red-100 text-red-700 rounded-lg">Something went wrong. Try again.</div>)}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white-800 backdrop-blur-md bg-white/40 border border-transparent before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-[var(--color-secondary)] before:to-[var(--color-tertiary)] before:p-[1px] before:-z-10 hover:scale-[1.02]  hover:from-[var(--color-primary)] hover:to-[var(--color-quaternary)]transition-all duration-300 ease-out"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2"> Sending... <Send className="w-5 h-5 animate-pulse" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send className="w-5 h-5  rotate-0 transition-transform duration-300 ease-out  group-hover:rotate-45"/>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
         <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-3">
           <h3 className="text-xl font-bold text-slate-800">Contact Information</h3>
         
           {/* Item */}
           <div className="group flex items-start gap-4 p-3 rounded-lg transition-all duration-300">
             <MapPin className="w-12 h-12 text-[var(--color-primary)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 " />
         
             <div>
               <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Address</p>
               <p className="text-slate-600">
                 512-514, Paras Trade Centre, Gwal Pahari, Gurugram, Haryana-122003
               </p>
             </div>
           </div>
         
           {/* Item */}
           <div className="group flex items-start gap-4 p-3 rounded-lg transition-all duration-300">
             <Phone className="w-6 h-6 text-[var(--color-secondary)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
             <div>
               <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Phone</p>
               <p className="text-slate-600">
                 +91-9818549687
               </p>
             </div>
           </div>
         
           {/* Item */}
           <div className="group flex items-start gap-4 p-3 rounded-lg transition-all duration-300">
             <Mail className="w-6 h-6 text-[var(--color-tertiary)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
             <div>
               <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Email</p>
               <p className="text-slate-600">
                 director@engineeringplus.co.in
               </p>
             </div>
           </div>
         
           {/* Item */}
           <div className="group flex items-start gap-4 p-3 rounded-lg transition-all duration-300">
             <Clock className="w-6 h-6 text-[var(--color-quaternary)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
             <div>
               <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Business Hours</p>
               <p className="text-slate-600">Mon - Sat: 10:00 AM - 6:00 PM</p>
               {/* <p className="text-slate-600">Sat: 10:00 AM - 4:00 PM</p> */}
             </div>
           </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Map Section */}
      {/* <SectionWrapper
        title="Find Us"
        subtitle="Visit our office in Pune"
        bgColor="gray"
      >
        <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center text-gray-600 text-lg">
          Map Embed Placeholder
        </div>
      </SectionWrapper> */}
    </main>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
