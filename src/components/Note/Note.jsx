import { useState } from 'react'
import NoteModal from '../NoteModal/NoteModal'
import tick from '@/assets/tick.svg'
import Trash from './Trash'
import Edit from './Edit'

const Note = ({
  noteData,
  updateNote,
  toggleComplete,
  deleteNote,
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false)

  const handleNoteModalClose = (noteText) => {
    setIsEditingNote(false)
    if (noteText) {
      updateNote(noteText)
    }
  }

  return (
    <div
      className='flex py-4 border-b border-primary note items-center gap-2'
    >
      <div>
        {isEditingNote && (
          <NoteModal
            title='Edit Note'
            handleClose={handleNoteModalClose}
            defaultNote={noteData.text}
          />
        )}
      </div>

      <input
        type='checkbox'
        className='hidden'
        id={noteData.id}
        checked={noteData.complete}
        onChange={toggleComplete}
      />
      <div
        className={`w-5 h-5 aspect-square rounded-sm outline outline-1 outline-primary cursor-pointer grid place-items-center select-none transition ${
          noteData.complete ? 'bg-primary' : ''
        }`}
        onClick={toggleComplete}
      >
        <div>
          {noteData.complete && (
            <div>
              <img src={tick} alt='Tick' className='-mt-1' />
            </div>
          )}
        </div>
      </div>
      <label
        htmlFor={noteData.id}
        className={`flex-1 ${
          noteData.complete ? 'line-through opacity-60' : ''
        }`}
      >
        {noteData.text}
      </label>
      <button
        onClick={() => setIsEditingNote(true)}
        className='mr-1 text-light hover:text-primary transition'
      >
        <Edit />
      </button>
      <button
        onClick={deleteNote}
        className='text-light hover:text-red-500 transition'
      >
        <Trash />
      </button>
    </div>
  )
}

export default Note
