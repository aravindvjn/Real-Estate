"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

const ProgressBar = () => {
  const pathname = usePathname(); 

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 500); 

    return () => clearTimeout(timer);
  }, [pathname]); 

  return null;
};

export default ProgressBar;
