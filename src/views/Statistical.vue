<template>
  <div class="traffic">
    <Quantity count="访问数" date="月" :number=num total="总访问数" money="12000" ></Quantity>
    <Quantity count="成交额" date="月" :number=num total="总成交额" money="12000"></Quantity>
    <Quantity count="下载数" date="周" :number=num total="总下载数" money="12000"></Quantity>
    <Quantity count="成交数" date="年" :number=num total="总成交数" money="12000"></Quantity>
  </div>
  
</template>

<script setup>
import Quantity from '@/components/Quantity.vue'


// import countTo from "vue-count-to";

defineOptions ({
  name:'statistical',
})
let num = 1200


</script>

<style lang="scss" scoped>
.traffic {
  display: flex;
  justify-content: space-around;
}
</style>