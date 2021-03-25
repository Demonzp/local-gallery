const createId = (length) => {
  const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  let id = '';

  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];

  }

  return id;
}

const byteToMegaByte = (byte) => {
  return byte / 1024 / 1024;
}

const getPrettyStrNum = (num, length) => {
  let newNum = String(num);

  if (newNum.length < length) {
    newNum = `0${num}`;
  }

  return newNum;
}

const round = (num, length) => {
  let str = String(num);
  const idx = str.indexOf('.');

  if (idx < 0) {
    return num;
  }

  return Number(str.slice(0, idx) + str.slice(idx, idx + length + 1));
}

const getFileName = (fileName) => {
  const idx = fileName.indexOf('.');

  if (idx < 0) {
    return fileName;
  }

  return fileName.slice(0, idx);
}

const getFileMimeType = (mimeType) => {
  const idx = mimeType.indexOf('/');

  if (idx < 0) {
    return mimeType;
  }

  return mimeType.slice(idx + 1);
}

const getUrlParams = (location) => {
  return location
    .search
    .replace('?', '')
    .split('&')
    .reduce((p, e) => {
      const a = e.split('=');
      p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
      return p;
    },
      {}
    );
}

export {
  round,
  getPrettyStrNum,
  getFileName,
  getFileMimeType,
  getUrlParams,
  byteToMegaByte,
  createId
}