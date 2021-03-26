const openRequest = indexedDB.open('store', 1);
let db;
let isReady = false;

const sleep = (time)=>{return new Promise((resolve)=> setTimeout(resolve, time))};

openRequest.onupgradeneeded = async () => {
  db = openRequest.result;
  if (!db.objectStoreNames.contains('images')) {
    let images = db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
    images.createIndex('name_idx', 'name');
    images.createIndex('albomId_idx', 'albomId');
    
    await sleep(60);
    isReady = true;
  }
};

openRequest.onerror = () => {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = () => {
  if (!db) {
    db = openRequest.result;
    isReady = true;
  }

  db.onversionchange = () => {
    db.close();
    alert("База данных устарела, пожалуста, перезагрузите страницу.")
  };
};

const isConnect = async () => {
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (db && isReady) {
        clearInterval(timer);
        resolve();
      }
    }, 30);
  })
}

const getImageReq = async (id) => {
  await isConnect();

  return new Promise((resolve, reject) => {
    const transactionImages = db.transaction('images', 'readwrite');
    const images = transactionImages.objectStore('images');
    const request = images.get(id);

    request.onsuccess = () => { // (4)
      resolve(request.result);
      //console.log("Книга добавлена в хранилище", request.result);
    };

    request.onerror = () => {
      reject(request.error);
      //console.log("Ошибка", request.error);
    };
  });
}

const updateImageReq = async (data) => {
  await isConnect();

  return new Promise((resolve, reject) => {
    const transactionImages = db.transaction('images', 'readwrite');
    const images = transactionImages.objectStore('images');
    const request = images.put(data);

    request.onsuccess = async () => { // (4)
      const image = await getImageReq(request.result);
      resolve(image);
      //resolve(request.result);
      //console.log("Книга добавлена в хранилище", request.result);
    };

    request.onerror = () => {
      reject(request.error);
      //console.log("Ошибка", request.error);
    };
  });
}

const addImageReq = async (data) => {

  await isConnect();

  return new Promise((resolve, reject) => {
    const transactionImages = db.transaction('images', 'readwrite');
    const images = transactionImages.objectStore('images');
    const request = images.add(data);

    request.onsuccess = async () => { // (4)
      const image = await getImageReq(request.result);
      resolve(image);
      //resolve(request.result);
      //console.log("Книга добавлена в хранилище", request.result);
    };

    request.onerror = () => {
      reject(request.error);
      //console.log("Ошибка", request.error);
    };
  });

}

const countData = () => {

  return new Promise((resolve) => {

    db.transaction(['images'], 'readonly').objectStore('images').count().onsuccess = function (e) {
      resolve(e.target.result);
    };

  });

}

const getLastImagesReq = async ()=>{
  await isConnect();
  const limit = 4;
  let res = [];

  return new Promise((resolve, reject)=>{
    const transactionImages = db.transaction('images', 'readonly');
    const images = transactionImages.objectStore('images');
    const request = images.openCursor(null, "prev");

    let i = 0;
    request.onsuccess = () => {
      let cursor = request.result;
      if (cursor) {
        res.push(cursor.value);
        i++;
        if (i >= limit) {
          resolve(res);
        } else {
          cursor.continue();
        }
      } else {
        resolve(res);
      }
    };

    request.onerror = () => {
      reject(request.error);
      //console.log("Ошибка", request.error);
    };
  });
}

const getLimitImagesReq = async (page) => {
  await isConnect();
  const limit = 3;
  const count = await countData();
  const countPages = Math.ceil(count / limit);
  let tempPage = page > countPages ? countPages : page;

  let start = (tempPage-1) * limit;

  return new Promise((resolve, reject) => {
    //console.log('page = ', page);
    const transactionImages = db.transaction('images', 'readonly');
    const images = transactionImages.objectStore('images');
    const noAlbom = images.index('albomId_idx');
    const request = noAlbom.openCursor(-1);
    const res = [];
    let hasSkipped = false;
    let i = 0;
    request.onsuccess = () => {
      let cursor = request.result;

      if (!hasSkipped && start > 0) {
        hasSkipped = true;
        cursor.advance(start);
        return;
      }
      if (cursor) {
        res.push(cursor.value);
        i++;
        if (i >= limit) {
          resolve({page:tempPage, data:res, countPages});
        } else {
          cursor.continue();
        }
      } else {
        resolve({page:tempPage, data:res, countPages});
      }
    };

    request.onerror = () => {
      reject(request.error);
      //console.log("Ошибка", request.error);
    };
  });
}

const getImagesReq = async () => {
  await isConnect();

  return new Promise((resolve, reject) => {

    const transactionImages = db.transaction('images', 'readwrite');
    const images = transactionImages.objectStore('images');
    const noAlbom = images.index('albomId_idx');
    const request = noAlbom.getAll(-1);

    request.onsuccess = () => { // (4)
      resolve(request.result);
      //console.log("Книга добавлена в хранилище", request.result);
    };

    request.onerror = () => {
      reject(request.error);
      //console.log("Ошибка", request.error);
    };
  });
}

export {
  getLastImagesReq,
  getLimitImagesReq,
  getImagesReq,
  addImageReq,
  updateImageReq
}