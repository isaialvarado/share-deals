import React from 'react';
import { withRouter } from 'react-router';

class DealDetail extends React.Component {
  componentDidMount() {
    this.props.fetchDeal(this.props.params.dealId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.dealId !== newProps.params.dealId) {
      this.props.fetchDeal(newProps.params.dealId);
    }
  }

  render() {
    const currentUser = this.props.currentUser;
    const deal = this.props.dealDetail;

    let authorActions;
    if (currentUser && currentUser.id === deal.authorId) {
      authorActions = (
        <div id='deal-detail-author-actions'>
          <button
            onClick={() => this.props.router.push(`/edit-deal/${deal.id}`)}>
            Edit Deal
          </button>
          <button
            onClick={() => this.props.deleteDeal(deal.id)
              .then(this.props.router.push('/'))}>
              Delete Deal
          </button>
        </div>
      );
    }

    return (
      <section id='deal-detail-container'>
        <div id='deal-detail'>
          <div id='deal-detail-user-actions'>
            {authorActions}
            <div id='deal-detail-stats'>
              <h2>thumbs</h2>
              <h2>comments</h2>
            </div>
          </div>
          <img src={deal.cloudUrl} />
          <h1 id='deal-detail-title'>{deal.title}</h1>
          <h2 id='deal-detail-price'>${deal.price} at {deal.vendor}</h2>
          <a id='buy-now' href={deal.dealUrl}>Buy Now</a>
          <div id='deal-detail-info'>
            <h2>Description</h2>
            <br />
            <p>{deal.description}</p>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(DealDetail);
