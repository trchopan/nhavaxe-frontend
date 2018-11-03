<template>
  <div>
    <button class="button mb-1" :class="{ 'expand-button': expand }"
      @click="expand = !expand">
      Hiển thị {{ expand ? "ngắn gọn" : " đầy đủ"}}
    </button>
    <div class="bang-gia">
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
        <th v-show="expand" class="progress-header">
          <span class="block">Tiến độ</span>
          <select v-model="selectedProgress">
            <option :value="null">-</option>
            <option v-for="option in filterSelections.progress"
              :value="option"
              :key="'progress'+option">{{ option }}</option>
          </select>
        </th>
        <th v-show="expand" class="sale-perks-header">CSBH</th>
        <th class="price-header">Giá CĐT bán<br />(tr/m2)</th>
        <th v-show="expand" class="price-header">Giá Thị <br />trường(tr/m2)</th>
        <th v-show="expand" class="contacts-header">Liên hệ</th>
        <th v-show="expand" class="others-header">Khác</th>
        <th v-show="expand" class="publish-at-header">Đăng lúc</th>
        <tr v-show="filteredList.length <= 0">
          <td colspan="10">
            Không có dữ liệu nào thoả mãn bộ lọc. Bạn vui lòng chọn lại bộ lọc.
          </td>
        </tr>
        <tr v-for="(data, index) in filteredList" :key="'bang-gia-nha-' + index"
          :class="{ unbottom: index === list.length -1, shaded: index % 2 === 0 }"
          @click="navigateLink(data.link)"> 
          <td class="project-cell">{{ data.project }}</td>
          <td class="investor-cell">{{ data.investor }}</td>
          <td class="location-cell">{{ data.location }}</td>
          <td v-show="expand" class="progress-cell">{{ data.progress }}</td>
          <td v-show="expand" class="sale-perks-cell">
            <span class="block"
              v-for="(perk, i) in data.salePerks"
              :key="'perk-' + index + i" > 
              {{ perk }}
            </span>
          </td>
          <td class="price-cell-primary">{{ data.avgPrice | parseNumber }}</td>
          <td v-show="expand" class="price-cell-secondary">
            {{ data.avgResalePrice | parseNumber }}
          </td>
          <td v-show="expand" class="contacts-cell">
            <span class="block"
              v-for="(contact, i) in data.contacts"
              :key="'contact-' + index + i" > 
              {{ contact }}
            </span>
          </td>
          <td v-show="expand" class="others-cell">
            <span class="block"
              v-for="(other, i) in data.others"
              :key="'other-' + index + i" > 
              {{ other }}
            </span>
          </td>
          <td v-show="expand" class="publish-at-cell">{{ data.publishAt }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TableNha",
  data() {
    return {
      expand: true,
      selectedProject: null,
      selectedInvestor: null,
      selectedLocation: null,
      selectedProgress: null
    };
  },
  mounted() {
    if (window.innerWidth < 600) {
      this.expand = false;
    }
  },
  computed: {
    ...mapGetters({
      loading: "bangGia/loading",
      list: "bangGia/list",
      expandBangGia: "layout/expand"
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
      // const data = this.filteredList;
      const data = this.list.nha;
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
.expand-button {
  display: none;
}
@media (max-width: 600px) {
  .expand-button {
    display: block;
  }
}
</style>
