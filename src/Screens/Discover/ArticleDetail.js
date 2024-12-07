/** TODO:
 *
 * [x] Header image and buttons
 * [x] Title section
 * [x] Author section
 * [x] Article contect section
 * [x] Bottom button section
 */
import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image,TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import MaskedView from "@react-native-community/masked-view";

import { Fonts, Images, Metrics, Colors } from "@/Constants";
import { McText, McImage } from "@/Components"
import BackButton from "../../Components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";

const ArticleDetail = ({ navigation, route }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const receivedData = route.params?.data || null;

  useEffect(() => {
    let { selectedArticle } = route.params;
    setSelectedArticle(selectedArticle);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 8, backgroundColor: "#fff" }}>
      <Container>
        {/* Header image and buttons */}
        <ScrollView
          contentContainerStyle={{
            backgroundColor: "#fff",

            paddingBottom: 20,
          }}
        >
          <HeaderImage source={{ uri:  receivedData?.thumbnail?.content?.url}}></HeaderImage>
          <HeaderButtonSection
            style={{
              position: "absolute",
              backgroundColor: "#fff",
              borderRadius: 100,
              top: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ width: 30, height: 30 }}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  tintColor: "black",
                }}
                source={require("../../../assets/arrow_back.png")}
              />
            </TouchableOpacity>
          </HeaderButtonSection>

          {/* Title section */}
          <View
            style={{
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              backgroundColor: "#fff",
              position: "absolute",
              width: "100%",
              height:"100%",
              top:300
            }}
          ></View>
          <TitleSection>
            <McText color="#000" bold size={18}>
              {"Sport : "}
              {receivedData?.title}
            </McText>
          </TitleSection>
          {/* Author section */}
          <AuthorSection>
            <View style={{ flexDirection: "row" }}>
              <McImage
                source={{ uri: receivedData?.thumbnail?.content?.url }}
                style={{
                  marginRight: 14,
                  width: 37,
                  height: 37,
                  borderRadius: 8,
                }}
              ></McImage>
              <View>
                <McText size={12} color="#000">
                  {moment(receivedData?.created_date).format("MMMM DD, YYYY")}
                </McText>
              </View>
            </View>
          </AuthorSection>
          {/* Article contect section */}

          <View style={{ height: `100%` }}>
            <McText
              size={14}
              color="#000"
              style={{
                padding: 10,
                lineHeight: 29,
              }}
            >
              {receivedData?.dek+" "+receivedData?.fn__section_description}
            </McText>
          </View>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;

`;
const HeaderImage = styled.Image`
  width: 100%;
  height: 342px;

  top: 0px;
  left: 0px;
`;
const HeaderButtonSection = styled.View`
  margin: 0px 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
`;
const ShareCircle = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 52px;
  background-color: ${(props) => Colors.blue};
  justify-content: center;
  align-items: center;
`;
const TitleSection = styled.View`
  margin: 10px 16px 0px;
`;
const AuthorSection = styled.View`
  height: 38px;
  margin: 15px 16px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const BottomButton = styled.TouchableOpacity`
  width: 262px;
  height: 56px;
  border-radius: 27.5px;
  background-color: ${(props) => Colors.blue};
  margin: 0px 56px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 22px;
`;
export default ArticleDetail;
