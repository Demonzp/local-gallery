import { useEffect, useState } from "react";

const useImageItems = ({ image }) => {
  const [vals, setVals] = useState();

  useEffect(() => {
    const tempVals = {};

    for (const [key, value] of Object.entries(image)) {
      if (key !== 'file' && key !== 'albomId') {
        tempVals[key] = value;
      }
    }

    setVals(tempVals);

  }, [image]);

  return {
    vals,
  }
};

export default useImageItems;