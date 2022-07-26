<template>
  <div class="box">
    <div class="top">
      <span class="count">{{count}}</span>
      <span class="date">{{date}}</span>
    </div>
    <div class="content">
      <span>＄<span class="number">{{number}}</span></span>
      <icon icon="ep:menu"  />
    </div>
    <div class="amount">
      <span class="total">{{total}}</span>
      <span class="money">${{money}}</span>
    </div>
  </div>
</template>

<script setup>

defineOptions({
  name: 'Quantity'
})
 const porps  = defineProps({
    count:{
      type:String,
      default:''
    },
    date:{
      type:String,
      default:''
    },
    number:{
      type:Number,
      default:0
    },
    total:{
      type:String,
      default:''
    },
    money:{
      type:Number,
      default:0
    }
  })
 
 

</script>

<style lang="scss" scoped>
  .box {
    width: 22.5%;
    height: 11rem;
    background-color: #fff;
    color: #000;
    // border-radius:5%;
    .top {
      display: flex;
      height: 2.5rem;
      justify-content: space-between;
      border-bottom: 1px solid #f0f0f0;
      line-height: 2.5rem;
      align-items: center;
      padding: 0 10px;
      font-size: 14px;
      .date {
        display: inline-block;
        width: 1.75rem;
        height: 1.5rem;
        background-color: #f6ffed;
        color: #389e0d;
        border: 1px solid #bfed9c;
        line-height: 1.5rem;
        text-align: center;
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      height: 5.5rem;
      font-size: 22px;
      padding:0 20px;
      align-items: center;
    }
    .amount {
      display: flex;
      justify-content: space-between;
      padding:0 20px;
      .total {
        font-size: 14px;
      }
      .money {
        font-size: 13px;
        color:#262626 ;
      }
    }
  } 

</style>