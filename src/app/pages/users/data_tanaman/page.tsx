// pages/data-tanaman.js
"use client";
import React from 'react';
import Head from '@/components_dashboard/Head';
import Breadcrumb from '@/components/Breadcrumbs';

export default function DataTanaman(){

    if(localStorage.getItem("token") === null) {
        window.location.href = "/pages/login"
    }

    return (
        <div>
            <Head page_name="Data Tanaman" />
            <div className="p-4">
                <Breadcrumb listpage={[
                    { name: "Dashboard", link: "/pages/users/dashboard" },
                    { name: "Data Tanaman", link: "/pages/users/data_tanaman" },
                ]} />
            </div> 
        </div>
    );
};
