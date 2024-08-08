import { Component } from 'react';
import { connect } from 'react-redux';

import './styles.scss';
import { ElasticSearch, MapBox } from '@/components/containers';
import { AppDispatch } from '@/store';
import { fetchBanksGeoData } from '@/store/banks/thunks';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchBanks: () => dispatch(fetchBanksGeoData()),
});

type PropsFromRedux = ReturnType<typeof mapDispatchToProps>;

class BanksMap extends Component<PropsFromRedux> {
  constructor(props: PropsFromRedux) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchBanks();
  }

  render() {
    return (
      <div className='banks-map'>
        <h1 className='banks-map__title'>Search currency in the bank</h1>
        <ElasticSearch />
        <MapBox />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(BanksMap);
