"use client";

import React from "react";
import ProductTable from "@/components_dashboard/Table";
import Head from "@/components_dashboard/Head";
import Breadcrumb from "@/components/Breadcrumbs";
import Drawer from "@/components/DrawerData";

export default function Pencatatan() {
    const [isDrawerOpen, setDrawerOpen] = React.useState(false);
    return (
        <div>
            <Head page_name="Pencatatan" />
            <div className="p-4">
                <Breadcrumb listpage={[
                    { name: "Dashboard", link: "/pages/users/dashboard" },
                    { name: "Pencatatan", link: "/pages/users/catatanPetani" },
                ]} />
            </div>
            <div className='p-4'>
                <button
                    onClick={() => setDrawerOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Tambah Data Panen
                </button>
                <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
            </div>
            <div className="p-4">
                <ProductTable />
            </div>
        </div>
    );
};
