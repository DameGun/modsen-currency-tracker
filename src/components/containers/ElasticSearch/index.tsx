import { ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';

import './styles.scss';
import { SearchIcon } from '@/assets/icons';
import { Input } from '@/components/ui';
import { AppDispatch, RootState } from '@/store';
import { setCurrentFocus, setSearchTerm } from '@/store/banks';
import type { BanksGeo } from '@/types/mapbox';

const mapStateToProps = (state: RootState) => ({
  bankData: state.banks.banksGeoData,
  searchTerm: state.banks.searchTerm,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  handleSearchTerm: (searchTerm: string) => dispatch(setSearchTerm(searchTerm)),
  handleCurrentFocus: (coordinates: GeoJSON.Position) => dispatch(setCurrentFocus(coordinates)),
});

type PropsFromRedux = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

interface ElasticSearchProps extends PropsFromRedux {}

interface ElasticSearchState {
  filteredData?: BanksGeo;
}

class ElasticSearch extends Component<ElasticSearchProps, ElasticSearchState> {
  constructor(props: ElasticSearchProps) {
    super(props);
    this.state = {
      filteredData: this.props.bankData,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(
    props: ElasticSearchProps,
    state: ElasticSearchState
  ): ElasticSearchState | null {
    if (!Object.is(props.bankData, state.filteredData) && props.searchTerm === '') {
      const updatedState = state;
      updatedState.filteredData = props.bankData;

      return updatedState;
    }

    return null;
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    if (this.state.filteredData) {
      const filteredBanks = this.state.filteredData.features.filter((bank) =>
        bank.properties.description.includes(inputValue.toUpperCase())
      );

      this.setState({
        filteredData: { ...this.state.filteredData, features: [...filteredBanks] },
      });
    }

    this.props.handleSearchTerm(e.target.value);
  }

  handleClick(coordinates: GeoJSON.Position) {
    this.props.handleCurrentFocus(coordinates);
  }

  render() {
    return (
      <div className='elastic-search'>
        <Input
          id='search-term'
          name='search-term'
          onChange={this.handleChange}
          placeholder='Currency search...'
          autoComplete='off'
          IconComponent={<SearchIcon />}
        />
        {this.state.filteredData && (
          <ul className='elastic-search__results'>
            {this.state.filteredData.features.length > 0 ? (
              this.state.filteredData.features.map((bank) => (
                <li
                  key={bank.properties.title}
                  onClick={this.handleClick.bind(this, bank.geometry.coordinates)}
                >
                  {bank.properties.title}
                </li>
              ))
            ) : (
              <li>No banks was found...</li>
            )}
          </ul>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElasticSearch);
