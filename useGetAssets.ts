import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Platform } from "react-native";

type ReturnType = [MediaLibrary.Asset[], (numAssets?: number) => void, boolean];

const useGetAssets = (): ReturnType => {
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [hasPermission, setHasPermission] = useState(false);

  const refreshAssets = async (numAssets = 50) => {
    const albums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });

    const album = albums.find((a) => a.title === "Recents");

    MediaLibrary.getAssetsAsync({
      mediaType: ["video", "photo"],
      first: numAssets,
      album,
    })
      .then((data) => {
        setAssets((p) => [...data.assets]);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    console.log(1);
    MediaLibrary.requestPermissionsAsync().then(
      ({ accessPrivileges, granted }) => {
        if (
          (Platform.OS === "android" && !granted) ||
          (Platform.OS === "ios" && accessPrivileges !== "all")
        ) {
          console.log(2);
          setHasPermission(false);
          return;
        }
        console.log(33);
        setHasPermission(true);
        refreshAssets();
      }
    );
  }, []);

  return [assets, refreshAssets, hasPermission];
};

export default useGetAssets;
