<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>


<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 font-lao">ກົດລະບຽບຈະລາຈອນ</h2>
        <div class="space-y-4">
            <div class="bg-green-100 p-4 rounded-lg">
                    <h3 class="font-bold text-lg mb-2 font-lao">ກົດພື້ນຖານ</h3>
                    <ul class="list-disc list-inside space-y-2 text-gray-700">
                    <li>ຕ້ອງມີໃບຂັບຂີ່ທີ່ຖືກຕ້ອງ</li>
                    <li>ຕ້ອງໃສ່ເຂັມຂັດນິລະໄພ</li>
                    <li>ບໍ່ດື່ມເຫຼົ້າຂັບ</li>
                    <li>ເຄົາລົບສັນຍານຈະລາຈອນ</li>
                </ul>
            </div>
            <div class="bg-red-100 p-4 rounded-lg">
                    <h3 class="font-bold text-lg mb-2 font-lao">ຫ້າມຫ່າງຫ່າງ</h3>
                    <ul class="list-disc list-inside space-y-2 text-gray-700">
                    <li>ຂັບເກີນຄວາມໄວທີ່ກຳນົດ</li>
                    <li>ແຊງລົດໃນບໍລິເວນອັນຕະລາຍ</li>
                    <li>ຈອດລົດໃນບໍລິເວນຫ້າມຈອດ</li>
                    <li>ໃຊ້ໂທລະສັບຂະນະຂັບ</li>
                </ul>
            </div>
        </div>
    </div>
</template>