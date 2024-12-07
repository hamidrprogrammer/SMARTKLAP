import { ReactNode, useContext, useEffect } from "react";

interface OnbordeingProps {
  children: ReactNode;
}
import { OnboardFlow } from "react-native-onboard";
import { EventContext } from "../../../Servise/Events/eventContaxt";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../Constants";
import { Button } from "react-native-paper";
import { View } from "react-native";
import { Text } from "react-native";

export function Onbordeing({ children }: OnbordeingProps) {
  const { onBoarding } = useContext(EventContext);
  const navigation = useNavigation();
  useEffect(() => {
      
      
      
  }, [onBoarding]);

  return (
    <View style={{ flex: 1,backgroundColor: "#fff" }}>
      <OnboardFlow
        pages={onBoarding}
        enableScroll
        primaryButtonStyle={{borderRadius:10}}
        
        type={"fullscreen"}
      
        style={{ flex: 1,backgroundColor: "#fff" }}
        
        onDone={() => {
          navigation.navigate("ScreenEnter");
        }}
        pageStyle={{borderRadius:100}}
        titleStyle={{ color: Colors.black,fontFamily:"Poppins-Black" ,fontSize:17}}
        subtitleStyle={{fontSize:13}}
       
        paginationSelectedColor={Colors.platform.android.primary}
        primaryColor={Colors.platform.android.primary}
        
      />
      </View>
 
  );
}
