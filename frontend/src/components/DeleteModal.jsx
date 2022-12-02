import React from 'react';

const DeleteModal = (props) => {
  const [toggleModal, handleDelete, id] = props.props;
  return (
    <>
      {' '}
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <h2>Are You Sure?</h2>
          <p>If you delete this entry you won't be able to undo it!</p>
          <button
            className="deleteButton"
            onClick={(e) => handleDelete(e, id)}
          >
            Yes, I'm Sure!
          </button>
          <button className="editButton" onClick={toggleModal}>
            No, Wait!
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
