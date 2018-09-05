<template>
  <table>
    <th class="small-model-header">Mẫu xe</th>
    <th class="small-brand-header">Hãng xe</th>
    <th class="small-price-header">Giá niêm yết (tr)</th>
    <th class="small-price-header">Giá bán (tr)</th>
    <tr v-for="(data, i) in list.xe" :key="data.id"
      :class="{ unbottom: i === list.length -1, shaded: i%2 === 0 }">
      <td class="model-cell">{{ data.model}}</td>
      <td class="brand-cell">{{ data.brand}}</td>
      <td class="price-cell">{{ data.listPrice | parseZeroPrice }}</td>
      <td>{{ data.salePrice | parseZeroPrice }}</td>
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
