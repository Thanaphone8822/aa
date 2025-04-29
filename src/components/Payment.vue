<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'
const mgs = ref('link')
</script>

<template>
    <div class="flex items-center justify-between bg-amber-50 text-black h-[50px] text-2xl">
        <button class="btn ml-3 btn-primary" @click="$router.push('/')">
            Back
        </button>
        <div>
            <h1>Payment</h1>
        </div>
        <div>

        </div>
    </div>

    <div class="h-screen flex flex-col text-2xl text-white items-center">
        <div class="flex gap-5">
            <div class="mt-3 bg-amber-50 text-black w-[400px] h-[500px] rounded">
                <span>ຈຳນວນໝວດ</span>
            </div>
            <div class="mt-3 bg-amber-50 text-black w-[500px] h-[500px] rounded">
                <span>ຈຳນວນມາດຕາ</span>
            </div>
            <div class="mt-3 bg-amber-50 text-black w-[400px] h-[500px] rounded">
                <span>{{ mgs }}</span>
            </div>
        </div>
        <div class="flex gap-5 mt-6">
            <div class="mt-3 bg-amber-50 text-black w-[400px] h-[300px] rounded">
                <span>ລາຍລະອຽດການກະທຳຜິດ</span>
            </div>
            <div class="mt-3 bg-amber-50 text-black w-[500px] h-[300px] rounded">
                <span>ເວລາທີ່ກະທຳຜິດ</span> <br>
                <span>ວັນເດືອນປີທີ່ກະທຳຜິດ</span>
            </div>
            <div class="mt-3 bg-amber-50 text-black w-[400px] h-[300px] rounded">
                <div class="flex items-center gap-20 justify-center h-full">
                    <button class="btn btn-warning text-xl">ປະຕິເສດ</button>
                    <button class="btn btn-primary text-xl">ຍອມຮັບ</button>
                </div>
            </div>
        </div>
        
    </div>




</template>


<style scoped></style>