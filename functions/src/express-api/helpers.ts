export function handleNotFound(res) {
  return res.status(404).json({ error: { code: "not-found" } });
}

export function handleWrongParams(res) {
  return res.status(404).json({ error: { code: "wrong-params" } });
}

export function handleError(ApiName, res, err) {
  console.log(`${ApiName} error`, err);
  return res.status(500).json({ error: { code: "internal" }});
}

export function handleResultJson(res, result, cacheMax, cacheSMax) {
  return res
    .set("Cache-Control", `public, max-age=${cacheMax}, s-maxage=${cacheSMax}`)
    .status(200)
    .json(result);
}

export function normText(str: string): string {
  if (typeof str !== "string") {
    return "";
  }
  str = str.toLowerCase().trim();
  str = str.replace(/\s|-|_|\./g, "");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  // str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  // str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  // str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  // str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  // str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  // str = str.replace(/Đ/g, "D");
  return str;
}
