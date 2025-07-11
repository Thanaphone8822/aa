<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>


<template>
    <div class="flex justify-center">
        <img class="w-100 h-100 object-contain" src="@/assets/POLICE.png"/>
    </div>
    <div class="flex flex-col items-center">
        <a class="text-black font-bold text-3xl mb-2 font-lao">ກົມຕໍາຫຼວດຈາລະຈອນ</a>
        <a class="text-black font-bold text-2xl mb-2 font-lao">ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບສຳຫຼັບເຈົ້າໜ້າທີ່</a>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 font-lao">ການປັບໄໝ</h2>
        <div class="space-y-4">
            <div class="bg-gray-100 p-4 rounded-lg">
                <h3 class="text-black font-bold text-lg mb-2 font-lao">ປັບໄໝການຂັບຂີ່</h3>
                <p class="text-gray-600">ຂໍ້ມູນການປັບໄໝສຳລັບການລະເມີດກົດລະບຽບຈະລາຈອນ</p>
            </div>
            <div class="bg-yellow-100 p-4 rounded-lg">
                    <h3 class="font-bold text-lg mb-2 font-lao text-black">ອັດຕາປັບໄໝ</h3>
                    <ul class="list-disc list-inside space-y-1 text-gray-700">
                    <li>ຂັບໂດຍບໍ່ມີໃບຂັບຂີ່: 500,000 ກີບ</li>
                    <li>ຂັບເກີນຄວາມໄວ: 200,000 ກີບ</li>
                    <li>ບໍ່ໃສ່ເຂັມຂັດນິລະໄພ: 100,000 ກີບ</li>
                </ul>
            </div>
        </div>
    </div>
</template>