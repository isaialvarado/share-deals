import React from 'react';
import { withRouter } from 'react-router';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { keywords: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.currentUser && newProps.currentUser === null) {
      this.setState({ keywords: ''});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.receiveSearch(this.state.keywords);

    if (this.props.location.pathname !== '/search') {
      this.props.router.push('/search');
    } else {
      this.props.fetchSearchResults(
        {
          keywords: this.state.keywords,
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

  handleChange(e) {
    this.setState({ keywords: e.target.value });
  }

  render() {
    return (
      <div id='search-container'>
        <form id='search-form' onSubmit={this.handleSubmit}>
          <input
            id='search'
            type='search'
            value={this.state.keywords}
            onChange={this.handleChange}
            placeholder='  Search deals' />
        </form>
        <button id='search-submit' onClick={this.handleSubmit}>Search</button>
      </div>
    );
  }
}

export default withRouter(Search);
