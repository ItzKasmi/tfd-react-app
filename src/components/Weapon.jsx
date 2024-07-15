import { useEffect, useState } from "react";
import React from 'react';

export default function Weapon(props) {
  const [imageUrl, setImageUrl] = useState(null);
  const { weaponData } = props;

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
        const url = await getImageUrl(weaponData.weapon[0].weapon_id);
        if (url) {
          setImageUrl(url);
        } else {
          console.error('Weapon not found or missing image URL');
        }
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
    <div>
      {imageUrl && <img src={imageUrl} alt={`Weapon ${weaponData.weapon[0].weapon_id}`} />}
    </div>
  );
}