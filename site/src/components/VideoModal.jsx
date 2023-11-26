import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Video from './Video';

export default function VideoModal(props) {
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Video />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}


VideoModal.propTypes = {
  isVideoModalOpen: PropTypes.bool,
  onVideoModalClose: PropTypes.func,
}