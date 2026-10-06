import { Package, IndianRupee, Folder, Image } from "lucide-react";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../redux/product/productSlice";

import StatCard from "../components/StatCard";

function Dashboard() {
  const dispatch = useDispatch();


  const { products, total, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      getProducts({
        page: 1,
        limit: 100,
      }),
    );
  }, [dispatch]);

  const categories = new Set(products.map((item) => item.category)).size;

  const folders = new Set(products.map((item) => item.folder)).size;

  const totalValue = products.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-1 text-sm text-slate-500">
          Product management overview
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center">
          Loading dashboard...
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Products" value={total} icon={Package} />

          <StatCard title="Categories" value={categories} icon={Folder} />

          <StatCard title="Folders" value={folders} icon={Image} />

          <StatCard
            title="Product Value"
            value={`₹${totalValue.toLocaleString()}`}
            icon={IndianRupee}
          />
        </div>
      )}

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Product System</h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Database</p>

            <p className="mt-1 font-semibold text-green-600">MongoDB</p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Image Storage</p>

            <p className="mt-1 font-semibold text-blue-600">Cloudinary</p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">API</p>

            <p className="mt-1 font-semibold text-purple-600">Express</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
