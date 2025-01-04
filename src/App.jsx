import { useEffect, useState } from 'react'
import add from '@/assets/add.svg'
import Toolbar from '@/components/Toolbar/Toolbar'
import NoteModal from '@/components/NoteModal/NoteModal'
import NotesWrapper from './components/NotesWrapper/NotesWrapper'

function App() {
  const [notes, setNotes] =  useState([])
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [filterMode, setFilterMode] = useState('All')
  const [filterQuery, setFilterQuery] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    setNotes((prevNotes) => prevNotes.filter((note) => !note.deleteID))
  }, [setNotes])

  const handleNoteModalClose = (noteText) => {
    setIsAddingNote(false)
    if (noteText) {
      setNotes((prevNotes) => [
        ...prevNotes,
        { id: Date.now(), text: noteText, complete: false },
      ])
    }
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <main className='mx-auto max-w-4xl p-4 relative min-h-screen'>
      <div>
        {isAddingNote && <NoteModal handleClose={handleNoteModalClose} />}
      </div>
      <div></div>
      <Toolbar
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
        filterMode={filterMode}
        setFilterMode={setFilterMode}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <section className='md:px-[75px]'>
        <NotesWrapper
          notes={notes}
          setNotes={setNotes}
          filterQuery={filterQuery}
          filterMode={filterMode}
        />
      </section>

      <button
        className='absolute bottom-5 right-0 text-4xl rounded-full bg-primary aspect-square w-10 text-light grid place-items-center p-3 hover:brightness-90'
        onClick={() => setIsAddingNote(true)}
      >
        <img
          src={add}
          alt='Add'
          className='group-hover:rotate-90 transition duration-300'
        />
      </button>
    </main>
  )
}

export default App
