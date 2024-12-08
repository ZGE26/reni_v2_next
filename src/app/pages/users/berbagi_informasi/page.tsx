"use client";
import Head from '@/components_dashboard/Head';
import Breadcrumb from '@/components/Breadcrumbs';
import { pertanianData } from '../../data/DataBayangan';

export default function BerbagiInformasi() {

    if(localStorage.getItem("token") === null) {
        window.location.href = "/pages/login"
    }

    return (
        <div className='p-3'>
            <Head page_name="Berbagi Informasi" />
            <div className="p-4">
                <Breadcrumb listpage={[
                    { name: "Dashboard", link: "/pages/users/dashboard" },
                    { name: "Berbagi Informasi", link: "/pages/users/berbagi_informasi" },
                ]} />
            </div>
            {pertanianData.post.map((post, index) => (
                <div key={index} className="p-4 border rounded-md shadow-md mb-4">
                    <div className='w-full flex gap-5 items-center p-2 border-b border-black justify-between'>
                        <div className='flex gap-3 justify-center items-center'>
                            <div className='h-8 w-8 border rounded-full'>
                                <img src="#" alt="P" className='text-center'/>
                            </div>
                            <div className='font-bold text-xl'>
                                <p>{post.nama}</p>
                            </div>
                        </div>
                        <div className='text-xs'>
                            <p>{post.tanggal}</p>
                        </div>
                    </div>
                    <div className='p-3 font-bold text-2xl'>
                        <h1>{post.title}</h1>
                    </div>
                    <div className='px-5 border-b border-black pb-3'>
                        <p>{post.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
