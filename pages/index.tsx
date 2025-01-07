import { Footer, FooterDark } from "@/components/footer";
import Header from "@/components/header";
import { ProgressSpinner } from 'primereact/progressspinner';
import Section from "@/components/section";
import Services from "@/components/services";
import { NiceViewer } from "@/components/widgets/niceviewer";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { GiVibratingShield } from "react-icons/gi";
import { IoMdWarning } from "react-icons/io";
import { SiHomeadvisor, SiNicehash } from "react-icons/si";
import { getMLink, getUser, getXLink } from "./utils/utils";
import useUser from "@/stores/userstore";
import { DBUser } from "./api/userdata/user";
import { Toolbar } from "@/components/toolbar";
import { MosaicCard } from "@/components/widgets/card";
import { FaBlog } from "react-icons/fa";
import { MdMapsHomeWork, MdSell } from "react-icons/md";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef<HTMLDivElement>(null);

  // handle scroll event
  const handleScroll = (elTopOffset: number, elHeight: number) => {
    if (window.scrollY > (elTopOffset + elHeight)) {
      setSticky({ isSticky: true, offset: elHeight });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (getXLink().length > 0 && getMLink().length > 0) {
      setLoading(true);
      getUser().then((response) => {
        if (response == 'string') {
          // delXLink()
          // delMLink()
        } else {
          console.log(response)
          useUser.setState(response as DBUser);
          localStorage.setItem("user", JSON.stringify(response))
        }
        setLoading(false);
      })
    } else {
      setLoading(false)
    }
    const handleScrollEvent = () => {
      handleScroll(0, window.innerHeight / 3)
    }
    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, [])

  return (

    <div
      className={`${geistSans.variable} ${geistMono.variable}  flex h-full justify-center  flex-col items-center`}
    >
      {loading ? (<div className="w-screen h-screen gap-y-5 flex items-center flex-col justify-center">
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--background)" animationDuration=".5s" />
        loading..</div>
      ) : (<>

        <Toolbar className={`${sticky.isSticky ? 'fixed top-0 w-full transition-all 1s forwards' : 'hidden'}
        `} ref={headerRef} />
        <div className="bg-secondary">
          <div className="w-full bg-hero bg-no-repeat bg-cover backdrop-blur-lg flex justify-center    flex-col items-center">
            <div className="relative w-full bg-[#00000099] flex justify-center">
              <div className=" absolute bg-gradient-to-b from-black to-transparent h-72 top-0 left-0 right-0" />
              <Header />
            </div>
          </div>
        </div>
        <div className="bg-secondary w-full flex justify-center">
          <div className='grid grid-cols-4 w-full bg-secondary p-5 2xl:w-3/4 mt-12 mb-12'>
            <MosaicCard Icon={<FaBlog size={50} />} hint='Upload Blog And Make Money'
              Summary='Become a blogger and upload your content here. You can monetize your blog or publish it at a cost that you deem necessary.' />
            <MosaicCard Icon={<MdSell size={50} />} hint='Are you a Seller?'
              Summary='Our platform is designed for sellers like you. Join us to reach a wider audience and maximize your sales potential.' />
            <MosaicCard Icon={<MdMapsHomeWork size={50} />} hint='Sell Your Homes or Cars'
              Summary='Our platform offers the best way to sell your homes or cars. Reach a wider audience and get the best deals.' />
            <MosaicCard Icon={<FaBlog size={50} />} hint='Play Games to Earn Money'
              Summary='Engage in exciting games on our platform and earn money while having fun. Turn your gaming skills into a profitable venture.' />
          </div>
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
        <FooterDark className="w-full bg-black p-3 flex items-center justify-center" /></>)
      }
    </div >
  );
}
