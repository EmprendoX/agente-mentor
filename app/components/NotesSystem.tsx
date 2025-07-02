"use client";

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  Trash2, 
  Edit3, 
  FileText,
  Calendar,
  Clock
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function NotesSystem() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);

  // Cargar notas desde localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedNotes = localStorage.getItem('ebook-notes');
      if (savedNotes) {
        try {
          const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt),
            updatedAt: new Date(note.updatedAt)
          }));
          setNotes(parsedNotes);
        } catch (error) {
          console.error('Error loading notes:', error);
        }
      }
    }
  }, []);

  // Guardar notas en localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && notes.length > 0) {
      localStorage.setItem('ebook-notes', JSON.stringify(notes));
    }
  }, [notes]);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Nueva Nota',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setNotes(prev => [newNote, ...prev]);
    setCurrentNote(newNote);
    setIsEditing(true);
    setShowNewNoteForm(false);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ));
    if (currentNote?.id === id) {
      setCurrentNote(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (currentNote?.id === id) {
      setCurrentNote(null);
      setIsEditing(false);
    }
  };

  const exportNotes = () => {
    const notesText = notes.map(note => 
      `# ${note.title}\n\n${note.content}\n\n---\n`
    ).join('\n');
    
    const blob = new Blob([notesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notas-ebook-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#2563EB] text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText size={24} />
              Sistema de Notas
            </h2>
            <p className="text-sm text-white/80 mt-1">
              Toma notas mientras lees el eBook
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportNotes}
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
              title="Exportar notas"
            >
              <Download size={16} />
              Exportar
            </button>
            <button
              onClick={() => setShowNewNoteForm(true)}
              className="bg-white text-[#2563EB] hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
            >
              <Plus size={16} />
              Nueva Nota
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-96">
        {/* Sidebar con lista de notas */}
        <div className="w-full lg:w-1/3 border-r border-gray-200 bg-gray-50">
          {/* Búsqueda */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en notas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm"
              />
            </div>
          </div>

          {/* Lista de notas */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotes.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-sm">No hay notas aún</p>
                <p className="text-xs text-gray-400 mt-1">Crea tu primera nota</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-4 cursor-pointer transition hover:bg-white ${
                      currentNote?.id === note.id ? 'bg-white border-r-2 border-[#2563EB]' : ''
                    }`}
                    onClick={() => {
                      setCurrentNote(note);
                      setIsEditing(false);
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-[#1F2937] text-sm truncate">
                        {note.title}
                      </h3>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentNote(note);
                            setIsEditing(true);
                          }}
                          className="text-gray-400 hover:text-blue-600 transition p-1"
                          title="Editar"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note.id);
                          }}
                          className="text-gray-400 hover:text-red-600 transition p-1"
                          title="Eliminar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {note.content.substring(0, 100)}
                      {note.content.length > 100 ? '...' : ''}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                      <Calendar size={12} />
                      <span>{note.updatedAt.toLocaleDateString()}</span>
                      <Clock size={12} />
                      <span>{note.updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Editor principal */}
        <div className="flex-1 flex flex-col">
          {currentNote ? (
            <>
              {/* Header del editor */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={currentNote.title}
                        onChange={(e) => updateNote(currentNote.id, { title: e.target.value })}
                        className="w-full text-lg font-semibold text-[#1F2937] border-none outline-none bg-transparent"
                        placeholder="Título de la nota"
                      />
                    ) : (
                      <h3 className="text-lg font-semibold text-[#1F2937]">
                        {currentNote.title}
                      </h3>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={`px-3 py-1 rounded text-sm font-medium transition ${
                        isEditing 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {isEditing ? 'Guardando...' : 'Editar'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Editor de contenido */}
              <div className="flex-1 p-4">
                <textarea
                  value={currentNote.content}
                  onChange={(e) => updateNote(currentNote.id, { content: e.target.value })}
                  placeholder="Escribe tus notas aquí..."
                  className="w-full h-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none"
                  style={{ fontFamily: 'inherit', fontSize: '14px', lineHeight: '1.6' }}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FileText size={64} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Selecciona una nota</h3>
                <p className="text-sm text-gray-400 mb-4">
                  O crea una nueva nota para comenzar
                </p>
                <button
                  onClick={() => setShowNewNoteForm(true)}
                  className="bg-[#2563EB] text-white px-4 py-2 rounded-lg font-medium transition hover:bg-blue-700 flex items-center gap-2 mx-auto"
                >
                  <Plus size={16} />
                  Crear Nota
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para nueva nota */}
      {showNewNoteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-[#1F2937] mb-4">
              Crear Nueva Nota
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título de la nota
                </label>
                <input
                  type="text"
                  placeholder="Mi nota importante..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      createNewNote();
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowNewNoteForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-[#1F2937]"
              >
                Cancelar
              </button>
              <button
                onClick={createNewNote}
                className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-700 transition"
              >
                Crear Nota
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 