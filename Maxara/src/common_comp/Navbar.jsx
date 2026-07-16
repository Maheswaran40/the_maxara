import {
    FaBars,
    FaSearch,
    FaHome,
} from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import logo from "../assets/images/maxara_logo.png"
import CategoryMenu from "@/components/ui/CategoryMenu";
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

function Navbar() {

    const SHEET_SIDES = ["left"] 
    return (
        <header className="bg-[var(--primary)] shadow-sm">
            <div className="max-w-[1500px] mx-auto flex items-center justify-between px-6">

                {/* Left */}
                <div className="flex items-center gap-4">


                    {/* All sports canvas start */}
                    {SHEET_SIDES.map((side) => (
                         <Sheet key={side}>
                        <SheetTrigger render={<Button variant="outline"><FaBars className="text-2xl cursor-pointer" />All Sports</Button>} />
                        <SheetContent side={side}>
                            <SheetHeader>
                                <SheetTitle>Explore Sports</SheetTitle>
                                <SheetDescription>
                                    Make changes to your profile here. Click save when you&apos;re done.
                                </SheetDescription>
                            </SheetHeader>
                                <CategoryMenu/>
                            <SheetFooter>
                                <Button type="submit">Save changes</Button>
                                <SheetClose render={<Button variant="outline">Close</Button>} />
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                    ))}
                   
                    {/* All sports canvas end */}

                </div>

                {/* Logo */}
                <img src={logo} height="80px" width="80px" alt="" />

                {/* Search */}
                <div className="w-[500px]">
                    <div className="flex items-center border-2 border-black rounded-full px-5 py-2 bg-white">
                        <FaSearch className="text-xl mr-3" />

                        <span className="typing-container">Search</span>
                    </div>
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-10">

                    <div className="flex flex-col items-center cursor-pointer">
                        <FaHome className="text-xl text-blue-700" />
                        <span className="text-sm">Home</span>
                    </div>

                    <div className="flex flex-col items-center cursor-pointer">
                        <TbLogout className="text-xl" />
                        <span className="text-sm">Logout</span>
                    </div>

                    <div className="flex flex-col items-center cursor-pointer">
                        <FaRegHeart className="text-xl" />
                        <span className="text-sm">Wishlist</span>
                    </div>

                    <div className="flex flex-col items-center cursor-pointer">
                        <MdOutlineShoppingCart className="text-xl" />
                        <span className="text-sm">Cart</span>
                    </div>

                </div>
            </div>

        </header>
    );
}

export default Navbar;