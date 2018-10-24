<template>
  <table class="bang-gia">
    <th class="small-project-header">Dự án</th>
    <th class="small-investor-header">Chủ đầu tư</th>
    <th class="small-location-header">Vị trí</th>
    <th class="small-price-header">Giá CĐT bán<br />(tr/m2)</th>
    <tr v-for="(data, i) in list.nha" :key="data.id"
      :class="{ unbottom: i === list.length -1, shaded: i%2 === 0 }">
      <td class="project-cell">{{ data.project }}</td>
      <td class="investor-cell">{{ data.investor }}</td>
      <td class="location-cell">{{ data.location}}</td>
      <td>{{ data.avgPrice | parseNumber }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "SmallTableNha",
  props: {
    list: Object
  }
};
</script>
