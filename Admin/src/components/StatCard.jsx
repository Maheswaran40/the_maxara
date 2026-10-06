function StatCard({
  title,
  value,
  icon: Icon,
}) {

  return (

    <div className="rounded-xl bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h2>

        </div>


        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">

          <Icon size={22} />

        </div>

      </div>

    </div>

  );
}

export default StatCard;