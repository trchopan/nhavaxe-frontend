import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import NavBar from "@/components/NavBar.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

const stubCategories = [
  { id: "123", name: "test1", position: 0 },
  { id: "456", name: "test2", position: 1 },
  { id: "789", name: "test3", position: 2 }
];

describe("NavBar.vue", () => {
  var getters;
  var store;

  beforeEach(() => {
    getters = {
      "categories/categories": () => stubCategories
    };

    store = new Vuex.Store({
      getters
    });
  });

  it("Render the categories to the unordered list", () => {
    const wrapper = shallowMount(NavBar, { store, localVue });
    const unorderedList = wrapper.find("ul");
    expect(unorderedList.is("ul")).toBe(true);
  });

  it("Render the logo", () => {
    const wrapper = shallowMount(NavBar, { store, localVue });
    const logoItem = wrapper.findAll("li").at(0);
    expect(logoItem.find('div').classes()).toContain("logo");
  });

  it("Render the list items", () => {
    const wrapper = shallowMount(NavBar, { store, localVue });
    const listItem = wrapper.findAll("li");
    expect(listItem.at(1).text()).toBe(stubCategories[0].name);
    expect(listItem.at(2).text()).toBe(stubCategories[1].name);
    expect(listItem.at(3).text()).toBe(stubCategories[2].name);
  });
});
