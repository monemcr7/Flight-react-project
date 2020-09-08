import React, {Component} from 'react';
import $ from 'jquery'; 

class DeleteModal extends Component {

    constructor(props) {
        super(props);
        this.handleCloseClickDelete = this.handleCloseClickDelete.bind(this);
        this.handlerRemove = this.handlerRemove.bind(this);
    }
    componentDidMount() {
        const { handleModalCloseClickDelete } = this.props;
        $(this.modal).modal('show');
        $(this.modal).on('hidden.bs.modal', handleModalCloseClickDelete);
    }
    handleCloseClickDelete() {
        const { handleModalCloseClickDelete } = this.props;
        $(this.modal).modal('hide');
        handleModalCloseClickDelete();
    }

    handlerRemove() {
        const { removetHandler } = this.props;
        $(this.modal).modal('hide');
        removetHandler();
    }

    state = {  }
    render() { 
        return ( 
            <div>
                <div className="modal fade" ref={modal => this.modal = modal} id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="modal-body-header">
                            <h2>DELETE</h2>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        <p className="text-left">Are You Sure?</p>
                        <div className="modal-action text-right">
                            
                            <button type="button" className="btn btn-secondary" onClick={this.handleCloseClickDelete}>Close</button>
                            <button className="btn btn-primary" onClick={this.handlerRemove} data-dismiss="modal">CONFIRM</button>
                        </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default DeleteModal;