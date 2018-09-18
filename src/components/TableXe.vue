<template>
  <table>
    <th class="model-header">Mẫu xe</th>
    <th class="brand-header">
      <span class="block">Hãng xe</span>
      <select v-model="selectedBrand">
        <option :value="null">-</option>
        <option v-for="option in filterSelections.brand"
          :value="option"
          :key="'brand'+option">{{ option }}</option>
      </select>
    </th>
    <th class="type-header">
      <span class="block">Loại</span>
      <select v-model="selectedType">
        <option :value="null">-</option>
        <option v-for="option in filterSelections.type"
          :value="option"
          :key="'type'+option">{{ option }}</option>
      </select>
    </th>
    <th class="origin-header">
      <span class="block">Nguồn gốc</span>
      <select v-model="selectedOrigin">
        <option :value="null">-</option>
        <option v-for="option in filterSelections.origin"
          :value="option"
          :key="'origin'+option">{{ option }}</option>
      </select>
    </th>
    <th class="engine-header">Động cơ</th>
    <th class="torque-header">Mã lực</th>
    <th class="price-header">Giá niêm<br />yết (tr)</th>
    <th class="price-header">Giá bán<br />(tr)</th>
    <th class="publish-at-header">Đăng lúc</th>
    <tr v-show="filteredList.length <= 0">
      <td colspan="10">
        Không có dữ liệu nào thoả mãn bộ lọc. Bạn vui lòng chọn lại bộ lọc.
      </td>
    </tr>
    <tr v-for="(data, i) in filteredList" :key="data.id"
      :class="{ unbottom: i === list.length -1, shaded: i%2 === 0 }">
      <td class="model-cell">{{ data.model }}</td>
      <td class="brand-cell">{{ data.brand }}</td>
      <td class="type-cell">{{ data.type }}</td>
      <td class="origin-cell">{{ data.origin }}</td>
      <td class="engine-cell">{{ data.engine }}</td>
      <td class="torque-cell">{{ data.torque }}</td>
      <td class="price-cell">{{ data.listPrice | parseZeroPrice }}</td>
      <td class="price-cell">{{ data.salePrice | parseZeroPrice }}</td>
      <td class="publish-at-cell">{{ data.publishAt | parseMonthYear }}</td>
    </tr>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TableXe",
  data() {
    return {
      selectedBrand: null,
      selectedType: null,
      selectedOrigin: null
    };
  },
  computed: {
    ...mapGetters({
      list: "bangGia/list"
    }),
    filteredList() {
      var result = this.list.xe;
      const selectedArray = [
        { id: "brand", value: this.selectedBrand },
        { id: "type", value: this.selectedType },
        { id: "origin", value: this.selectedOrigin }
      ];
      selectedArray.forEach(selection => {
        result = selection.value
          ? result.filter(x => x[selection.id] === selection.value)
          : result;
      });
      return result;
    },
    filterSelections() {
      // const data = this.filteredList;
      const data = this.list.xe;
      const filters = {
        brand: [],
        type: [],
        origin: []
      };
      Object.keys(filters).forEach(key => {
        filters[key] = data
          .map(value => value[key])
          .sort()
          .filter((item, pos, arr) => !pos || item != arr[pos - 1]);
      });
      return filters;
    }
  }
};
</script>

<style lang="scss" scoped>
select {
  width: 90%;
}
</style>
