// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';
// import { Provider, Dialog, Portal, Button, Paragraph } from 'react-native-paper';

// const CheckInternet = () => {
//   const [isConnected, setIsConnected] = useState(true);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       setIsConnected(state.isConnected);
//       if (!state.isConnected) {
//         setVisible(true);
//       } else {
//         setVisible(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <Provider>
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>{isConnected ? 'You are online' : 'You are offline'}</Text>

//         <Portal>
//           <Dialog visible={visible} onDismiss={() => setVisible(false)}>
//             <Dialog.Title>No Internet Connection</Dialog.Title>
//             <Dialog.Content>
//               <Paragraph>Please check your internet settings.</Paragraph>
//             </Dialog.Content>
//             <Dialog.Actions>
//               <Button onPress={() => setVisible(false)}>OK</Button>
//             </Dialog.Actions>
//           </Dialog>
//         </Portal>
//       </View>
//     </Provider>
//   );
// };

// export default CheckInternet;
