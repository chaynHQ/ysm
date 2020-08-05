

  import React from 'react';
  import { Route, Redirect} from 'react-router-dom';
  import { connect } from 'react-redux';
  const queryString = require('query-string');

  const ProtectedRoute = ({ component, user, ...props }) => {
    const queryStrings = queryString.parse(props.location.search);

    return (
      <Route {...props} render={
        props => {
          if (queryStrings.auth && Object.keys(user).length> 0) {
            return React.createElement(component, props)
          } else {
            return <Redirect to={
              {
                pathname: '/signIn',
                state: {
                  from: props.location.pathname
                }
              }
            } />
          }
        }
      } />
    )
  }

  const mapStateToProps = (state) => ({
    state: state,
    user: state.user,
});


export default connect(mapStateToProps, null)(ProtectedRoute);