import { type ChangeEvent, Component } from 'react';
import { connect } from 'react-redux';

import './styles.scss';
import { SearchIcon } from '@/assets/icons';
import { Input } from '@/components/ui';
import type { AppDispatch, RootState } from '@/store';
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
    this.handleHighlight = this.handleHighlight.bind(this);
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

    if (this.props.bankData) {
      const filteredBanks = this.props.bankData.features.filter((bank) => {
        const regexp = new RegExp(inputValue, 'gmi');
        return regexp.test(bank.properties.description) || regexp.test(bank.properties.title);
      });

      this.setState({
        filteredData: { ...this.props.bankData, features: [...filteredBanks] },
      });
    }

    this.props.handleSearchTerm(inputValue);
  }

  handleClick(coordinates: GeoJSON.Position) {
    this.props.handleCurrentFocus(coordinates);
  }

  handleHighlight(data: string) {
    const regex = new RegExp(this.props.searchTerm, 'gmi');

    return this.props.searchTerm
      ? data.replace(
          regex,
          (match) => `<mark class="elastic-search__results__highlight">${match}</mark>`
        )
      : data;
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
                  <p
                    dangerouslySetInnerHTML={{
                      __html: this.handleHighlight(bank.properties.title),
                    }}
                  ></p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: this.handleHighlight(bank.properties.description),
                    }}
                  ></p>
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
