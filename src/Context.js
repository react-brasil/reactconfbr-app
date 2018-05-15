import React, { createContext } from 'react';
import ErrorModal from './components/ErrorModal';

export type ContextType = {
  token: string,
  errorText: string,
  closeModal: () => void,
  openModal: string => void,
}

const ContextAPI = createContext({
  token: '',
  errorText: '',
  closeModal: () => {},
  openModal: () => {},
}: ContextType);

export const withContext = (Comp: () => void) => (props: Object) => (
  <ContextAPI.Consumer>
    {context => <Comp {...props} context={context} />}
  </ContextAPI.Consumer>
);

class Provider extends React.Component {
  state = {
    errorText: '',
    closeModal: () => this.setState({errorText: ''}),
    openModal: (errorText) => this.setState({ errorText }),
  };

  render(){
    const { errorText, closeModal } = this.state;

    return(
      <ContextAPI.Provider value={this.state}>
        {this.props.children}
        <ErrorModal
          visible={errorText ? true : false}
          errorText={errorText}
          onRequestClose={closeModal}
          timeout={6000}
        />
      </ContextAPI.Provider>
    )
  }
}

export default Provider;
