<script setup lang="ts">

</script>


<template>
    <div class="p-5 bg-neutral-400 rounded shadow">
        <!-- Table -->
        <div class="bg-white rounded shadow h-95 w-full touch-auto overflow-auto">
            <table class="min-w-full text-left">
                <thead class="sticky top-0 bg-stone-300 shadow-sm">
                    <tr class="border-b bg-stone-300 h-14">
                        <th class="py-1.5 px-3 pr-8 text-neutral-950 text-sm">ເລກໃບສັ່ງ</th>
                        <th class="py-1.5 px-3 pr-16 text-neutral-950 text-sm">ຊື່ ແລະ ນາມສະກຸນຜູ້ລະເມີດ</th>
                        <th class="py-1.5 px-3 pr-16 text-neutral-950 text-sm">ຈໍານວນຂໍ້ຫາ</th>
                        <th class="py-1.5 px-3 pr-16 text-neutral-950 text-sm">ປະເພດພາຫະນະ</th>
                        <th class="py-1.5 px-3 pr-16 text-neutral-950 text-sm">ເວລາ</th>
                        <th class="py-1.5 px-3 pr-16 text-neutral-950 text-sm">ວັນເດືອນປີ</th>
                        <th class="py-1.5 px-3 pr-16 text-neutral-950 text-sm">ເງິນລວມ</th>
                    </tr>
                </thead>
                <tbody class="overflow-y-scroll">
                    <tr class="border-b hover:bg-gray-50 h-20">
                        <td class="py-1.5 px-3 flex items-center text-red-500 text-sm h-20">0001</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXXX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXXX</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">00:00</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">XX/XX/XXXX</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">XXXXXXXXX ກີບ</td>
                    </tr>
                    <tr class="border-b hover:bg-gray-50 h-20">
                        <td class="py-1.5 px-3 flex items-center text-red-500 text-sm h-20">0001</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXXX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXXX</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">00:00</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">XX/XX/XXXX</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">XXXXXXXXX ກີບ</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>