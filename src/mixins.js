export const common = {
  methods: {
    randomBanner(bannerList) {
      if (!bannerList || bannerList.length === 0) return null;
      const randomIndex = Math.floor(Math.random() * bannerList.length);
      return bannerList[randomIndex];
    }
  }
};
