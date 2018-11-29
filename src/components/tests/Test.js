import React, { Component } from 'react';

class Test extends Component {
   state = {
      string: "I've got the pennies, yo!!",
      title: '',
      body: ''
   };

   componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/posts/1')
         .then(response => response.json())
         .then(data =>
            this.setState({
               title: data.title,
               body: data.body
            })
         );
   }

   //  componentWillMount() {
   //     console.log('componentWillMount');
   //  }

   //  componentDidUpdate() {
   //     console.log('componetDidUpdate');
   //  }

   //  componentWillReceiveProps(nextProps, nextState) {
   //     console.log('componentWillReceiveProps...');
   //  }

   //  static getDerivedStateFromProps(nextProps, prevState) {
   // return {
   //  string: 'Ive got dollas yo!!'
   // };
   //  }

   //  getSnapshotBeforeUpdate(prevProps, prevState) {
   // console.log(prevState);
   //  }

   render() {
      const { string, title, body } = this.state;
      return (
         <div>
            <h1>Test Component</h1>
            <h2>{string}</h2>
            <p>{title}</p>
            <p>{body}</p>
         </div>
      );
   }
}

export default Test;
