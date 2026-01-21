import { MODAL_TYPE } from '@/constants';
import { useModalStore } from '@/store';

import CreateFolderModal from './user/CreateFolderModal';
import ConfirmDeleteFolderModal from './user/myLibrary/ConfirmDeleteFolderModal';
import ConfirmDeleteStudySetModal from './user/myLibrary/ConfirmDeleteStudySetModal';
import EditFolderModal from './user/myLibrary/EditFolderModal';
import ReviewCompleteDialog from './user/learningFlashCard/ReviewCompleteDialog';

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

    case MODAL_TYPE.CONFIRM_DELETE_STUDY_SET:
      return <ConfirmDeleteStudySetModal />;

    case MODAL_TYPE.REVIEW_COMPLETE:
      return <ReviewCompleteDialog />;

    default:
      return null;
  }
};

export default ModalRoot;
