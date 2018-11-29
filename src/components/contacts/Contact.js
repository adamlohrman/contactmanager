import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';

class Contact extends Component {
   state = {
      showContactInfo: false
   };

   // A GOOD EXAMPLE TO TRY AND CATCH!!! YAY, IT'S NICE TO SEE IT ACTUALLY USED IN AN APPLICATION, OF COURSE, IF THIS WERE A PRODUCTION APP, YOU WOULD NEVER DO THIS. MAINLY BECAUSE YOU WOULD BE PERSISTING IT TO A DB!!! BUT, STILL, IT WORKS WELL HERE, IN ORDER TO KEEP OUR APP FROM BREAKING!!!!

   onDeleteClick = async (id, dispatch) => {
      try {
         await axios.delete(`http://jsonplaceholder.typicode.com/users/${id}`);
      } catch (e) {
         console.log("You can't really delete the website's shit...");
      } finally {
         dispatch({
            type: 'DELETE_CONTACT',
            payload: id
         });
      }
   };

   render() {
      const { name, email, phone, id } = this.props.contact;
      const { showContactInfo } = this.state;

      return (
         <Consumer>
            {value => {
               const { dispatch } = value;
               return (
                  <div className="card card-body mb-3">
                     <h4>
                        {name}{' '}
                        <i
                           onClick={() =>
                              this.setState({
                                 showContactInfo: !this.state.showContactInfo
                              })
                           }
                           className="fas fa-sort-down"
                           style={{ cursor: 'pointer' }}
                        />
                        <i
                           className="fas fa-times"
                           style={{
                              cursor: 'pointer',
                              float: 'right',
                              color: 'red'
                           }}
                           onClick={this.onDeleteClick.bind(this, id, dispatch)}
                        />
                        <Link to={`contact/edit/${id}`}>
                           <i
                              className="fas fa-pencil-alt"
                              style={{
                                 float: 'right',
                                 cursor: 'pointer',
                                 color: 'black',
                                 marginRight: '1rem'
                              }}
                           />
                        </Link>
                     </h4>
                     {showContactInfo ? (
                        <ul className="list-group">
                           <li className="list-group-item">{email}</li>
                           <li className="list-group-item">{phone}</li>
                        </ul>
                     ) : null}
                  </div>
               );
            }}
         </Consumer>
      );
   }
}

Contact.propTypes = {
   contact: PropTypes.object.isRequired
};

export default Contact;
