import { Bell, Search } from "lucide-react";


function AdminHeader() {

  return (

    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">

      <div className="ml-12 lg:ml-0">

        <h2 className="text-lg font-semibold text-slate-800">
          MAXARA Admin
        </h2>

      </div>


      <div className="flex items-center gap-4">

        <button className="text-slate-500 hover:text-slate-800">
          <Search size={19} />
        </button>

        <button className="text-slate-500 hover:text-slate-800">
          <Bell size={19} />
        </button>


        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          A
        </div>

      </div>

    </header>

  );
}

export default AdminHeader;