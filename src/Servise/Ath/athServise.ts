import React from 'react';
import Service from '../api';

// Helper function to handle form submission
const apiRequest = (endpoint: string, body: Record<string, any>) => {
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return Service.api.post(endpoint, formData)
    .then(res => {
        
        
        
      
      if (res.data?.data?.state === 1) {
        return { data: res.data?.data?.dataContent, state: true };
      } else {
        return { data: res.data?.data?.dataContent, state: false };
      }
    })
    .catch(err => {
        
        
        
      return { data: null, state: false };
    });
};

// Function for sign-up API
export function SignUpApi(loginBody: Record<string, any>) {
  return apiRequest('/SignUp', loginBody);
}

// Function for sign-in API
export function SignInApi(loginBody: Record<string, any>) {
  return apiRequest('/SignIn', loginBody);
}

// Function for user activation API
export function UserActiveApi(loginBody: Record<string, any>) {
    
    
    
  
  return apiRequest('/SetUserActive', loginBody);
}
