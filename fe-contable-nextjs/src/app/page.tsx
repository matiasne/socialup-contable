"use clietn";
import Image from "next/image";
import { Inter } from "next/font/google";
import FormLogin from "./page/login/page";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <FormLogin />;
}
