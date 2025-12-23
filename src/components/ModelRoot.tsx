import { MODAL_TYPE } from '@/constants';
import { useModalStore } from '@/store';

import CreateFolderModal from './user/CreateFolderModal';
import ConfirmDeleteFolderModal from './user/myLibrary/ConfirmDeleteFolderModal';
import EditFolderModal from './user/myLibrary/EditFolderModal';

const ModalRoot = () => {
  const { isOpen, type } = useModalStore();

  if (!isOpen) return null;

  switch (type) {
    case MODAL_TYPE.CREATE_FOLDER:
      return <CreateFolderModal />;

    case MODAL_TYPE.EDIT_FOLDER:
      return <EditFolderModal />;

    case MODAL_TYPE.CONFIRM_DELETE_FOLDER:
      return <ConfirmDeleteFolderModal />;

    default:
      return null;
  }
};

export default ModalRoot;
