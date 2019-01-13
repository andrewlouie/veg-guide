import React, { Component } from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TableRowEdit from './TableRowEdit';
import Pagination from './Pagination';
import SubmitForm from './SubmitForm';
import { DIRECTORYURL, PAGESIZE, SUBMIT_CHANGE } from '../constants';
import Spinner from 'react-spinner-material';
import SearchBox from './SearchBox';
import FilterDropDown from './FilterDropDown';
const Modal = require('react-modal');

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
      filterCategory: 11,
      page: 0,
      uniqueCategories: [],
      modalIsOpen: false,
      requesterName: '',
      requesterEmail: '',
      notes: '',
      textModalOpen: false,
      modalText: '',
    }
  }

  componentDidMount() {
    Modal.setAppElement('body');
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
    this.setState({
      modalIsOpen: true,
    });
  }

  submitInfo = () => {
    const item = (this.state.currentlyEditingID === -1 ? this.state.newListing : this.state.editListing)
    if (!item.Name) {
      this.setState({
        textModalOpen: true,
        modalText: 'Business Name is required',
        modalIsOpen: false,
      });
      return;
    }
    fetch(SUBMIT_CHANGE, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.Name,
        category: item.Category,
        address: item.Address,
        address2: item.Address2,
        city: item.City,
        postal: item.Postal,
        phone: item.Phone,
        website: item.Website,
        facebook: item.Facebook,
        notes: this.state.notes,
        record: this.state.currentlyEditingID,
        requestername: this.state.requesterName,
        requesteremail: this.state.requesterEmail,
      })
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.row) {
        this.setState({
          modalText: 'Your change has been submitted for review. Thank you.',
          textModalOpen: true,
          modalIsOpen: false,
          notes: '',
          currentlyEditingID: -1,
          editListing: {},
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
        });
      } else throw res;
    })
    .catch((err) => {
      this.setState({
        modalText: 'Error submitting change',
        textModalOpen: true,
      });
    });
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      textModalOpen: false,
    });
  }

  changeSubmitForm = (field, value) => {
    if (field === 'requesterName') {
      this.setState({
        requesterName: value,
      });
    }
    if (field === 'requesterEmail') {
      this.setState({
        requesterEmail: value,
      });
    }
    if (field === 'notes') {
      this.setState({
        notes: value,
      });
    }
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
          <SearchBox value={this.state.filterText} onChange={this.searchBoxChange} />
          <FilterDropDown options={this.state.uniqueCategories} value={this.state.filterCategory} onChange={this.selectCategory} />
          <div className="tableScroll">
            <table className="Directory" style={{width: '100%', tableLayout: 'fixed'}}>
              <TableHeader />
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
                <tr className="addNewLabelRow">
                  <td className="addNewLabel">Add New Item</td>
                </tr>
                <TableRowEdit listing={this.state.newListing} editButtonClick={this.editButtonClick} submitButtonClick={this.submitButtonClick} changeInput={this.changeInput} />
              </tbody>
            </table>
          </div>
          <Pagination totalResults={filteredResults.length} currentPage={this.state.page} changePage={this.changePage} />
          <Modal
            style={{
              content: {
                top: '32%',
                left: '30%',
                bottom: '32%',
                right: '30%',
              },
            }}
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="form">
            <SubmitForm submitInfo={this.submitInfo} changeSubmitForm={this.changeSubmitForm} notes={this.state.notes} requesterName={this.state.requesterName} requesterEmail={this.state.requesterEmail} />
          </Modal>
          <Modal
            style={{
              content: {
                top: '32%',
                left: '30%',
                bottom: '32%',
                right: '30%',
              },
            }}
            isOpen={this.state.textModalOpen}
            onRequestClose={this.closeModal}
            contentLabel="message">
              <div className="modalText">
                <div className="modalText-inner">
                  {this.state.modalText}
                </div>
              </div>
          </Modal>
          <div className="note">Note: Currently Restaurants & Cafes are only listed in the printed version if they have vegan options on the menu that are specifically marked as vegan.</div>
        </div>
      );
    } else {
      return (
        <div className="Spinner" style={{textAlgin: 'center'}}>
           <Spinner size={120} spinnerColor={"#529d38"} spinnerWidth={2} visible={true} />
        </div>
      )
    }
  }
}

export default Directory;
