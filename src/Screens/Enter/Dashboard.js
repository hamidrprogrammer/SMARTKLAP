import React from 'react'
import Background from '../../Components/Background'
import Logo from '../../Components/Logo'
import Header from '../../Components/Header'
import Paragraph from '../../Components/Paragraph'
import Button from '../../Components/Button'

export default function Dashboard({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  )
}
