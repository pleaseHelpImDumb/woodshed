import { useState } from "react";
import SongGallery from "../features/songs/SongGallery";
import GalleryFilters from "../features/songs/GalleryFilters";
import Modal from "../shared/Modal";
import EditSongForm from "../features/songs/EditSongForm";
function Completed({
  songs,
  gridSize,
  setGridSize,
  deleteSong,
  editSong,
  markCompleted,
}) {
  const completedSongs = songs.filter((song) => song.markedCompleted);
  // State for the Edit Modal
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [songToEdit, setSongToEdit] = useState(null);

  // State for the Delete Modal
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);

  // Handlers for Edit Modal
  const handleOpenEditModal = (song) => {
    setSongToEdit(song);
    setIsEditModalVisible(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setSongToEdit(null);
  };
  const handleEditSubmit = (updatedData) => {
    if (songToEdit) {
      editSong(songToEdit.id, updatedData);
    }
    handleCloseEditModal();
  };

  // Handlers for Delete Modal
  const handleOpenDeleteModal = (song) => {
    setSongToDelete(song);
    setIsDeleteModalVisible(true);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setSongToDelete(null);
  };
  const handleDeleteConfirm = () => {
    if (songToDelete) {
      deleteSong(songToDelete.id);
    }
    handleCloseDeleteModal();
  };
  return (
    <>
      <h2>Completed Songs</h2>
      <SongGallery
        songs={completedSongs}
        gridSize={gridSize}
        message="No songs completed... yet!"
        deleteSong={deleteSong}
        editSong={editSong}
        markCompleted={markCompleted}
        actionsDisabled={false}
        onOpenEditModal={handleOpenEditModal}
        onOpenDeleteModal={handleOpenDeleteModal}
      />

      {/* SINGLE Edit Modal */}
      {songToEdit && (
        <Modal formVisible={isEditModalVisible} onClose={handleCloseEditModal}>
          <EditSongForm
            songToEdit={songToEdit}
            onFormSubmit={handleEditSubmit}
            onCancel={handleCloseEditModal}
          />
        </Modal>
      )}

      {/* SINGLE Delete Modal */}
      {songToDelete && (
        <Modal
          formVisible={isDeleteModalVisible}
          onClose={handleCloseDeleteModal}
        >
          <div className="deletionForm">
            <h3>Are you sure?</h3>
            <p>You are deleting "{songToDelete.title}" from your library.</p>
            <div className="modal-buttons">
              <button type="button" onClick={handleCloseDeleteModal}>
                No, Cancel
              </button>
              <button
                className="confirm-delete-button"
                onClick={handleDeleteConfirm}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
      <GalleryFilters
        gridSize={gridSize}
        setGridSize={setGridSize}
      ></GalleryFilters>
    </>
  );
}

export default Completed;
