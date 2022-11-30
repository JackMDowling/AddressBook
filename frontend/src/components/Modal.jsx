import React from 'react';

const Modal = (props) => {
  const [toggleModal, handleDelete, id, modalType, handleEdit] = props.props;
  return (
    <>
      {' '}
      {modalType === 'delete' && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Are You Sure?</h2>
            <p>If you delete this entry you won't be able to undo it!</p>
            <button
              className="confirmButton"
              onClick={(e) => handleDelete(e, id)}
            >
              Yes, I'm Sure!
            </button>
            <button className="exitButton" onClick={toggleModal}>
              No, Wait!
            </button>
          </div>
        </div>
      )}{' '}
      {modalType === 'edit' && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Edit Contact Details</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              doloribus ex, sapiente id corrupti laudantium ratione pariatur
              tenetur sint? A odit facilis velit totam rerum possimus saepe
              dolore maxime consequuntur.
            </p>
            <button
              className="confirmButton"
              onClick={(e) => handleEdit(e, id)}
            >
              Save
            </button>
            <button className="exitButton" onClick={toggleModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
