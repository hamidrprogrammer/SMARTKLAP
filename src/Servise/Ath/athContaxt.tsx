import React, { createContext, useState } from "react";
import { SignInApi, SignUpApi, UserActiveApi } from "./athServise";
import { saveToken, saveUser } from "../../core/save";

import Service from "../api";
import { StackActions, useNavigation } from "@react-navigation/native";

// Create the context
const AthContext = createContext({
  user: {},
  setLoginBody: (body: LoginBody) => {},
  fnSignInApi: () => {},
  fnCodeApi: (body: any) => {},
  setCode: (body: CodeBody) => {},
});
type LoginBody = {
  clubToken:string;
  mail: "";
  AccountTypeId: "";
  AccountId: "";
};
type CodeBody = {
  clubToken: string;
   userId:number,
   ActivationCode:number
};
type MyContextProviderProps = {
  children: React.ReactNode;

};

// Create a context provider component
const AthContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState({});
  const [loginBody, setLoginBody] = useState<LoginBody>();
  const [hasNavigated, setHasNavigated] = useState(false);

  const [code, setCode] = useState<CodeBody>();
  const navigation = useNavigation();
  function fnSignInApi() {
      
      
      
   return SignInApi(loginBody).then(res => {
      
      
      
    setUser(res?.data)
    saveUser(res.data?.id)
   
      return res?.state;
    });
   
  }
  function fnSignInApiGoogle(clubToken,
    mail,AccountId,AccountTypeId) {
      const LoginBody = {
        clubToken:clubToken,
        mail: mail,
        AccountId: AccountId,
        AccountTypeId: "2",
      };
      
      
      
   return SignInApi(LoginBody).then(res => {
      
      
      
    setUser(res?.data)
    saveUser(res.data?.id)
   
      return res?.data;
    });
   
  }
  function fnSignUpApi( clubToken,
    mail,FullName,birthDate) {
    const LoginBody = {
      clubToken:clubToken,
      mail: mail,
      FullName: FullName,
      birthDate: birthDate,
    };
      
      
      
   return SignUpApi(LoginBody).then(res => {
      
      
      
    setUser(res?.data)
    saveUser(res.data?.id)
   
      return res?.state;
    });
   
  }
  function fnSignUpApiGoogle( clubToken,
    mail,FullName,birthDate) {
    const LoginBody = {
      clubToken:clubToken,
      mail: mail,
      FullName: FullName?FullName:"Apple",
      birthDate: birthDate,
      AccountTypeId: "2",
      AccountId:mail
    };
      
      
      
   return SignUpApi(LoginBody).then(res => {
      
      
      
    setUser(res?.data)
    saveUser(res.data?.id)
   
      return res?.data;
    });
   
  }
  
  function fnCodeApi(body:any) {
    
      
      
      
   return UserActiveApi(body).then(res => {
     
      if(res.data?.token!=null){
        saveToken(res.data?.token)
        Service.api.defaults.headers.common.Authorization = `Bearer ${res.data?.token}` ;
        setTimeout(() => {
          if (!hasNavigated) {
            setHasNavigated(true);
            navigation.dispatch(
              StackActions.replace('SplashScreen')
            )
            setTimeout(() => {
              setHasNavigated(false);
            }, 5000);
          }
         
        }, 1000);
      }else{
        alert("Invalid OTP code, please check and try again.")
      }
     
     
      // Service.api.interceptors.request.use(config => {
       
      //   if (res.data?.token) {
      //     config.headers['Authorization'] = `Bearer ${res.data?.token}`;
         
         
      //   }
      
      //   return config;
      // }, error => {
      //   return Promise.reject(error);
      // });
      return res?.state;
    });
  }

  return (
    <AthContext.Provider value={{fnSignUpApi,fnSignUpApiGoogle, fnSignInApiGoogle,user, setLoginBody, fnSignInApi,setCode,fnCodeApi }}>
      {children}
    </AthContext.Provider>
  );
};

export { AthContext, AthContextProvider };
