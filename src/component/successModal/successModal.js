import React, {Component} from 'react';
import $ from 'jquery'; 

class SuccessModal extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { handleModalCloseClick } = this.props;
        $(this.modal).modal('show');
        $(this.modal).on('hidden.bs.modal', handleModalCloseClick);
    }


    state = {  }
    render() { 
        return ( 
            <div>
                <div className="modal modal-message fade" ref={modal => this.modal = modal} id="success_tic" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">

                    {/* <!-- Modal content--> */}
                    <div className="modal-content">
                        <div className="checkmark-circle">
                            <div className="background"></div>
                            <div className="checkmark draw"></div>
                        </div>
                        <div className="page-body">
                            <div className="head">
                                <h4>Success!</h4>
                            </div>
                            <button type="button" className="redo btn" data-dismiss="modal">Ok</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SuccessModal;