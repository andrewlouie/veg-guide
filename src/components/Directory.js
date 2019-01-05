import React, { Component } from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TableRowEdit from './TableRowEdit';
import Pagination from './Pagination';
import { DIRECTORYURL, PAGESIZE } from '../constants';

class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      listings: [],
      newListing: {
        Name: '',
        Category: '',
        Address: '',
        Address2: '',
        City: '',
        Postal: '',
        Phone: '',
        Website: '',
        Facebook: '',
      },
      currentlyEditingID: -1,
      editListing: {},
      filterText: '',
      filterCategory: 0,
      page: 0,
      uniqueCategories: [],
    }
  }

  componentDidMount() {
    this.getData();
  }

  searchBoxChange = (evt) => {
    this.setState({
      filterText: evt.target.value,
      page: 0,
    });
  }

  editButtonClick = (id) => {
    this.setState((prevState) => {
      if (prevState.currentlyEditingID === id) {
        return ({
          currentlyEditingID: -1,
          editListing: {},
        });
      }
      // todo: prompt to submit changes
      return ({
        currentlyEditingID: id,
        editListing: {...prevState.listings.filter(a => a.ID === id)[0]}
      });
    });
  }

  submitButtonClick = (id) => {
    // todo: validate stuff, submit changes, clear new item, give some sorta notice.
  }

  changeInput = (id, key, value) => {
    this.setState((prevState) => {
      if (id !== null) {
        const listing = prevState.editListing;
        listing[key] = value;
        return ({
          editListing: listing,
        });
      }
      const listing = prevState.newListing;
      listing[key] = value;
      return ({
        newListing: listing,
      })
    });
  }

  changePage = (page) => {
    this.setState({
      page,
    });
  }

  selectCategory = (evt) => {
    this.setState({
      filterCategory: parseInt(evt.target.value),
    })
  }

  getData = () => {
    fetch(DIRECTORYURL)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        listings: data,
        uniqueCategories: ['All',...data.map((listing) => listing.Category).sort().filter((val, idx, self) => self.indexOf(val) === idx)],
     })
    })
    .catch((err) => {
      this.setState({
        error: true,
      });
    });
  }

  render() {
    if (this.state.listings.length) {
      let filteredResults = this.state.listings.filter((item) => item.Name.toLowerCase().includes(this.state.filterText.toLowerCase()));
      if (this.state.filterCategory) {
        filteredResults = filteredResults.filter((item) => item.Category === this.state.uniqueCategories[this.state.filterCategory]);
      }
      return (
        <div>
          <table className="Directory">
            <TableHeader filterText={this.state.filterText} searchBoxChange={this.searchBoxChange} uniqueCategories={this.state.uniqueCategories} filterCategory={this.state.filterCategory} selectCategory={this.selectCategory} />
            <tbody>
              {filteredResults.slice(this.state.page * PAGESIZE, (this.state.page * PAGESIZE) + PAGESIZE).map((listing) => {
                if (listing.ID === this.state.currentlyEditingID) {
                  return (
                    <TableRowEdit key={listing.ID} listing={this.state.editListing} editButtonClick={this.editButtonClick} submitButtonClick={this.submitButtonClick} changeInput={this.changeInput} />
                  );  
                }
                return (
                  <TableRow key={listing.ID} listing={listing} editButtonClick={this.editButtonClick} />
                );
              })}
              <TableRowEdit listing={this.state.newListing} editButtonClick={this.editButtonClick} submitButtonClick={this.submitButtonClick} changeInput={this.changeInput} />
            </tbody>
          </table>
          <Pagination totalResults={filteredResults.length} currentPage={this.state.page} changePage={this.changePage} />
        </div>
      );
    } else {
      return (
        <div className="Spinner">
          Pretty spinner
        </div>
      )
    }
  }
}

export default Directory;
