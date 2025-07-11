<script setup>

</script>

<template>
    <div class="pb-9">
        <h6 class="text-4xl text-black font-bold">ຈັດການຂໍ້ມູນເຈົ້າໜ້າທີ່</h6>
    </div>

    <div class="p-5 bg-neutral-300 rounded shadow">
        <!-- Table -->
        <div class="bg-white rounded shadow h-95 w-full touch-auto overflow-auto">
            <table class="min-w-full text-left">
                <thead class="sticky top-0 bg-stone-300 shadow-sm">
                    <tr class="border-b bg-stone-200 h-15">
                        <th class="py-1.5 px-3 pr-8 text-neutral-950 text-sm">ເລກລໍາດັບ</th>
                        <th class="py-1.5 px-3 pr-16 text-neutral-950 text-sm">ຊື່ ແລະ ນາມສະກຸນ</th>
                        <th class="py-1.5 px-3 pr-16 text-neutral-950 text-sm">ເບີໂທ</th>
                        <th class="py-1.5 px-3 pr-16 text-neutral-950 text-sm">ເລກລະຫັດບັດ</th>
                        <th class="py-1.5 px-3 pr-16 text-neutral-950 text-sm">ເວລາ</th>
                        <th class="py-1.5 px-3 pr-16 text-neutral-950 text-sm">ວັນເດືອນປີ</th>
                        <th class="py-1.5 px-3 text-neutral-950 text-sm text-center">ຈັດການ</th>
                    </tr>
                </thead>
                <tbody class="overflow-y-scroll">
                    <tr class="border-b hover:bg-gray-50 h-20">
                        <td class="py-1.5 px-3 flex items-center text-red-500 text-sm h-20">0001</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXXX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXX</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">00:00</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">XX/XX/XXXX</td>
                        <td class="py-1.5 px-3 flex justify-end gap-2">
                            <button
                                class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition">ປະຕິເສດ</button>
                            <button
                                class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition">ຢືນຢັນ</button>
                        </td>
                    </tr>
                    <tr class="border-b hover:bg-gray-50 h-20">
                        <td class="py-1.5 px-3 flex items-center text-red-500 text-sm h-20">0001</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXXX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXX</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">00:00</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">XX/XX/XXXX</td>
                        <td class="py-1.5 px-3 flex justify-end gap-2">
                            <button
                                class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition">ປະຕິເສດ</button>
                            <button
                                class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition">ຢືນຢັນ</button>
                        </td>
                    </tr>
                    <tr class="border-b hover:bg-gray-50 h-20">
                        <td class="py-1.5 px-3 flex items-center text-red-500 text-sm h-20">0001</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXXX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXX</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">00:00</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">XX/XX/XXXX</td>
                        <td class="py-1.5 px-3 flex justify-end gap-2">
                            <button
                                class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition">ປະຕິເສດ</button>
                            <button
                                class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition">ຢືນຢັນ</button>
                        </td>
                    </tr>
                    <tr class="border-b hover:bg-gray-50 h-20">
                        <td class="py-1.5 px-3 flex items-center text-red-500 text-sm h-20">0001</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXXX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXX</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">00:00</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">XX/XX/XXXX</td>
                        <td class="py-1.5 px-3 flex justify-end gap-2">
                            <button
                                class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition">ປະຕິເສດ</button>
                            <button
                                class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition">ຢືນຢັນ</button>
                        </td>
                    </tr>
                    <tr class="border-b hover:bg-gray-50 h-20">
                        <td class="py-1.5 px-3 flex items-center text-red-500 text-sm h-20">0001</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXXX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXX</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">00:00</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">XX/XX/XXXX</td>
                        <td class="py-1.5 px-3 flex justify-end gap-2">
                            <button
                                class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition">ປະຕິເສດ</button>
                            <button
                                class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition">ຢືນຢັນ</button>
                        </td>
                    </tr>
                    <tr class="border-b hover:bg-gray-50 h-20">
                        <td class="py-1.5 px-3 flex items-center text-red-500 text-sm h-20">0001</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXXX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXXX</td>
                        <td class="py-1.5 px-3 text-start text-red-500 text-sm">XXXXXX</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">00:00</td>
                        <td class="py-1.5 px-3 text-red-500 text-sm">XX/XX/XXXX</td>
                        <td class="py-1.5 px-3 flex justify-end gap-2">
                            <button
                                class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition">ປະຕິເສດ</button>
                            <button
                                class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition">ຢືນຢັນ</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>