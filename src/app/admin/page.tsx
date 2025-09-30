'use client'

import Sidebar from "@/components/admin/Sidebar"
import AdminAppointment from "@/components/admin/appointments/AdminAppointment"
import AdminShop from "@/components/admin/shop/AdminShop"

const page = () => {



  return (
    <div id="admin" className="border-t-2 border-b-2 border-[#474747] dark:border-[#d3d3d3] flex flex-col sm:flex-row bg-[#000000] dark:bg-[#e9e9e9] text-white dark:text-[#0B0B0B] ease-in-out duration-150 min-h-100">
      <div className="sticky bg-black dark:bg-[#e9e9e9] top-0 border-b-2 sm:border-r-2 border-[#474747] dark:border-[#d3d3d3] max-h-screen">
        <Sidebar/>
      </div>
      <section id='controlls' className="flex flex-col items-center max-w-[90%] mx-auto my-10">
        <div id="appointment-controls" className="hidden">
          <AdminAppointment/>
        </div>
        <div id="store-controls" className="active">
          <AdminShop />
        </div>
      </section>
    </div>
  )
}

export default page