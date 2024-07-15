import { useEffect, useState } from "react";
import React from 'react';

export default function Descendant(props) {
  const [imageUrl, setImageUrl] = useState(null);
  const { descendantData } = props;

  const jsonFilePath = `descendant_data.json`;

  const fetchWeaponImageData = async () => {
    try {
      const res = await fetch(jsonFilePath);
      const jsonData = await res.json();
      console.log("JSON Data: ", jsonData);
      return jsonData;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };

  const getImageUrl = async (descendantId) => {
    console.log("Fetching image URL for descendantId: ", descendantId);
    const jsonDescendantData = await fetchWeaponImageData();
    const descendant = jsonDescendantData.find((descendant) => descendant.descendant_id === descendantId);
    console.log("We are in the getImageUrl");
    return descendant ? descendant.descendant_image_url : null;
  };

  useEffect(() => {
    console.log("useEffect is running");
    const handleFetchImage = async () => {
      if (descendantData) {
        console.log("Fetching image URL");
        const url = await getImageUrl(descendantData.descendant_id);
        if (url) {
          setImageUrl(url);
          console.log("Image has been set");
        } else {
          console.error('Descendant not found or missing image URL');
        }
      } else {
        console.log('Descendant data is not available or empty');
      }
    };

    handleFetchImage();
  }, [descendantData]);

  if (!descendantData) {
    return (
      <div>
        <p>Error, no data loaded in descendant.</p>
      </div>
    );
  }

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt={`Descendant ${descendantData.descendant_id}`} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}