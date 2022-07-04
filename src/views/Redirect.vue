<template>
  <div />
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const { params, query } = route
console.log(params)
console.log(query)
router.replace({
  path: decodeURIComponent(params.path),
  query
})
</script>
