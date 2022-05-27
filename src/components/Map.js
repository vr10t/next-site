import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useState, useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
export default function Map() {
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const loader = new Loader({
    apiKey: googleApiKey,
    version: "weekly",
    libraries: ["places"],
  });
  loader.load();
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState();
 

  const Map = ({
    onClick,
    onIdle,
    children,
    style,
    ...options
  }) => {};
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  const render = (status) => {
    return <div ref={ref} style={style} />;
  };
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);
  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );
  
      if (onClick) {
        map.addListener("click", onClick);
      }
  
      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <Wrapper apiKey={googleApiKey} libraries={["places"]} render={render}>
     <Map />
    </Wrapper>
  );
}
