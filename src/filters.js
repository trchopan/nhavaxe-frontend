import Vue from "vue";

const filters = {
  parsePublishAt(value) {
    let lenght = Date.now() - value;
    let minutes = lenght / 60 / 1000;
    let hours = minutes / 60;
    let days = hours / 24;
    if (days > 7) {
      return new Date(value).toLocaleDateString();
    }
    if (days > 1) {
      return Math.floor(days) + " ngày trước";
    }
    if (hours > 1) {
      return Math.floor(hours) + " giờ trước";
    }
    return Math.floor(minutes) + " phút trước";
  },
  parseMonthYear(value) {
    const date = new Date(value);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return month + "/" + year;
  },
  trimText(value, amount) {
    if (!value) {
      return "";
    }
    let finalText = value.substr(0, amount);
    if (value.length >= amount && amount > 0) {
      finalText += "...";
    }
    return finalText;
  },
  timeString(value) {
    if (typeof value === "number") {
      let time = new Date(value);
      let dateString = time.toLocaleDateString();
      let timeString = time.toLocaleTimeString();
      let result = `${dateString} ${timeString}`;
      return result;
    } else {
      return "";
    }
  },
  parseNumber(value) {
    const val = typeof value === "string" ? parseInt(value, 10) : value;
    if (!val || val === 0) {
      return "-";
    } else {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  parseYoutubeLink(url) {
    if (!url || typeof url !== "string") return "";
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    const embedOptions = "?autoplay=1&rel=0&showinfo=0";
    if (match && match[7].length == 11) {
      return "https://www.youtube.com/embed/" + match[7] + embedOptions;
    } else {
      return "";
    }
  },
  parseRedirectBannerId(bannerId) {
    return process.env.VUE_APP_API + "/click/" + bannerId;
  },
  randomBanner(bannerList) {
    const randomIndex = Math.floor(Math.random() * bannerList.length);
    return bannerList[randomIndex];
  }
};

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
