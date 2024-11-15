import Head from '@/components_dashboard/Head';
import Breadcrumb from '@/components/Breadcrumbs';
import DataTable from '@/components_dashboard/DataTable';
import AnalysisSummary from '@/components_dashboard/AnnalisisSumenry';
import { pertanianData, getRandomColor } from '@/app/pages/data/DataBayangan';
import ChartDonut from '@/components_dashboard/ChartDonut';
import ListTanaman from '@/components_dashboard/ListTanaman';

export default function Analisis() {
    const { petaniData, dataPertanian } = pertanianData;

    const totalPetani = petaniData.reduce((acc, curr) => acc + curr.jumlah, 0);
    const series = petaniData.map((data) => (data.jumlah / totalPetani) * 100);
    const labels = petaniData.map((data) => data.tanaman);
    const colors = petaniData.map(() => getRandomColor());

    return (
        <div>
            <Head page_name="Analisis" />
            <div className="p-4">
                <Breadcrumb listpage={[
                    { name: "Dashboard", link: "/pages/users/dashboard" },
                    { name: "Analisis", link: "/pages/users/analisis" },
                ]} />
            </div>
            <div className='flex flex-col md:flex-row gap-2 p-2'>
                <div className="flex-1 flex flex-col w-full h-screen p-2 gap-3 overflow-y-auto bg-blue-200">
                        <div className='flex-2 w-full h-full'>
                            <ChartDonut petaniData={petaniData} colors={colors} />
                        </div>
                        <div className='flex-2 w-full h-full'>
                            <ListTanaman series={series} colors={colors} labels={labels} />
                        </div>
                </div>
                <div className='flex-1 flex flex-col w-full h-screen p-2 gap-3 overflow-y-auto bg-blue-200'>
                    <div className="flex-2">
                        <DataTable data={dataPertanian} />
                    </div>
                    <div className="flex-2">
                        <AnalysisSummary/>
                    </div>
                </div>
            </div>
        </div>
    );
}
