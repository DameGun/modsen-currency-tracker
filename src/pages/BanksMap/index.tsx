import { Component } from 'react';
import { connect } from 'react-redux';

import { ErrorBoundary } from '@/components/common';
import { ElasticSearch, MapBox, Section } from '@/components/containers';
import type { AppDispatch } from '@/store';
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
      <ErrorBoundary
        fallback={<h1>Some error happed while trying to create map. Please try again later</h1>}
      >
        <Section title='Search currency'>
          <ElasticSearch />
          <MapBox />
        </Section>
      </ErrorBoundary>
    );
  }
}

export default connect(null, mapDispatchToProps)(BanksMap);
