
  
 export  const calculatePoints = (chants:any): [number, number] => {
    const total = chants.reduce((acc, item) => acc + (item?.point || 0), 0);
    const point = chants.reduce((acc, item) => acc + ((item?.userChantDone ? item.point : 0) || 0), 0);
    return [total, point];
  };
  
  // Usage example:
  
  

  