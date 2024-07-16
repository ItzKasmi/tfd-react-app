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
      return jsonData;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };

  const getImageUrl = async (descendantId) => {
    const jsonDescendantData = await fetchWeaponImageData();
    const descendant = jsonDescendantData.find((descendant) => descendant.descendant_id === descendantId);
    return descendant ? descendant.descendant_image_url : null;
  };

  useEffect(() => {
    const handleFetchImage = async () => {
      if (descendantData) {
        const url = await getImageUrl(descendantData.descendant_id);
        if (url) {
          setImageUrl(url);
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