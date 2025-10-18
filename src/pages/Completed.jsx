import { useState } from "react";
import SongGallery from "../features/songGallery/SongGallery";
import GalleryFilters from "../features/songGallery/GalleryFilters";
import Modal from "../shared/Modal";
import EditSongForm from "../features/songManagement/EditSongForm";
import "./SongLibrary.css";

function Completed({
  songs,
  gridSize,
  setGridSize,
  cardHeight,
  setCardHeight,
  deleteSong,
  editSong,
  markCompleted,
  sorting,
  setSorting,
}) {
  const completedSongs = songs.filter((song) => song.markedCompleted);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [songToEdit, setSongToEdit] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);
  const [optionsVisible, setOptionsVisible] = useState(false);

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
      <div className="page-header">
        <h2 className="header-title">Completed Songs</h2>
        <button
          className="completed-options-btn"
          onClick={() => setOptionsVisible(!optionsVisible)}
        >
          Options
        </button>
        <GalleryFilters
          optionsVisible={optionsVisible}
          gridSize={gridSize}
          setGridSize={setGridSize}
          cardHeight={cardHeight}
          setCardHeight={setCardHeight}
          sorting={sorting}
          setSorting={setSorting}
        />
      </div>

      <SongGallery
        songs={completedSongs}
        gridSize={gridSize}
        cardHeight={cardHeight}
        message="No songs completed... yet!"
        deleteSong={deleteSong}
        editSong={editSong}
        markCompleted={markCompleted}
        actionsDisabled={false}
        onOpenEditModal={handleOpenEditModal}
        onOpenDeleteModal={handleOpenDeleteModal}
      />

      {songToEdit && (
        <Modal formVisible={isEditModalVisible} onClose={handleCloseEditModal}>
          <EditSongForm
            songToEdit={songToEdit}
            onFormSubmit={handleEditSubmit}
            onCancel={handleCloseEditModal}
          />
        </Modal>
      )}

      {songToDelete && (
        <Modal
          formVisible={isDeleteModalVisible}
          onClose={handleCloseDeleteModal}
        >
          <div className="deletionForm">
            <h3>Are you sure?</h3>
            <p>You are deleting "{songToDelete.title}" from your library.</p>
            <div className="modal-buttons">
              <button
                className="cancel-button"
                type="button"
                onClick={handleCloseDeleteModal}
              >
                No, Cancel
              </button>
              <button className="submit-button" onClick={handleDeleteConfirm}>
                Yes, Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Completed;
