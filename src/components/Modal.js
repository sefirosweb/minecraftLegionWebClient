import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ModalDialog = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>

      {props.title ? (
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
      ) : ''}

      <Modal.Body>
        {props.body}

      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={props.handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={props.handleAccept}>
          Accept
        </Button>
      </Modal.Footer>

    </Modal>
  )
}

export default ModalDialog
