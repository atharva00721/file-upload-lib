import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="h-screen w-full">
      <section id="hero" className="max-w-7xl mx-auto relative">
        <div className="relative flex flex-col items-center w-full px-6">
          <div className="absolute inset-0">
            <div className="absolute inset-0 -z-10 h-[600px] md:h-[90svh] w-full dark:[background:radial-gradient(130%_140%_at_50%_10%,#18181b_40%,#ec4899_100%)] [background:radial-gradient(130%_140%_at_50%_10%,#f8fafc_40%,#ec4899_100%)] rounded-b-xl"></div>
          </div>
        </div>

        <div className="relative z-10 pt-32 max-w-3xl mx-auto h-full w-full flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center mt-20 justify-center gap-5">
            <h1 className="instrument-serif-regular-italic text-5xl md:text-4xl lg:text-5xl xl:text-6xl  tracking-tight text-balance text-center text-foreground w-[90%]">
              File Upload Components
            </h1>
            <p className="text-base hidden sm:block md:text-lg text-center font-medium text-balance leading-relaxed tracking-tight text-foreground max-md:w-[60%]">
              A comprehensive React component library for seamless file uploads.
              Built with TypeScript, Next.js, and Tailwind CSS. Features drag &
              drop, and customizable UI components.
            </p>
            <p className="text-base sm:hidden md:text-lg text-center font-medium text-balance leading-relaxed tracking-tight text-foreground w-[60%]">
              Modern file upload components with drag & drop, progress tracking,
              and beautiful UI.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <p className="text-md font-semibold text-foreground">
                Dodo Payments
              </p>
              <p className="text-sm text-muted-foreground">
                Frontend Internship Submission
              </p>
              <p className="text-sm text-muted-foreground">
                By Atharva Raj Singh Thakur
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <Button
              asChild
              variant="secondary"
              className="w-32 px-5 border border-white"
            >
              <Link href="/demo">Demo</Link>
            </Button>
          </div>
        </div>
      </section>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <Link
          href="https://www.linkedin.com/in/atharvarajthakur/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </Link>
        <Link
          href="https://s.com/codepaglu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </Link>
        <Link
          href="https://github.com/atharva00721"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </Link>
        <Link
          href="https://www.arvie.tech/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
