import { Component, createRef, type RefObject } from 'react';
import { connect } from 'react-redux';
import { type LngLatLike, Map, Popup } from 'mapbox-gl';

import './styles.scss';
import customMarker from '@/assets/images/bank-marker.png';
import { MAPBOX_TOKEN } from '@/constants/environment';
import { MAPBOX_CENTER_DEFAULT, MAPBOX_ZOOM_DEFAULT } from '@/constants/mapBox';
import type { RootState } from '@/store';

const mapStateToProps = (state: RootState) => ({
  banksData: state.banks.banksGeoData,
  searchTerm: state.banks.searchTerm,
  currentFocus: state.banks.currentFocus,
});

type PropsFromRedux = ReturnType<typeof mapStateToProps>;

interface MapBoxProps extends PropsFromRedux {}

class MapBox extends Component<MapBoxProps> {
  private mapContainerRef: RefObject<HTMLDivElement>;
  private map: Map | null;

  constructor(props: MapBoxProps) {
    super(props);
    this.mapContainerRef = createRef();
    this.map = null;

    this.createMap = this.createMap.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.initialAddMarkers = this.initialAddMarkers.bind(this);
    this.filterMapMarkers = this.filterMapMarkers.bind(this);
  }

  componentDidMount() {
    this.createMap();
  }

  shouldComponentUpdate(nextProps: Readonly<MapBoxProps>): boolean {
    let isUpdate: boolean = true;

    if (nextProps.searchTerm !== this.props.searchTerm) {
      this.filterMapMarkers(nextProps.searchTerm);
      isUpdate = false;
    }

    if (nextProps.currentFocus && nextProps.currentFocus !== this.props.currentFocus && this.map) {
      this.map.setCenter(nextProps.currentFocus);
      isUpdate = false;
    }

    return isUpdate;
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userPosition: LngLatLike = MAPBOX_CENTER_DEFAULT;

        userPosition[0] = position.coords.longitude;
        userPosition[1] = position.coords.latitude;

        if (this.map) {
          this.map.setCenter(userPosition);
        }
      });
    }
  }

  async createMap() {
    if (this.mapContainerRef.current) {
      const map = new Map({
        container: this.mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: MAPBOX_CENTER_DEFAULT,
        zoom: MAPBOX_ZOOM_DEFAULT,
        accessToken: MAPBOX_TOKEN,
      });

      this.map = map;

      this.map.on('load', (e) => this.initialAddMarkers(e.target));

      this.getUserLocation();
    }
  }

  initialAddMarkers(loadedMap: Map) {
    loadedMap.loadImage(customMarker, (_, image) => {
      if (image) loadedMap.addImage('custom-marker', image);

      loadedMap.addLayer({
        id: 'banks',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: this.props.banksData,
        },
        layout: {
          'icon-image': 'custom-marker',
          'text-field': ['get', 'title'],
          'text-anchor': 'top',
          'text-offset': [0, 1],
        },
      });

      this.registerMarkerClickEvent(loadedMap);
    });
  }

  filterMapMarkers(filterTerm: string) {
    if (this.map) {
      this.map.setFilter('banks', [
        'any',
        ['in', ['upcase', filterTerm], ['upcase', ['get', 'title']]],
        ['in', ['upcase', filterTerm], ['get', 'description']],
      ]);
    }
  }

  registerMarkerClickEvent(loadedMap: Map) {
    loadedMap.on('click', 'banks', (event) => {
      const eventFeature = event.features?.[0];
      if (eventFeature && eventFeature.properties) {
        const coordinates = event.lngLat;
        const description = eventFeature.properties['description'];

        new Popup().setLngLat(coordinates).setText(description).addTo(loadedMap);
      }
    });
  }

  render() {
    return (
      <div className='map-container' ref={this.mapContainerRef} data-testid='banks-map-page'></div>
    );
  }
}

export default connect(mapStateToProps)(MapBox);
