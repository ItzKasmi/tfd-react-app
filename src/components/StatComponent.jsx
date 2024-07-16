import { useEffect, useState } from "react";
import React from 'react';

export default function StatComponent(props) {
  const [reactorImageUrl, setReactorImageUrl] = useState(null);
  const [componentImages, setComponentImages] = useState([]);
  const { reactorData, componentData } = props;

  const reactorFilePath = 'reactor_data.json';
  const componentFilePath = 'component_data.json';

  const fetchReactorImageData = async () => {
    try {
      const res = await fetch(reactorFilePath);
      const jsonData = await res.json();
      return jsonData;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  const fetchComponentImageData = async () => {
    try {
      const res = await fetch(componentFilePath);
      const jsonData = await res.json();
      return jsonData;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  const getReactorImageUrl = async (reactorId) => {
    const jsonReactorData = await fetchReactorImageData();
    const reactor = jsonReactorData.find((reactor) => reactor.reactor_id === reactorId);
    return reactor ? reactor.image_url : null;
  }

  const getComponentImageUrl = async (componentId) => {
    const jsonComponentData = await fetchComponentImageData();
    const component = jsonComponentData.find((component) => component.external_component_id === componentId);
    return component ? component.image_url : null;
  }

  useEffect(() => {
    const handleFetchReactorImage = async () => {
      if (reactorData) {
        const url = await getReactorImageUrl(reactorData.reactor_id);
        if (url) {
          setReactorImageUrl(url);
        } else {
          console.error('Reactor not found or missing image URL');
        }
      } else {
        console.log('Reactor data is not available or empty')
      }
    };

    handleFetchReactorImage();
  }, [reactorData]);

  useEffect(() => {
    const handleFetchComponentImages = async () => {
      if (componentData && componentData.external_component && componentData.external_component.length > 0) {
        const imageUrls = [];
        for (let i = 0; i < 4; i++) {
          const component = componentData.external_component[i];
          if (component) {
            const url = await getComponentImageUrl(component.external_component_id);
            if (url) {
              imageUrls.push(url);
            } else {
              console.error(`Component with ID ${component.external_component_id} not found or missing image URL`);
            }
          }
        }
        setComponentImages(imageUrls);
      } else {
        console.log('Component data is not available or empty');
      }
    };

    handleFetchComponentImages();
  }, [componentData]);

  if (!reactorData && !componentData) {
    return (
      <div>
        <p>Error, no data loaded in statComponent.</p>
      </div>
    )
  }

  return (
    <div className="statcomponent-container">
      {reactorImageUrl ? (
        <img src={reactorImageUrl} alt={`Reactor ${reactorData.reactor_id}`} />
      ) : (
        <p>Loading reactor image...</p>
      )}
      <hr />
      {componentImages.length > 0 ? (
        componentImages.map((url, index) => (
          <img key={index} src={url} alt={`Component ${index + 1}`} />
        ))
      ) : (
        <p>Loading component images...</p>
      )}
    </div>
  )
}