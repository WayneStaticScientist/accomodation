import { FC, useEffect, useRef, useState } from "react";
import { SharedProps } from "../niceinput";
import { Page_0 } from "./pages/page_0";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { FaUserCircle } from "react-icons/fa";
import { IoMdHome, IoMdSettings, IoMdNotifications } from "react-icons/io";
import Page_1 from "./pages/page_1";

const Front: FC<SharedProps> = ({ className, page }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
    const handleScroll = (elTopOffset: number, elHeight: number) => {
        if (scrollRef.current!.scrollTop > (elTopOffset + elHeight)) {
            setSticky({ isSticky: true, offset: elHeight });
        } else {
            setSticky({ isSticky: false, offset: 0 });
        }
    };
    const headerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleScrollEvent = () => {
            handleScroll(0, 100)
        }
        scrollRef.current!.addEventListener('scroll', handleScrollEvent);
    }, [])
    return (
        <div className={`${className} p-5 w-full overflow-y-auto`} ref={scrollRef}>
            <div className={`${sticky.isSticky ? 'fixed z-20 top-5 w-full transition-all 1s forwards bg-cards gap-x-20' : 'w-full justify-between'}
            p-3 items-center flex  `} ref={headerRef}>
                <div className="flex gap-x-1 items-center text-gray-500 ">
                    <IoMdHome /> / User /
                    <span className="text-foreground">Dashboard</span>
                </div>
                <div className="flex gap-x-5 items-center ">
                    <FloatLabel>
                        <InputText className="rounded-none p-1 bg-background ring-1 ring-gray-400"
                            id="search" value={""} onChange={() => { }} />
                        <label htmlFor="search">search here</label>
                    </FloatLabel>
                    <FaUserCircle size={23} />
                    <IoMdSettings size={23} />
                    <IoMdNotifications size={23} />
                </div>

            </div>
            {getPages(page!)}
        </div>
    )
};
function getPages(page: number) {
    switch (page) {
        case 0:
            return <Page_0 />
        case 1:
            return <Page_1 />
    }
    return <></>
}
export default Front;