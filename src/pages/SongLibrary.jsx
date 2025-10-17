import AddSongForm from "../features/songs/AddSongForm";
import SongGallery from "../features/songs/SongGallery";
import GalleryFilters from "../features/songs/GalleryFilters";
import Modal from "../shared/Modal";
import EditSongForm from "../features/songs/EditSongForm";
import CompletionForm from "../features/songs/CompletionForm";

import { useState } from "react";

function SongLibrary({
  songs,
  addSong,
  markCompleted,
  gridSize,
  setGridSize,
  cardHeight,
  setCardHeight,
  deleteSong,
  editSong,
  sorting,
  setSorting,
}) {
  const [formVisible, setFormVisible] = useState(false);
  const uncompletedSongs = songs.filter((song) => !song.markedCompleted);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [songToEdit, setSongToEdit] = useState(null);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);

  const [isCompleteModalVisible, setIsCompleteModalVisible] = useState(false);
  const [songToComplete, setSongToComplete] = useState(null);

  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleAddSong = (song) => {
    addSong(song);
    setFormVisible(false);
  };
  const handleCloseModal = () => {
    setFormVisible(false);
  };

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
  const handleOpenCompleteModal = (song) => {
    setSongToComplete(song);
    setIsCompleteModalVisible(true);
  };
  const handleCloseCompleteModal = () => {
    setIsCompleteModalVisible(false);
    setSongToComplete(null);
  };
  const handleCompleteSubmit = (completionData) => {
    if (songToComplete) {
      markCompleted(songToComplete.id, completionData);
    }
    handleCloseCompleteModal();
  };

  return (
    <>
      <div className="page-header">
        <h2 className="header-title">Song Library</h2>
        <button onClick={() => setFormVisible(true)}>+ Add Song</button>
        <Modal formVisible={formVisible} onClose={handleCloseModal}>
          <AddSongForm
            onFormSubmit={handleAddSong}
            onCancel={handleCloseModal}
          />
        </Modal>

        <button onClick={() => setOptionsVisible(!optionsVisible)}>
          Options
        </button>
        <GalleryFilters
          className="header-options"
          optionsVisible={optionsVisible}
          gridSize={gridSize}
          setGridSize={setGridSize}
          sorting={sorting}
          setSorting={setSorting}
          cardHeight={cardHeight}
          setCardHeight={setCardHeight}
        />
      </div>

      <SongGallery
        songs={uncompletedSongs}
        onOpenEditModal={handleOpenEditModal}
        onOpenDeleteModal={handleOpenDeleteModal}
        onOpenCompleteModal={handleOpenCompleteModal}
        gridSize={gridSize}
        cardHeight={cardHeight}
        markCompleted={markCompleted}
        message="Add a song and start practicing!"
        deleteSong={deleteSong}
        editSong={editSong}
        actionsDisabled={false}
      />
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

      {songToComplete && (
        <Modal
          formVisible={isCompleteModalVisible}
          onClose={handleCloseCompleteModal}
        >
          <CompletionForm
            onSubmit={handleCompleteSubmit}
            onCancel={handleCloseCompleteModal}
          />
        </Modal>
      )}
      {songToEdit && (
        <Modal formVisible={isEditModalVisible} onClose={handleCloseEditModal}>
          <EditSongForm
            songToEdit={songToEdit}
            onFormSubmit={handleEditSubmit}
            onCancel={handleCloseEditModal}
          />
        </Modal>
      )}
    </>
  );
}
export default SongLibrary;
