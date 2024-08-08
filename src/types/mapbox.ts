type BanksGeoProperties = {
  title: string;
  description: string;
};
type BanksFeature = GeoJSON.Feature<GeoJSON.Geometry, BanksGeoProperties>;

type BanksGeo = GeoJSON.FeatureCollection<GeoJSON.Point, BanksGeoProperties>;

export type { BanksFeature, BanksGeo };
