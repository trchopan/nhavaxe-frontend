<template>
  <table class="bang-gia">
    <th class="small-model-header">Mẫu xe</th>
    <th class="small-brand-header">Hãng xe</th>
    <th class="small-price-header">Giá niêm yết<br />(tr)</th>
    <th class="small-price-header">Giá lăn bánh<br />(tr)</th>
    <tr v-for="(data, i) in list.xe" :key="data.id"
      :class="{ unbottom: i === list.length -1, shaded: i%2 === 0 }">
      <td class="model-cell">{{ data.model}}</td>
      <td class="brand-cell">{{ data.brand}}</td>
      <td class="price-cell-primary">{{ data.listPrice | parseNumber }}</td>
      <td class="price-cell-secondary border-right-reset">{{ data.salePrice | parseNumber }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "SmallTableXe",
  props: {
    list: Object
  }
};
</script>
