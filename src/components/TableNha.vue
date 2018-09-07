<template>
  <table>
    <th class="project-header">
      <span class="block">Dự án</span>
      <select v-model="selectedProject">
        <option :value="null">-</option>
        <option v-for="option in filterSelections.project"
          :value="option"
          :key="'project'+option">{{ option }}</option>
      </select>
    </th>
    <th class="investor-header">
      <span class="block">Chủ đầu tư</span>
      <select v-model="selectedInvestor">
        <option :value="null">-</option>
        <option v-for="option in filterSelections.investor"
          :value="option"
          :key="'investor'+option">{{ option }}</option>
      </select>
    </th>
    <th class="location-header">
      <span class="block">Vị trí</span>
      <select v-model="selectedLocation">
        <option :value="null">-</option>
        <option v-for="option in filterSelections.location"
          :value="option"
          :key="'location'+option">{{ option }}</option>
      </select>
    </th>
    <th class="progress-header">
      <span class="block">Tiến độ</span>
      <select v-model="selectedProgress">
        <option :value="null">-</option>
        <option v-for="option in filterSelections.progress"
          :value="option"
          :key="'progress'+option">{{ option }}</option>
      </select>
    </th>
    <th class="sale-perks-header">CSBH</th>
    <th class="price-header">Giá CĐT bán<br />(tr/m2)</th>
    <th class="price-header">Giá KH bán<br />(tr/m2)</th>
    <th class="contacts-header">Liên hệ</th>
    <th class="facilities-header">Khác</th>
    <th class="publish-at-header">Đăng lúc</th>
    <tr v-show="filteredList.length <= 0">
      <td colspan="10">
        Không có dữ liệu nào thoả mãn bộ lọc. Bạn vui lòng chọn lại bộ lọc.
      </td>
    </tr>
    <tr v-for="(data, i) in filteredList" :key="data.id"
      :class="{ unbottom: i === list.length -1, shaded: i%2 === 0 }"
      @click="navigateLink(data.link)"> 
      <td class="project-cell">{{ data.project }}</td>
      <td class="investor-cell">{{ data.investor }}</td>
      <td class="location-cell">{{ data.location }}</td>
      <td class="progress-cell">{{ data.progress}}</td>
      <td class="sale-perks-cell">
        <span class="block"
          v-for="perk in data.salePerks"
          :key="i + '-' + perk">
          {{ perk }}
        </span>
      </td>
      <td class="price-cell">{{ data.avgPrice | parseZeroPrice }}</td>
      <td class="price-cell">{{ data.avgResalePrice | parseZeroPrice }}</td>
      <td class="contacts-cell">
        <span class="block"
          v-for="contact in data.contacts"
          :key="i + '-' + contact">
          {{ contact }}
        </span>
      </td>
      <td class="facilities-cell">
        <span class="block"
          v-for="facility in data.facilities"
          :key="i + '-' + facility">
          {{ facility }}
        </span>
      </td>
      <td class="publish-at-cell">{{ data.publishAt | parseMonthYear }}</td>
    </tr>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TableNha",
  data() {
    return {
      selectedProject: null,
      selectedInvestor: null,
      selectedLocation: null,
      selectedProgress: null
    };
  },
  computed: {
    ...mapGetters({
      list: "bangGia/list"
    }),
    filteredList() {
      var result = this.list.nha;
      const selectedArray = [
        { id: "project", value: this.selectedProject },
        { id: "investor", value: this.selectedInvestor },
        { id: "location", value: this.selectedLocation },
        { id: "progress", value: this.selectedProgress }
      ];
      selectedArray.forEach(selection => {
        result = selection.value
          ? result.filter(x => x[selection.id] === selection.value)
          : result;
      });
      return result;
    },
    filterSelections() {
      const data = this.filteredList;
      const filters = {
        project: [],
        investor: [],
        location: [],
        progress: []
      };
      Object.keys(filters).forEach(key => {
        filters[key] = data
          .map(value => value[key])
          .sort()
          .filter((item, pos, arr) => !pos || item != arr[pos - 1]);
      });
      return filters;
    }
  },
  methods: {
    navigateLink(link) {
      window.open(link, "_blank");
    }
  }
};
</script>

<style lang="scss" scoped>
select {
  width: 90%;
}
</style>
