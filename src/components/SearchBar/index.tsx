import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { UPC } from '../../state/actions/types';
import { timeout } from '../../util';
import { getProductDetails } from '../../state/actions';
import LoadingIndicator from '../auth/Loading';

import './search-bar.scss';

interface PSearchBar {
  getProductDetails: (a: UPC) => any;
  waiting: boolean;
  lastItemScanned: string;
  lastTimeSaved: string;
}
interface SSearchBar {
  upcInputValue: string;
}

export class SearchBar extends PureComponent<PSearchBar, SSearchBar> {
  state = {
    upcInputValue: ''
  };

  upcInput: HTMLInputElement;

  componentDidMount() {
    this.upcInput.focus();
  }

  handleChange = async e => {
    const inputValue = e.currentTarget.value;

    this.setState({ upcInputValue: inputValue });

    if (!isNaN(Number(inputValue)) && inputValue.length === 12) {
      this.props.getProductDetails({ upc: inputValue.toString() });

      await timeout(100);

      this.setState({ upcInputValue: '' });
    } else if (isNaN(Number(inputValue))) {
      /* If the input is not a number  */
      alert(`Looks like you didn't quite scan the UPC. Try again please.`);
      this.setState({ upcInputValue: '' });
    }
  };

  render() {
    const { waiting, lastTimeSaved, lastItemScanned } = this.props;

    return (
      <section id="search-section">
        <div id="last-time-saved">
          {waiting ? (
            <LoadingIndicator waiting={waiting} message={'Saving...'} />
          ) : (
            <p>Last saved at: {lastTimeSaved}</p>
          )}
        </div>
        <input
          id="upcInput"
          pattern="\d"
          maxLength={12}
          name="upc"
          placeholder="upc"
          value={this.state.upcInputValue}
          ref={input => {
            this.upcInput = input;
          }}
          onChange={e => this.handleChange(e)}
        />
        <div id="last-item-scanned">
          <p>Last item scanned</p>
          <p className="upc">UPC: {lastItemScanned}</p>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  lastTimeSaved: state.table.lastTimeSaved,
  lastItemScanned: state.table.lastItemScanned,
  waiting: state.auth.waiting
});

export default connect(mapStateToProps, {
  getProductDetails
})(SearchBar);
