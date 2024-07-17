import { useEffect, useState } from "react";
import React from 'react';

export default function Weapon(props) {
  const [imageUrl, setImageUrl] = useState([]);
  const { weaponData, handleToggleModal } = props;

  const jsonFilePath = `weapon_data.json`;

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

  const getImageUrl = async (weaponId) => {
    const jsonWeaponData = await fetchWeaponImageData();
    const weapon = jsonWeaponData.find((weapon) => weapon.weapon_id === weaponId);
    return weapon ? weapon.image_url : null;
  };

  useEffect(() => {
    const handleFetchImage = async () => {
      if (weaponData && weaponData.weapon && weaponData.weapon.length > 0) {
        const imageUrls = [];
        for (let i = 0; i < 3; i++) {
          const weapon = weaponData.weapon[i];
          if (weapon) {
            const url = await getImageUrl(weapon.weapon_id);
            if (url) {
              imageUrls.push(url);
            } else {
              console.error(`Weapon with ID ${weapon.weapon_id} not found or missing image URL`);
            }
          }
        }
        setImageUrl(imageUrls);
      } else {
        console.log('Weapon data is not available or empty');
      }
    };

    handleFetchImage();
  }, [weaponData]);

  if (!weaponData) {
    return (
      <div>
        <p>Error, no data loaded in weapon.</p>
      </div>
    );
  }

  return (
    <>
    <div className="weapon-container">
      {imageUrl.length > 0 ? (
        imageUrl.map((url, index) => (
          <img key={index} src={url} alt={`Weapon ${index + 1}`} />
        ))
      ) : (
        <p>Loading component images...</p>
      )}
    </div>
    </>
  );
}