import { generateYAxis } from '@/app/lib/utils';
import { UserIcon, TrashIcon, PhoneIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
// import { fetchRevenue } from '@/app/lib/data';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function ClienteDetail() {
//   const revenue = await fetchRevenue();

//   const chartHeight = 350;
//   // NOTE: comment in this code when you get to this point in the course

//   const { yAxisLabels, topLabel } = generateYAxis(revenue);

//   if (!revenue || revenue.length === 0) {
//     return <p className="mt-4 text-gray-400">No data available.</p>;
//   }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Detalhe
      </h2>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="flex flex-col">
            <div className='flex flex-col bg-white px-5 py-5 gap-3'>
                <div className='flex items-center'>
                    <UserIcon className='w-8 h-8 px-1' />
                    <p className='px-1'>Roberto Felipe Menezes</p>
                </div>
                <div className='flex items-center'>
                    <PhoneIcon className='w-8 h-8 px-1' />
                    <p className='px-1'>(79) 99999-8888</p>
                </div>
                <div className='flex items-center'>
                    <IdentificationIcon className='w-8 h-8 px-1' />
                    <p className='px-1'>555.555.555-00</p>
                </div>
            </div>
            <div className='text-gray-400 text-sm px-5 pt-5'>Criado em: 3 de junho, 2024</div>
        </div>
      </div>
    </div>
  );
}