import React, { createContext } from 'react';
import ErrorModal from './components/ErrorModal';

export type ContextType = {
  token: string,
  errorText: string,
  successText: string,
  closeModal: () => void,
  openModal: string => void,
}

const ContextAPI = createContext({
  token: '',
  errorText: '',
  successText: '',
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
    closeModal: () => this.setState({ errorText: '', successText: '' }),
    openModal: (errorText) => this.setState({ errorText }),
    openSuccessModal: (successText) => this.setState({ successText }),
  };

  render(){
    const { errorText, successText, closeModal } = this.state;

    return(
      <ContextAPI.Provider value={this.state}>
        {this.props.children}
        <ErrorModal
          visible={errorText || successText ? true : false}
          errorText={errorText}
          successText={successText}
          onRequestClose={closeModal}
          timeout={6000}
        />
      </ContextAPI.Provider>
    )
  }
}

export default Provider;
