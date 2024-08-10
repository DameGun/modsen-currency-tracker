import { Component } from 'react';
import { connect } from 'react-redux';

import { ElasticSearch, MapBox, Section } from '@/components/containers';
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
      <Section title='Search currency'>
        <ElasticSearch />
        <MapBox />
      </Section>
    );
  }
}

export default connect(null, mapDispatchToProps)(BanksMap);
