import React from "react";
import useGetAssets from "./useGetAssets";
import { Image, View, SafeAreaView } from "react-native";

const MultiImagePicker = () => {
  const [assets, loadMoreAssets, hasPermission] = useGetAssets();

  if (!hasPermission) return null;

  console.log(assets);

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
      {assets.map((item) => (
        <View
          style={{
            width: "30%",
            height: 100,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 10,
            backgroundColor: "red",
          }}
        >
          <Image
            source={{ uri: item.uri }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      ))}
    </SafeAreaView>
  );
};

export default MultiImagePicker;
