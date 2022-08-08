import React, { createContext, useState, useContext } from "react";

//Creating Context using the Context Api which is used to set global state
//setting context to an empty object at first
const UserDataContext = createContext({});

//creating a provider which will provide the context to my app
// children refers to the children within the data provider, which the data will become available to
export const UserDataProvider = ({ children }) => {
  return (
    <UserDataContext.Provider
      value={
        {
          //this is where i will provide context value
        }
      }
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContext;

//This is where I will set up user authentication
// - create a signIn() method
// - create a signOut() method

//from guils context lecture
// constructor() {
//     super();
//     this.data = new Data();
//     this.cookie = Cookies.get('authenticatedUser');

//     this.state = {
//       authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
//     };
//   }

//   render() {
//     const { authenticatedUser } = this.state;
//     const value = {
//       authenticatedUser,
//       data: this.data,
//       actions: {
//         signIn: this.signIn,
//         signOut: this.signOut
//       },
//     };
//     return (
//       <Context.Provider value={value}>
//         {props.children}
//       </Context.Provider>
//     );
//   }

//   signIn = async (username, password) => {
//     const user = await this.data.getUser(username, password);
//     if (user !== null) {
//       this.setState(() => {
//         return {
//           authenticatedUser: user,
//         };
//       });
//       const cookieOptions = {
//         expires: 1 // 1 day
//       };
//       Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
//     }
//     return user;
//   }

//   signOut = () => {
//     this.setState({ authenticatedUser: null });
//     Cookies.remove('authenticatedUser');
//   }
// }

// export const Consumer = Context.Consumer;

// /**
//  * A higher-order component that wraps the provided component in a Context Consumer component.
//  * @param {class} Component - A React component.
//  * @returns {function} A higher-order component.
//  */

// export default function withContext(Component) {
//   return function ContextComponent(props) {
//     return (
//       <Context.Consumer>
//         {context => <Component {...props} context={context} />}
//       </Context.Consumer>
//     );
//   }
// }
