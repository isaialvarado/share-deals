import React from 'react';
import DealsIndexItem from './deals_index_item';
import FilterContainer from '../search/filter_container';

class DealsIndex extends React.Component {
  componentDidMount() {
    if (this.props.location.pathname === '/') {
      this.props.fetchDeals();
    }

    if (this.props.location.pathname === '/search') {
      this.props.fetchSearchResults(
        {
          keywords: this.props.search,
          filter: {
            minRating: 0,
            category: 'All',
            minPrice: 0,
            maxPrice: ''
          }
        }
      );
    }
  }

  componentWillReceiveProps(newProps) {
    const oldPath = this.props.location.pathname;
    const newPath = newProps.location.pathname;
    const newUser = (this.props.currentUserId !== newProps.currentUserId);

    if (oldPath !== '/search' && newPath === '/search') {
      this.props.fetchSearchResults(
        {
          keywords: newProps.search,
          filter: {
            minRating: 0,
            category: 'All',
            minPrice: 0,
            maxPrice: ''
          }
        }
      );
    }
    if ((oldPath === '/search' && newPath === '/') || (newUser && newPath === '/')) {
      this.props.fetchDeals();
    }
  }

  render () {
    const deals = this.props.deals.map(deal => (
      <DealsIndexItem deal={deal} key={deal.id} />
    ));

    let headerText, filter;
    if (this.props.location.pathname === '/search') {
      if (this.props.search) {
        headerText = "'" + this.props.search + "' search results";
      } else {
        headerText = 'Search Results';
      }
      filter = <FilterContainer />;
    } else {
      headerText = 'Popular Deals';
    }

    return (
      <section id='index-container'>
        {filter}
        <div id='index'>
          <h1 className='index-header'>{headerText}</h1>
          {deals}
        </div>
      </section>
    );
  }
}

export default DealsIndex;
