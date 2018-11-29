import React, { Component } from 'react';

//WARNING....WARNING....WARNING....WARNING!!!!!!
//THIS ONE ISN'T ACTUALLY GOING TO BE USED INSIDE OF THE LEARNING PROJECT, FOR LEARNIN ONLY!!!! IT'S ONLY TO SHOW THE USE OF UNCONTROLLED COMPONENTS AND REF!!!
//WARNING....WARNING....WARNING....WARNING!!!!!!

class AddContact extends Component {
   constructor(props) {
      super(props);

      this.nameInput = React.createRef();
      this.emailInput = React.createRef();
      this.phoneInput = React.createRef();
   }

   onSubmit = e => {
      e.preventDefault();
      const contact = {
         name: this.nameInput.current.value,
         email: this.emailInput.current.value,
         phone: this.phoneInput.current.value
      };

      console.log(contact);
   };

   static defaultProps = {
      name: 'Kody Lohrman',
      email: 'darthKody@gmail.com',
      phone: '256-567-8732'
   };

   render() {
      const { name, email, phone } = this.props;
      return (
         <div className="card mb-3">
            <div className="card-header">Add Contact</div>
            <div className="card-body">
               <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                     <label htmlFor="name">Name</label>
                     <input
                        type="text"
                        name="name"
                        className="form-control form-control-lg"
                        placeholder="Enter Name..."
                        defaultValue={name}
                        ref={this.nameInput}
                     />
                  </div>
                  <div className="form-group">
                     <label htmlFor="email">Email</label>
                     <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Enter Email..."
                        defaultValue={email}
                        ref={this.emailInput}
                     />
                  </div>
                  <div className="form-group">
                     <label htmlFor="phone">Phone</label>
                     <input
                        type="text"
                        name="phone"
                        className="form-control form-control-lg"
                        placeholder="Enter Phone..."
                        defaultValue={phone}
                        ref={this.phoneInput}
                     />
                  </div>
                  <input
                     type="submit"
                     value="Add Contact"
                     className="btn btn-danger btn-block"
                  />
               </form>
            </div>
         </div>
      );
   }
}

export default AddContact;
