import React from 'react'
import { Toast } from 'react-bootstrap';


class ToastMe extends React.Component {
   
    constructor(props) {
      super(props);
      this.state = {
        show: false,
      };
    }  
    render() {
      const { show } = this.state;
      const handleShow = () => this.setState({ show: true });
      const handleClose = () => this.setState({ show: false });
      return (
            <Toast onClose={handleClose} show={show} delay={6000} autohide>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded mr-2"
                  alt=""
                />
                <strong className="mr-auto">Bootstrap</strong>
                <small>11 mins ago</small>
              </Toast.Header>
              <Toast.Body>
                Woohoo, you're reading this text in a Toast!
              </Toast.Body>
            </Toast>
      );
    }
  }
