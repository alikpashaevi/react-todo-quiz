import detective from '@/assets/detective.svg'
import { useEffect, useMemo, useRef } from 'react'
import Note from '@/components/Note/Note'

const NotesWrapper = ({ notes, setNotes, filterMode, filterQuery }) => {
  const shouldAnimate = useRef(true)

  useEffect(() => {
    shouldAnimate.current = false
  }, [])

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (filterMode === 'Complete' && !note.complete) return false
      if (filterMode === 'Incomplete' && note.complete) return false
      if (filterQuery && !note.text.includes(filterQuery)) return false

      return true
    })
  }, [notes, filterMode, filterQuery])

  return (
    <main>
      {filteredNotes.length > 0 ? (
        <div>
          {filteredNotes.map((note, i) => (
            <Note
              index={shouldAnimate.current ? i : null}
              key={note.id}
              noteData={note}
              deleteNote={() => {
                setNotes((prevNotes) =>
                  prevNotes.filter((prevNote) => prevNote.id !== note.id)
                )
              }}
              toggleComplete={() => {
                setNotes((prevNotes) =>
                  prevNotes.map((prevNote) =>
                    prevNote.id === note.id
                      ? { ...prevNote, complete: !prevNote.complete }
                      : prevNote
                  )
                )
              }}
              updateNote={(text) => {
                setNotes((prevNotes) =>
                  prevNotes.map((prevNote) =>
                    prevNote.id === note.id ? { ...prevNote, text } : prevNote
                  )
                )
              }}
            />
          ))}
        </div>
      ) : (
        <div>
          <img src={detective} className='mx-auto' alt='Detective' />
          <h1 className='text-center mt-3'>Empty...</h1>
        </div>
      )}
    </main>
  )
}

export default NotesWrapper
