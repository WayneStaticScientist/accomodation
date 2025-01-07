import Front from "@/components/widgets/dashboard/front";
import SideDrawer from "@/components/widgets/dashboard/side";
import { DBUser } from "@/pages/api/userdata/user";
import { getMLink, getUser, getXLink } from "@/pages/utils/utils";
import useUser from "@/stores/userstore";
import router from "next/router";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0)
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
                }
                setLoading(false);
            })
        } else {
            router.push("/user/login")
        }
    }, []);
    return (<>
        {loading ? (<div className="w-screen h-screen gap-y-5 flex items-center flex-col justify-center">
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--background)" animationDuration=".5s" />
            loading..</div>
        ) :
            <div className="grid grid-cols-6 h-screen p-5 bg-background">
                <SideDrawer className="col-span-1" page={page} setPage={setPage} />
                <Front className="col-span-5" page={page} />
            </div>}</>);
};

export default Dashboard;