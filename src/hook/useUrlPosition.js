import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  // setSearchParams({ lat: mapLat, lng: mapLng });
  return [lat, lng];
}
