class CreateClones {
  static selectClone(obj) {
    /* determine if need to make deep clone of object or array */
    if (typeof obj === 'object') {
      if (CreateClones.isArray(obj)) {
        return CreateClones.cloneArray(obj);
      } else {
        return CreateClones.cloneObject(obj);
      }
    } else {
      return obj;
    }
  }

  static cloneArray(arr) {
    /* makes a deep clone of an array */
    let cloneA = [];

    for (let i = 0; i < arr.length; i++) {
      if (typeof arr[i] === 'object') {
        cloneA.push(CreateClones.selectClone(arr[i]));
      } else {
        cloneA.push(arr[i]);
      }
    }

    return cloneA;
  }

  static cloneObject(obj) {
    /* Creates deep clone of an object */
    let cloneObj = {};

    for (let k in obj) {
      if (typeof obj[k] === 'object') {
        cloneObj[k] = selectClone(obj[k]);
      } else {
        cloneObj[k] = obj[k];
      }
    }

    return cloneObj;
  }

  static isArray(obj) {
    //Method 1:
    return Object.prototype.toString.call(obj) === '[object Array]';
    //Method 2:
    // return Object.prototype.toString.apply(null, obj) === "[object Array]";
  }
}

//Or can use this monolithically-defined function to deep copy an object
const deepCopyObject = (cloneObj) => {
  const copyObject = (origObj) => {
    if (Object.prototype.toString.call(origObj) == '[object Array]') {
      return copyArray(origObj);
    }

    let newObj = {};
    for (let k in origObj) {
      let elem = origObj[k];
      if (typeof elem === 'object') {
        if (Object.prototype.toString.call(origObj) === '[object Array]') {
          elem = copyArray(elem);
        } else {
          elem = copyObject(elem);
        }
      }

      newObj[k] = elem;
    }

    return newObj;
  };

  const copyArray = (origArray) => {
    let newArray = [];

    for (let i = 0; i < origArray.length; i++) {
      let elem = origArray[i];
      if (typeof elem === 'object') {
        elem = copyObject(elem);
      }
      newArray.push(elem);
    }

    return newArray;
  };

  if (typeof cloneObj !== 'object') {
    return cloneObj;
  }

  if (Object.prototype.toString.call(cloneObj) === '[object Array]') {
    return copyArray(cloneObj);
  }

  return copyObject(cloneObj);
};

export default CreateClones;
