import { Footer, FooterDark } from "@/components/footer";
import Header from "@/components/header";

import Section from "@/components/section";
import Services from "@/components/services";
import { NiceViewer } from "@/components/widgets/niceviewer";
import { Geist, Geist_Mono } from "next/font/google";
import { GiVibratingShield } from "react-icons/gi";
import { IoMdWarning } from "react-icons/io";
import { SiHomeadvisor, SiNicehash } from "react-icons/si";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable}  flex bg-foreground flex-col items-center`}
    >
      <div className="  bg-hero bg-no-repeat bg-cover backdrop-blur-lg flex justify-center  bg-[#00000099] flex-col items-center">
        <Header />
      </div>
      <Section />
      <div className="bg-green-200 flex flex-col w-full items-center text-black pt-12 pb-12">
        <span className="text-4xl mulish text-secondary font-extrabold"> Book With Confidence</span>
        <div className=" grid text-secondary grid-cols-4 items-center 2xl:w-3/4 mt-12">
          <NiceViewer hint="Affordability" Icon={<SiNicehash size={45} />} Summary="Our services are affordable as you can book buy and order at the comfort of your seat at home" />
          <NiceViewer hint="Advisor" Icon={<SiHomeadvisor size={45} />} Summary="Contact us for more advising and as complains we would receive and notify to the users" />
          <NiceViewer hint="Ratings" Icon={<GiVibratingShield size={45} />} Summary="We offer rating facilities to deduce and alert users on the house perfomance overally" />
          <NiceViewer hint="Warnings" Icon={<IoMdWarning size={45} />} Summary="False informations such as homes , payments  etc will lead to immediate alert and barn from this platform" />
        </div>
      </div>
      <Services className="w-full 2xl:w-3/4 mt-12 mb-12" />
      <Footer className="mt-12 w-full bg-blue-200 p-3 flex items-center justify-center" />
      <FooterDark className="w-full bg-black p-3 flex items-center justify-center" />
    </div >
  );
}
