import { Toolbar } from "@/components/toolbar";
import useUser from "@/stores/userstore";
import { useRouter } from "next/router";
import { BreadCrumb } from "primereact/breadcrumb";
import { useEffect, useRef, useState } from "react";
import { MenuItem } from "primereact/menuitem";
import UploadDropDown from "@/components/widgets/file_upload";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { RadioButton } from "primereact/radiobutton";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { RiUploadFill } from "react-icons/ri";
import { Footer, FooterDark } from "@/components/footer";
import { Toast } from "primereact/toast";
import { getMLink, getXLink, uploadProduct } from "@/pages/utils/utils";
import { ProgressSpinner } from "primereact/progressspinner";
import { IoMdHome } from "react-icons/io";
import Select from "react-dropdown-select";
import { FileUpload } from "primereact/fileupload";
import { MarketUpload } from "@/pages/api/userdata/product";


const App = () => {
    const user = useUser()
    useEffect(() => {
        if (!getXLink() || getXLink().length < 0) {
            router.push('/user/login');
        }
        useUser.setState(JSON.parse(localStorage.getItem('user') || "{}"))
    }, [])
    const toast = useRef<Toast>(null);
    const stateText = "Upload Product"
    const [uploadedText, setUploadedText] = useState(stateText)
    const [city, setCity] = useState("")
    const [price, setPrice] = useState("")
    const [agentFee, setAgentFee] = useState("")
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState("")
    const [summary, setSummary] = useState("")
    const [productTile, setProductTitle] = useState("")
    const internalFileUploadRef = useRef<FileUpload>(null);
    const home: MenuItem = { icon: <IoMdHome />, url: '/' };
    const [installements, setInstallement] = useState("month")
    const [paymentsOptions, setPaymentsOptions] = useState([]);
    const items: MenuItem[] = [{ label: 'Catelog', url: '/' }, { label: 'Upload', url: '/catalogs/upload' }];
    const paymentsOptionsList = [
        { name: 'Cash' },
        { name: 'ArshMarket' },
        { name: 'Ecocash' },
        { name: 'MasterCard' },
        { name: 'Mukuru' },
        { name: 'InnBucks' },
    ];
    const productOptions = [
        {
            id: 0,
            name: "Accessories",
        },
        {
            id: 1,
            name: "Fashion",
        },
        {
            id: 2,
            name: "Cosmetics",
        },
        {
            id: 3,
            name: "Car",

        },
        {
            id: 4,
            name: "House",
        },
        {
            id: 5,
            name: "House Renting",
        },
        {
            id: 6,
            name: "Car Rental"
        },
        {
            id: 7,
            name: "Others"
        }
    ]
    const [selectedProductOption, setSelectedProductOption] = useState(0)
    const brokerList = [
        { name: 'Agent' },
        { name: 'LandLord' },
        { name: 'Other' },
    ];
    const [broker, setBroker] = useState(brokerList[2]);
    const router = useRouter();

    const uploadHouses = async () => {
        if (summary.replaceAll(" ", "").length < 1) {
            return toast.current!.show({ severity: 'error', summary: 'Error', detail: 'summary is required', life: 3000 })
        }
        if (productTile.replaceAll(" ", "").length < 1) {
            return toast.current!.show({ severity: 'error', summary: 'Error', detail: 'productName is required', life: 3000 })
        }
        if (description.replaceAll(" ", "").length < 1) {
            return toast.current!.show({ severity: 'error', summary: 'Error', detail: 'Description is required', life: 3000 })
        }
        if (price.replaceAll(" ", "").length < 1) {
            return toast.current!.show({ severity: 'error', summary: 'Error', detail: 'Price is required', life: 3000 })
        }
        const formData = new FormData();
        const marketItem: MarketUpload = {
            refresh_token: getMLink(),
            product_item: {
                summary,
                id: "",
                owner: user.email,
                title: productTile,
                description: description,
                price: parseInt(price),
                city: city,
                installements: installements,
                payments_options: paymentsOptions,
                images: [],
                country: "",
                user: user,
                broker: broker.name,
                likes: 0,
            }
        }
        console.log(marketItem)
        formData.append('product_item', JSON.stringify(marketItem));
        if (internalFileUploadRef.current!.getFiles().length > 0) {
            internalFileUploadRef.current!.getFiles().forEach((file) => {
                formData.append('images[]', file);
            });
        }
        setLoading(true)
        const onError = (message: string) => {
            setLoading(false)
            setUploadedText(stateText)
            toast.current!.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
        }
        const finish = () => {
            setLoading(false)
            setUploadedText(stateText)
            return router.push("/user/dashboard")
        }
        const progressUpdate = (x: number) => {
            setUploadedText("uploading.. " + x + "%")
        }
        uploadProduct(formData, progressUpdate, onError, finish)

    }
    return (
        <div>
            <Toast ref={toast}></Toast>
            <Toolbar className={`2xl:pr-12 2xl:pl-12 xl:pr-8 xl:pr:8 w-full bg-background flex p-3 items-center justify-between`} />
            <div className="w-full flex justify-center items-center  p-10">
                <div className='flex select-none bg-background w-full flex-col 2xl:w-3/4 mt-5 pt-12 mb-12'>
                    <div className="flex flex-col bg-cards text-gray-950 p-14 gap-y-5 drop-shadow-xl rounded-xl">
                        <BreadCrumb className="bg-cards text-foreground 2xl:pr-12 2xl:pl-12 xl:pr-8 xl:pr:8" model={items} home={home} />
                        <UploadDropDown fileUploadRef={internalFileUploadRef} />
                        <Divider />
                        <div className="grid grid-cols-2">
                            <div className="text-foreground">
                                What type of Product Your are Selling ?
                            </div>
                            <Select
                                className="text-foreground ring-0 outline-none p-2 bg-background"
                                options={productOptions}
                                labelField="name"
                                style={{ border: 0 }}
                                valueField="name"
                                onChange={(e) => setSelectedProductOption(e[0].id)}
                                values={[]}
                                dropdownHandleRenderer={({ state }) => (
                                    <div className={`dropdown-handle ${state.dropdown ? 'open' : ''}`} />
                                )}
                                dropdownRenderer={({ props, methods }) => (
                                    <div className="bg-cards">
                                        {props.options.map((option, index) => (
                                            <div
                                                key={index}
                                                onClick={() => methods.addItem(option)}
                                                className="p-2 cursor-pointer hover:bg-primary"
                                            >
                                                {option.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            />
                        </div>
                        <Divider className=" bg-[#ffffff10]" />

                        <div className="grid grid-cols-3 gap-x-8">
                            <FloatLabel>
                                <InputText className="p-4 bg-background w-full text-foreground focus:outline-none focus:ring-0"
                                    id="name" value={productTile} onChange={(e) => setProductTitle(e.target.value)} />
                                <label htmlFor="name">Title</label>
                            </FloatLabel>
                            <FloatLabel>
                                <InputText className="p-4 bg-background w-full text-foreground focus:outline-none focus:ring-0"
                                    id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                                <label htmlFor="city">City</label>
                            </FloatLabel>
                            <FloatLabel>
                                <InputText className="p-4 bg-background w-full text-foreground focus:outline-none focus:ring-0"
                                    id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                <label htmlFor="price">Price</label>
                            </FloatLabel>
                        </div>
                        {selectedProductOption == 6 || selectedProductOption == 5 ? (<> <div className="text-lg mt-3 mb-2 text-foreground">This amount is charged per :</div>
                            <div className="flex flex-wrap gap-3 text-foreground">

                                <div className="flex align-items-center ">
                                    <RadioButton inputId="Hour" name="hourly" value="hour"
                                        onChange={(e) => setInstallement(e.value)} checked={installements == "hour"} />
                                    <label htmlFor="Hour" className="ml-2">Hour</label>
                                </div>
                                <div className="flex align-items-center">
                                    <RadioButton inputId="Day" name="daily" value="day"
                                        onChange={(e) => setInstallement(e.value)} checked={installements == "day"} />
                                    <label htmlFor="Day" className="ml-2">Day</label>
                                </div>
                                <div className="flex align-items-center">
                                    <RadioButton inputId="Week" name="weekly" value="week"
                                        onChange={(e) => setInstallement(e.value)} checked={installements == "week"} />
                                    <label htmlFor="Week" className="ml-2">Week</label>
                                </div>
                                <div className="flex align-items-center">
                                    <RadioButton inputId="Month" name="monthly" value="month"
                                        onChange={(e) => setInstallement(e.value)} checked={installements == "month"} />
                                    <label htmlFor="Month" className="ml-2">Month</label>
                                </div>
                                <div className="flex align-items-center">
                                    <RadioButton inputId="Semester" name="semester" value="semester"
                                        onChange={(e) => setInstallement(e.value)} checked={installements == "semester"} />
                                    <label htmlFor="Semester" className="ml-2">Semester</label>
                                </div>
                            </div></>) : (<></>)}
                        <InputTextarea
                            placeholder={`Full description of your ${productOptions[selectedProductOption].name} max words of 2000 letters
                            `}
                            className="bg-background text-foreground focus:ring-0 p-3 mb-6" autoResize value={description}
                            onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />
                        <Divider className="mt-2 mb-2 h-1 bg-[#ffffff05]" />
                        <div className="text-foreground">Short Summary less than 100 letters that will below title or Google Search *</div>
                        <InputTextarea
                            placeholder={`short summary : max 200 words`}
                            className="bg-background text-foreground focus:ring-0 p-3" value={summary}
                            onChange={(e) => setSummary(e.target.value)} rows={2} />
                        <div className="grid grid-cols-2 gap-x-5">
                            <MultiSelect value={paymentsOptions} onChange={(e) => setPaymentsOptions(e.value)} options={paymentsOptionsList} optionLabel="name"
                                placeholder="Select Payment Option" maxSelectedLabels={5} className="active:ring-0 w-full md:w-20rem bg-background text-foreground focus:ring-0" />
                            {selectedProductOption == 5 ? (<><Dropdown value={broker} onChange={(e) => setBroker(e.value)} options={brokerList} optionLabel="name"
                                placeholder="You uploading house as" className="active:ring-0 w-full md:w-14rem bg-background text-foreground focus:ring-0" /></>)
                                : (<></>)}
                        </div>
                        <div className="grid grid-cols-2">
                            <div>
                                {broker.name && broker.name.replaceAll(" ", "").toLowerCase() === "agent" && selectedProductOption === 5 ? (<>
                                    <FloatLabel>
                                        <InputText className="p-4 bg-background w-full text-foreground focus:outline-none focus:ring-0"
                                            id="Agent Fee" value={agentFee} onChange={(e) => setAgentFee(e.target.value)} />
                                        <label htmlFor="Agent Fee">Agent Fee</label>
                                    </FloatLabel></>) : (<></>)}
                            </div>
                        </div>
                        <div>
                            <div className="mt-6 text-foreground">
                                <h3 className="text-xl font-bold mb-2">Terms and Conditions</h3>
                                <p className="text-sm text-gray-700">
                                    By uploading your house, you agree to the following terms and conditions:
                                </p>
                                <ul className="list-disc list-inside text-sm text-foreground mt-2">
                                    <li>You certify that the information provided is accurate and truthful.</li>
                                    <li>You agree to comply with all local laws and regulations regarding property rentals.</li>
                                    <li>You understand that any false information may result in the removal of your listing.</li>
                                    <li>You agree to handle all inquiries and transactions in a professional manner.</li>
                                    <li>You acknowledge that the platform is not responsible for any disputes or issues arising from your listing.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex justify-end w-full">
                            <button onClick={uploadHouses} className="flex gap-x-5 bg-primary p-6 text-white rounded-xl"><RiUploadFill />
                                {loading ? (<ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                                ) : (<>{uploadedText}</>)}</button>
                        </div>
                    </div>

                </div>
            </div>
            <Footer className="mt-12 w-full bg-blue-200 p-3 flex items-center justify-center" />
            <FooterDark className="w-full bg-black p-3 flex items-center justify-center" />
        </div >
    );
};

export default App;