import awslogo from '../asset/awslogo.png'
import gcplogo from '../asset/gcplogo.png'
import React, { Component } from 'react';

class ImageResolver extends Component {
    state = {  }
    render() { 
        return ( <img src={this.props.image} width="60" height="30" />);
    }
}
 
export default ImageResolver;