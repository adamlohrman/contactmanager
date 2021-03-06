import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layouts/TextInputGroup';
// import uuid from 'uuid';
import axios from 'axios';

class EditContact extends Component {
   state = {
      name: '',
      email: '',
      phone: '',
      errors: {}
   };

   async componentDidMount() {
      const { id } = this.props.match.params;
      const res = await axios.get(
         `https://jsonplaceholder.typicode.com/users/${id}`
      );

      const contact = res.data;
      this.setState({
         name: contact.name,
         email: contact.email,
         phone: contact.phone
      });
   }

   onSubmit = async (dispatch, e) => {
      e.preventDefault();

      const { name, email, phone } = this.state;

      // CHECK FOR ERRORS
      if (name === '') {
         return this.setState({ errors: { name: 'Name is required' } });
      }

      if (email === '') {
         return this.setState({ errors: { email: 'Email is required' } });
      }

      if (phone === '') {
         return this.setState({
            errors: { phone: 'Phone Number is required' }
         });
      }

      // MAKING A REQUEST FROM JSONPLACEHOLDER.
      const updContact = {
         name,
         email,
         phone
      };

      const { id } = this.props.match.params;

      const res = await axios.put(
         `https://jsonplaceholder.typicode.com/users/${id}`,
         updContact
      );

      dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

      // CLEARS THE STATE!!! LIKE A FUCKING BOSS!!!
      this.setState({
         name: '',
         email: '',
         phone: '',
         errors: ''
      });

      this.props.history.push('/');
   };

   onChange = e => this.setState({ [e.target.name]: e.target.value });

   render() {
      const { name, email, phone, errors } = this.state;

      return (
         <Consumer>
            {value => {
               const { dispatch } = value;
               return (
                  <div className="card mb-3">
                     <div className="card-header">Edit This Contact</div>
                     <div className="card-body">
                        <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                           <TextInputGroup
                              label="Name"
                              name="name"
                              placeholder="Enter Name"
                              type="text"
                              value={name}
                              onChange={this.onChange}
                              error={errors.name}
                           />
                           <TextInputGroup
                              label="Email"
                              name="email"
                              placeholder="Enter Email"
                              type="email"
                              value={email}
                              onChange={this.onChange}
                              error={errors.email}
                           />
                           <TextInputGroup
                              label="Phone Number"
                              name="phone"
                              placeholder="Enter Phone Number"
                              type="text"
                              value={phone}
                              onChange={this.onChange}
                              error={errors.phone}
                           />
                           <input
                              type="submit"
                              value="Update Contact"
                              className="btn btn-danger btn-block"
                           />
                        </form>
                     </div>
                  </div>
               );
            }}
         </Consumer>
      );
   }
}

export default EditContact;
