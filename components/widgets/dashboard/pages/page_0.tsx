import { FaPlay } from "react-icons/fa"
import { FaMessage } from "react-icons/fa6"
import { MdReport } from "react-icons/md"
import { RiUserFollowFill } from "react-icons/ri"
import WisperCard, { OpaqHeader } from "../wisper"
import useUser from "@/stores/userstore"

export const Page_0 = () => {
    const dbUser = useUser()
    return (<>
        <div className="mt-12 p-3 grid grid-cols-3 gap-x-5">
            <WisperCard title={"Account Balance"} price={"$" + dbUser.icoins.toFixed(3)} rate={"0%"} comment={"increase rate since last month"} />
            <WisperCard title={"Total Sales"} price={"$" + dbUser.sales.toFixed(3)} rate={"sales"} comment={"total product sales"} />
            <WisperCard title={"Channels"} price={dbUser.channels.length + ""} rate={""} comment={"total channels"} />
        </div>
        <div className=" p-3 grid grid-cols-4 gap-x-5" >
            <OpaqHeader className="bg-blue-600" title="comments" message={dbUser.comments_counts.toString()}
                icon={<FaMessage size={25} />} />
            <OpaqHeader className="bg-red-400" title="Views" message={dbUser.views_count.toString()}
                icon={<FaPlay size={25} />}
            />
            <OpaqHeader className="bg-green-400" title="Followers" message={dbUser.followers_count.toString()}
                icon={<RiUserFollowFill size={25} />} />
            <OpaqHeader className="bg-red-900" title="Reports" message={dbUser.reports.toString()}
                icon={<MdReport size={25} />} />
        </div>
    </>
    )
}