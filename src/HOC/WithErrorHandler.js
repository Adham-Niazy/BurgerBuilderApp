import React, { Component } from 'react';

import Modal from '../components/UI/Modal/Modal';
import Wrapper from './Wrapper';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this. responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
                return ;
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        closeModelHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Wrapper>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.closeModelHandler}>
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Wrapper>
            );
        }
    }
}

export default withErrorHandler;