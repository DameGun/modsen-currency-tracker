import { LngLatLike } from 'mapbox-gl';
import { BanksGeo } from './mapbox';

type BanksState = {
  searchTerm: string;
  banksGeoData?: BanksGeo;
  currentFocus?: LngLatLike;
};

export type { BanksState };
