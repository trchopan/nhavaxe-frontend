export default {
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
  date(value) {
    if (typeof value === "number") {
      return new Date(value).toLocaleDateString("vi-VN");
    } else {
      return "";
    }
  }
};
