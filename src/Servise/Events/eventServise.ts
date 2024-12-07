import React from "react";
import Service from "../api";
import axios from "axios";

const fetchEvents = async (clubToken: string | Blob, userId: string | Blob) => {
  try {
    const formData = new FormData();
    formData.append("clubToken", clubToken);
    formData.append("userId", userId);

    const response = await Service.api.post(
      "/GetEvents",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const resp = response.data;
    
    if (resp.status === 1) {
      // Success
      const { liveEventId, events } = resp.data.dataContent;
     
      return { liveEventId: liveEventId, events: events };
    }
  } catch (error) {
      
  }

  return { liveEventId: 0, events: [] };
};
const fetchChantEvents = async (
  clubToken: string | Blob,
  userId: string | Blob,
  liveEventId: string | Blob
) => {
  try {
    const formData = new FormData();
    formData.append("clubToken", clubToken);
    formData.append("userId", userId);
    formData.append("liveEventId", liveEventId);

    const response = await Service.api.post(
      "/GetChantEvents",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    
    if (response.data) {
      // Success
      return response.data.data.dataContent;
    }
  } catch (error) {
      
  }

  return [];
};
const getAllChants = async (clubToken: any, userId: any, inputSearch: any) => {
  try {
    const response = await Service.api.post("/GetAllChants", {
      clubToken,
      userId,
      inputSearch,
    });
    
    if (response.data ) {
      return response.data.data.dataContent;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};
const getChantContent = async (
  clubToken: any,
  userId: any,
  chantId: any,
  liveEventId: any
) => {
  try {
    const response = await Service.api.post("/GetChant_Content", {
      clubToken,
      userId,
      chantId,
      liveEventId,
    });
   
    if (response.data ) {
      return response.data.data.dataContent;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};
export const getUserRank = async (clubToken: any, userId: any) => {
  try {
    const response = await Service.api.post("/GetUserRank", {
      clubToken,
      userId,
    });
   
    if (response.data) {
      return response.data.data.dataContent;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};
const getShopCategories = async (
  clubToken: string | Blob,
  userId: string | Blob,
  shopId: string | Blob
) => {
  try {
    const formData = new FormData();
    formData.append("clubToken", clubToken);
    formData.append("userId", userId);
    formData.append("shopId", shopId);

    const response = await Service.api.post("/GetShopCategories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data && response.data.status === 1) {
      return response.data.data.dataContent;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};


  async function Club_OnBoarding() {
    const url = '/GetOnBoardingContent';
    const data = {
      clubToken: "abcdefg",
    };
    return await postFormData(url, data);
  }
export const getShopProducts = async (
  clubToken: string | Blob,
  userId: string | Blob,
  shopId: string | Blob,
  categoryId: string | Blob,
  inputSearch: string | Blob
) => {
  try {
    const formData = new FormData();
    formData.append("clubToken", clubToken);
    formData.append("userId", userId);
    formData.append("shopId", shopId);
    formData.append("categoryId", categoryId);
    formData.append("inputSearch", inputSearch);

    const response = await Service.api.post("/GetShopProducts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
   

      
      return response.data.data.dataContent;
  
  } catch (error) {
    console.error(error);
  }

  return null;
};
const getClubInfo = async (
  clubToken: string | Blob,    userId: number|string) => {
  try {
    const formData = new FormData();
    formData.append("clubToken", clubToken);
    formData.append("userId", userId+"");

    const response = await Service.api.post("/GetActiveShop", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });


      return response.data.data.dataContent;
 
  } catch (error) {
    console.error(error);
  }

  return null;
};
const getShopProductInfo = async (
  clubToken: string | Blob,
  userId: string | Blob,
  shopId: string | Blob,
  productId: string | Blob
) => {
  try {
    const formData = new FormData();
    formData.append("clubToken", clubToken);
    formData.append("userId", userId);
    formData.append("shopId", shopId);
    formData.append("productId", productId);

    const response = await Service.api.post("/GetShopProductInfo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });


      return response.data.data.dataContent;
 
  } catch (error) {
    console.error(error);
  }

  return null;
};
const getUserAllOrders = async (
  clubToken: string | Blob,
  userId: string | Blob,
  shopId: string | Blob,
  shipping: string | Blob
) => {
  try {
    const formData = new FormData();
    formData.append("clubToken", clubToken);
    formData.append("userId", userId);
    formData.append("shopId", shopId);
    formData.append("shipping", shipping);

    const response = await Service.api.post("/GetUserAllOrders",  formData);
  

      return response.data.data.dataContent;
    
  } catch (error) {
    console.error(error);
  }

  return null;
};

const getOrderDetail = async (
  clubToken: string | Blob,
  userId: string | Blob,
  shopId: string | Blob,
  orderId: string | Blob
) => {
  try {
    const formData = new FormData();
    formData.append('clubToken', clubToken);
    formData.append('userId', userId);
    formData.append('shopId', shopId);
    formData.append('orderId', orderId);

    const response = await axios.post('/GetOrderdetail', formData, {
      headers: {
        Authorization: 'Bearer <token>', // Replace <token> with the actual authorization token
      },
    });

    const data = response.data;
    if (data && data.status === 1) {
      return data.data.dataContent;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};

const addProductInUserOrder = async (
  clubToken: string | Blob,
  userId: string | Blob,
  shopId: string | Blob,
  productId: string | Blob
) => {
  try {
    const formData = new FormData();
    formData.append('clubToken', clubToken);
    formData.append('userId', userId);
    formData.append('shopId', shopId);
    formData.append('productId', productId);

    const response = await Service.api.post('/AddProductInUserOrder', formData);

    const data = response.data;
    if (data && data.status === 1) {
      return data.data.dataContent;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};

const removeProductFromUserOrder = async (
  clubToken: string | Blob,
  userId: string | Blob,
  shopId: string | Blob,
  productId: string | Blob
) => {
  try {
    const formData = new FormData();
    formData.append('clubToken', clubToken);
    formData.append('userId', userId);
    formData.append('shopId', shopId);
    formData.append('productId', productId);

    const response = await Service.api.post('/RemoveProductFromUserOrder', formData);
   
    const data = response.data;
    if (data ) {
      return data.data.dataContent;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};

const setOrderAddress = async (
  clubToken: string | Blob,
  userId: string | Blob,
  shopId: string | Blob,
  orderId: string | Blob,
  deliverType: string | Blob,
  address: string | Blob
) => {
  try {
    const formData = new FormData();
    formData.append('clubToken', clubToken);
    formData.append('userId', userId);
    formData.append('shopId', shopId);
    formData.append('orderId', orderId);
    formData.append('deliver_Type', deliverType);
    formData.append('Address', address);

    const response = await Service.api.post('/SetOrderAddress', formData);

    const data = response.data;
    if (data ) {
      return data.data.dataContent;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};

const editUserProfile = async (
  clubToken: string | Blob,
  userId: string | Blob,
  file: string | Blob
) => {
  try {
    const formData = new FormData();
    formData.append('clubToken', clubToken);
    formData.append('userId', userId);
    formData.append('file', file);

    const response = await axios.post('/EditUserProfile', formData, {
      headers: {
        Authorization: 'Bearer <token>', // Replace <token> with the actual authorization token
      },
    });

    const data = response.data;
    if (data && data.status === 1) {
      return data.data.dataContent.User;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
};

const getAllNews = async (
  clubToken: string | Blob,
  userId: string | Blob,
  inputSearch: string | Blob
) => {
 
 
    
  try {
    const response = await Service.apiNews.get('fs/articles?size=20&content_type=spark_post,live_blog&uri=soccer/all/teams/63');
      
    return response.data?.data?.results;
  } catch (error) {
    console.error("news",error);
  }

  
};
const addVideo = async (
  clubToken: string | Blob,
  userId: string | Blob,
  title: string | Blob,
  description: string | Blob,
  tags: string | Blob,
  file: string | Blob
) => {
  try {
    const formData = new FormData();
    formData.append('clubToken', clubToken);
    formData.append('userId', userId);
    formData.append('file', {
      uri: file,
      type: 'video/mp4',
      name: 'video.mp4',
    });
      
    
    const response = await Service.api.post('/AddVideo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 110000, // 30 seconds timeout
    });
  
    const data = response.data;
    if (data && data.status === 1) {
      return data.data.state === 1;
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error(error);
  }

  return false;
};

async function postFormData(
  url: string,
  data: { [x: string]: string | Blob; clubToken?: any; userId?: any; myVideo?: any; videoId?: any; like?: any }
) {
  try {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const response = await Service.api.post(url, formData);
    console.error('response:', response);
    const responseData = response?.data?.data?.dataContent;
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

 async function getActiveVideo(clubToken: any, userId: any, myVideo: any) {
  const url = '/GetActiveVideo';
  const data = {
    clubToken: clubToken,
    userId: userId,
    myVideo: myVideo,
  };
  return await postFormData(url, data);
}

 async function getVideoContent(clubToken: any, userId: any, videoId: any) {
  const url = '/GetVideoContent';
  const data = {
    clubToken: clubToken,
    userId: userId,
    videoId: videoId,
  };
  return await postFormData(url, data);
}

 async function setVideoLike(clubToken: any, userId: any, videoId: any, like: any) {
  const url = '/SetVideoLike';
  const data = {
    clubToken: clubToken,
    userId: userId,
    videoId: videoId,
    like: like,
  };
  return await postFormData(url, data);
}

async function setVideoSeen(clubToken: any, userId: any, videoId: any) {
  const url = '/SetVideoSeen';
  const data = {
    clubToken: clubToken,
    userId: userId,
    videoId: videoId,
  };
  return await postFormData(url, data);
}
async function GetUserPoints(clubToken: any, userId: any) {
  const url = '/GetUserPoints';
  const data = {
    clubToken: clubToken,
    userId: userId
  };
  return await postFormData(url, data);
}

async function GetUserRank(clubToken: any, userId: any) {
  const url = '/GetUserRank';
  const data = {
    clubToken: clubToken,
    userId: userId
  };
  return await postFormData(url, data);
}
async function SetUserChantLog( clubToken: any, userId: any, chantId: any,EventChantId: any, like: any) {
  const url = '/SetUserChantLog';
  const data = {
    clubToken: clubToken,
    userId: userId,
    chantId:chantId,
    eventChantId:EventChantId,
    like:true,
  };
  return await postFormData(url, data);
}
export default {
  fetchEvents,
  fetchChantEvents,
  getChantContent,
  getAllChants,
  getUserRank,
  GetUserRank,
  getShopCategories,
  getShopProducts,
  Club_OnBoarding,
  getShopProductInfo,
  getUserAllOrders,
  getOrderDetail,
  addProductInUserOrder,
  removeProductFromUserOrder,
  setOrderAddress,
  editUserProfile,
  getAllNews,
  addVideo,
  GetUserPoints,
  getClubInfo,
  getActiveVideo,setVideoSeen,getVideoContent,SetUserChantLog,
};
