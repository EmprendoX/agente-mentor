"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Bold, Italic, Underline, 
  List, ListOrdered, Quote, 
  Link, Image, Save,
  Plus, Folder, FileText,
  ChevronRight, ChevronDown,
  MoreVertical, Edit3, Copy, Trash2
} from 'lucide-react';

interface Page {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Section {
  id: string;
  name: string;
  pages: Page[];
  isExpanded?: boolean;
}

interface Notebook {
  id: string;
  name: string;
  color: string;
  sections: Section[];
  isExpanded?: boolean;
}

const COLORS = [
  '#2563EB', '#DC2626', '#059669', '#D97706', 
  '#7C3AED', '#DB2777', '#0891B2', '#65A30D'
];

export default function NotesSystem() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [selectedNotebook, setSelectedNotebook] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editingTitle, setEditingTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [editorHeight, setEditorHeight] = useState(600);
  const [isResizing, setIsResizing] = useState(false);
  const [isEditingNotebook, setIsEditingNotebook] = useState<string | null>(null);
  const [isEditingSection, setIsEditingSection] = useState<string | null>(null);
  const [editingNotebookName, setEditingNotebookName] = useState('');
  const [editingSectionName, setEditingSectionName] = useState('');
  const resizeRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('notes-system');
    if (saved) {
      const data = JSON.parse(saved);
      setNotebooks(data.notebooks || []);
      setSelectedNotebook(data.selectedNotebook);
      setSelectedSection(data.selectedSection);
      setSelectedPage(data.selectedPage);
    }
  }, []);

  useEffect(() => {
    // Auto-save
    const timeoutId = setTimeout(() => {
      if (selectedPage) {
        saveToLocalStorage();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [notebooks, selectedNotebook, selectedSection, selectedPage]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        e.preventDefault();
        // Calcular la nueva altura basada en la posición del mouse
        const containerTop = 200; // Aproximadamente la posición del contenedor del editor
        const newHeight = Math.max(300, e.clientY - containerTop);
        setEditorHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    if (isResizing) {
      document.body.style.cursor = 'ns-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // ResizeObserver para detectar cambios automáticos del editor
  useEffect(() => {
    const editor = editorRef.current;
    if (editor && window.ResizeObserver) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const height = entry.contentRect.height;
          if (height > 300) {
            setEditorHeight(height);
          }
        }
      });
      
      resizeObserver.observe(editor);
      
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem('notes-system', JSON.stringify({
      notebooks,
      selectedNotebook,
      selectedSection,
      selectedPage
    }));
  };

  const createNotebook = () => {
    const newNotebook: Notebook = {
      id: Date.now().toString(),
      name: 'Nuevo Notebook',
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      sections: [],
      isExpanded: true
    };
    setNotebooks(prev => [...prev, newNotebook]);
    setSelectedNotebook(newNotebook.id);
    // Iniciar edición inmediatamente
    setIsEditingNotebook(newNotebook.id);
    setEditingNotebookName('Nuevo Notebook');
  };

  const createSection = (notebookId: string) => {
    const newSection: Section = {
      id: Date.now().toString(),
      name: 'Nueva Sección',
      pages: [],
      isExpanded: true
    };
    setNotebooks(prev => prev.map(nb => 
      nb.id === notebookId 
        ? { ...nb, sections: [...nb.sections, newSection] }
        : nb
    ));
    setSelectedSection(newSection.id);
    // Iniciar edición inmediatamente
    setIsEditingSection(newSection.id);
    setEditingSectionName('Nueva Sección');
  };

  const createPage = (notebookId: string, sectionId: string) => {
    const newPage: Page = {
      id: Date.now().toString(),
      title: 'Nueva Página',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setNotebooks(prev => prev.map(nb => 
      nb.id === notebookId 
        ? {
            ...nb,
            sections: nb.sections.map(sec => 
              sec.id === sectionId 
                ? { ...sec, pages: [...sec.pages, newPage] }
                : sec
            )
          }
        : nb
    ));
    setSelectedPage(newPage.id);
    // Iniciar edición del título inmediatamente
    setIsEditingTitle(true);
    setEditingTitle('Nueva Página');
  };

  const updatePageContent = (content: string) => {
    if (!selectedNotebook || !selectedSection || !selectedPage) return;
    
    setNotebooks(prev => prev.map(nb => 
      nb.id === selectedNotebook 
        ? {
            ...nb,
            sections: nb.sections.map(sec => 
              sec.id === selectedSection 
                ? {
                    ...sec,
                    pages: sec.pages.map(page => 
                      page.id === selectedPage 
                        ? { ...page, content, updatedAt: new Date() }
                        : page
                    )
                  }
                : sec
            )
          }
        : nb
    ));
  };

  const getCurrentPage = () => {
    if (!selectedNotebook || !selectedSection || !selectedPage) return null;
    const notebook = notebooks.find(nb => nb.id === selectedNotebook);
    const section = notebook?.sections.find(sec => sec.id === selectedSection);
    return section?.pages.find(page => page.id === selectedPage);
  };

  const toggleExpanded = (type: 'notebook' | 'section', id: string) => {
    if (type === 'notebook') {
      setNotebooks(prev => prev.map(nb => 
        nb.id === id ? { ...nb, isExpanded: !nb.isExpanded } : nb
      ));
    } else {
      setNotebooks(prev => prev.map(nb => ({
        ...nb,
        sections: nb.sections.map(sec => 
          sec.id === id ? { ...sec, isExpanded: !sec.isExpanded } : sec
        )
      })));
    }
  };

  const deleteItem = (type: 'notebook' | 'section' | 'page', id: string) => {
    if (type === 'notebook') {
      setNotebooks(prev => prev.filter(nb => nb.id !== id));
      if (selectedNotebook === id) {
        setSelectedNotebook(null);
        setSelectedSection(null);
        setSelectedPage(null);
      }
    } else if (type === 'section') {
      setNotebooks(prev => prev.map(nb => ({
        ...nb,
        sections: nb.sections.filter(sec => sec.id !== id)
      })));
      if (selectedSection === id) {
        setSelectedSection(null);
        setSelectedPage(null);
      }
    } else if (type === 'page') {
      setNotebooks(prev => prev.map(nb => ({
        ...nb,
        sections: nb.sections.map(sec => ({
          ...sec,
          pages: sec.pages.filter(page => page.id !== id)
        }))
      })));
      if (selectedPage === id) {
        setSelectedPage(null);
      }
    }
  };

  const duplicatePage = (page: Page, targetSectionId: string) => {
    const newPage: Page = {
      ...page,
      id: Date.now().toString(),
      title: `${page.title} (copia)`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setNotebooks(prev => prev.map(nb => ({
      ...nb,
      sections: nb.sections.map(sec => 
        sec.id === targetSectionId 
          ? { ...sec, pages: [...sec.pages, newPage] }
          : sec
      )
    })));
  };

  // Funciones para el editor de texto enriquecido
  const formatText = (command: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
    }
  };

  const insertLink = () => {
    const url = prompt('Ingresa la URL:');
    const text = prompt('Ingresa el texto del enlace:');
    if (url && text) {
      formatText('insertHTML', `<a href="${url}" target="_blank">${text}</a>`);
    }
  };

  const insertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          formatText('insertHTML', `<img src="${e.target?.result}" alt="Imagen" style="max-width: 100%; height: auto;" />`);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      updatePageContent(editorRef.current.innerHTML);
    }
  };

  const handleEditorFocus = () => {
    if (editorRef.current && !editorRef.current.innerHTML.trim()) {
      editorRef.current.innerHTML = '';
    }
  };

  const handleEditorBlur = () => {
    if (editorRef.current && !editorRef.current.innerHTML.trim()) {
      editorRef.current.innerHTML = '';
    }
  };

  const currentPage = getCurrentPage();

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow">
      {/* Top Navigation Bar */}
      <div className="border-b border-gray-200 bg-gray-50 p-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-800">Mis Notas</h2>
          <button
            onClick={createNotebook}
            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1"
          >
            <Plus size={10} />
            Nuevo Notebook
          </button>
        </div>
        
        {/* Notebooks List */}
        <div className="space-y-1">
          {notebooks.map(notebook => (
            <div key={notebook.id} className="text-xs">
              <div className="flex items-center gap-1 p-1 hover:bg-gray-100 rounded cursor-pointer">
                <button
                  onClick={() => toggleExpanded('notebook', notebook.id)}
                  className="p-0.5 hover:bg-gray-200 rounded"
                >
                  {notebook.isExpanded ? <ChevronDown size={8} /> : <ChevronRight size={8} />}
                </button>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: notebook.color }}
                />
                {isEditingNotebook === notebook.id ? (
                  <input
                    type="text"
                    value={editingNotebookName}
                    onChange={(e) => setEditingNotebookName(e.target.value)}
                    onBlur={() => {
                      setNotebooks(prev => prev.map(nb => 
                        nb.id === notebook.id ? { ...nb, name: editingNotebookName } : nb
                      ));
                      setIsEditingNotebook(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setNotebooks(prev => prev.map(nb => 
                          nb.id === notebook.id ? { ...nb, name: editingNotebookName } : nb
                        ));
                        setIsEditingNotebook(null);
                      } else if (e.key === 'Escape') {
                        setIsEditingNotebook(null);
                        setEditingNotebookName(notebook.name);
                      }
                    }}
                    className="flex-1 text-xs bg-white border border-blue-300 rounded px-1 py-0.5 focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                ) : (
                  <span
                    className={`flex-1 truncate ${selectedNotebook === notebook.id ? 'font-medium' : ''}`}
                    onClick={() => setSelectedNotebook(notebook.id)}
                    onDoubleClick={() => {
                      setIsEditingNotebook(notebook.id);
                      setEditingNotebookName(notebook.name);
                    }}
                  >
                    {notebook.name}
                  </span>
                )}
                <button
                  onClick={() => createSection(notebook.id)}
                  className="p-0.5 hover:bg-gray-200 rounded text-gray-500"
                  title="Nueva sección"
                >
                  <Plus size={8} />
                </button>
                <button
                  onClick={() => deleteItem('notebook', notebook.id)}
                  className="p-0.5 hover:bg-gray-200 rounded text-gray-500"
                  title="Eliminar notebook"
                >
                  <Trash2 size={8} />
                </button>
              </div>
              
              {notebook.isExpanded && (
                <div className="ml-4 space-y-1">
                  {notebook.sections.map(section => (
                    <div key={section.id} className="text-xs">
                      <div className="flex items-center gap-1 p-1 hover:bg-gray-100 rounded cursor-pointer">
                        <button
                          onClick={() => toggleExpanded('section', section.id)}
                          className="p-0.5 hover:bg-gray-200 rounded"
                        >
                          {section.isExpanded ? <ChevronDown size={8} /> : <ChevronRight size={8} />}
                        </button>
                        <Folder size={8} className="text-gray-500" />
                        {isEditingSection === section.id ? (
                          <input
                            type="text"
                            value={editingSectionName}
                            onChange={(e) => setEditingSectionName(e.target.value)}
                            onBlur={() => {
                              setNotebooks(prev => prev.map(nb => ({
                                ...nb,
                                sections: nb.sections.map(sec => 
                                  sec.id === section.id ? { ...sec, name: editingSectionName } : sec
                                )
                              })));
                              setIsEditingSection(null);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                setNotebooks(prev => prev.map(nb => ({
                                  ...nb,
                                  sections: nb.sections.map(sec => 
                                    sec.id === section.id ? { ...sec, name: editingSectionName } : sec
                                  )
                                })));
                                setIsEditingSection(null);
                              } else if (e.key === 'Escape') {
                                setIsEditingSection(null);
                                setEditingSectionName(section.name);
                              }
                            }}
                            className="flex-1 text-xs bg-white border border-blue-300 rounded px-1 py-0.5 focus:outline-none focus:border-blue-500"
                            autoFocus
                          />
                        ) : (
                          <span
                            className={`flex-1 truncate ${selectedSection === section.id ? 'font-medium' : ''}`}
                            onClick={() => {
                              setSelectedNotebook(notebook.id);
                              setSelectedSection(section.id);
                            }}
                            onDoubleClick={() => {
                              setIsEditingSection(section.id);
                              setEditingSectionName(section.name);
                            }}
                          >
                            {section.name}
                          </span>
                        )}
                        <button
                          onClick={() => createPage(notebook.id, section.id)}
                          className="p-0.5 hover:bg-gray-200 rounded text-gray-500"
                          title="Nueva página"
                        >
                          <Plus size={8} />
                        </button>
                        <button
                          onClick={() => deleteItem('section', section.id)}
                          className="p-0.5 hover:bg-gray-200 rounded text-gray-500"
                          title="Eliminar sección"
                        >
                          <Trash2 size={8} />
                        </button>
                      </div>
                      
                      {section.isExpanded && (
                        <div className="ml-4 space-y-1">
                          {section.pages.map(page => (
                            <div
                              key={page.id}
                              className={`flex items-center gap-1 p-1 hover:bg-gray-100 rounded cursor-pointer ${selectedPage === page.id ? 'bg-blue-50' : ''}`}
                              onClick={() => {
                                setSelectedNotebook(notebook.id);
                                setSelectedSection(section.id);
                                setSelectedPage(page.id);
                              }}
                            >
                              <FileText size={8} className="text-gray-500" />
                              <span className="flex-1 truncate text-xs">{page.title}</span>
                              <div className="flex items-center gap-0.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    duplicatePage(page, section.id);
                                  }}
                                  className="p-0.5 hover:bg-gray-200 rounded text-gray-500"
                                  title="Duplicar página"
                                >
                                  <Copy size={8} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteItem('page', page.id);
                                  }}
                                  className="p-0.5 hover:bg-gray-200 rounded text-gray-500"
                                  title="Eliminar página"
                                >
                                  <Trash2 size={8} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {currentPage ? (
          <>
            {/* Page Header */}
            <div className="p-2 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <h1 className="text-sm font-semibold text-gray-800">
                    {currentPage.title}
                  </h1>
                  <button
                    onClick={() => {
                      setIsEditingTitle(true);
                      setEditingTitle(currentPage.title);
                    }}
                    className="p-0.5 hover:bg-gray-200 rounded text-gray-500"
                    title="Editar título"
                  >
                    <Edit3 size={12} />
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">
                    Última edición: {currentPage.updatedAt.toLocaleString()}
                  </span>
                  <button
                    onClick={() => {
                      setIsSaving(true);
                      setTimeout(() => setIsSaving(false), 1000);
                    }}
                    className="px-1.5 py-0.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs flex items-center gap-1"
                  >
                    <Save size={10} />
                    {isSaving ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
              </div>
            </div>

            {/* Compact Toolbar */}
            <div className="p-1 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-0.5">
                <button 
                  onClick={() => formatText('bold')}
                  className="p-0.5 hover:bg-gray-200 rounded text-gray-600" 
                  title="Negrita (Ctrl+B)"
                >
                  <Bold size={10} />
                </button>
                <button 
                  onClick={() => formatText('italic')}
                  className="p-0.5 hover:bg-gray-200 rounded text-gray-600" 
                  title="Cursiva (Ctrl+I)"
                >
                  <Italic size={10} />
                </button>
                <button 
                  onClick={() => formatText('underline')}
                  className="p-0.5 hover:bg-gray-200 rounded text-gray-600" 
                  title="Subrayado (Ctrl+U)"
                >
                  <Underline size={10} />
                </button>
                
                <div className="w-px h-3 bg-gray-300 mx-1" />
                
                <button 
                  onClick={() => formatText('insertUnorderedList')}
                  className="p-0.5 hover:bg-gray-200 rounded text-gray-600" 
                  title="Lista con viñetas"
                >
                  <List size={10} />
                </button>
                <button 
                  onClick={() => formatText('insertOrderedList')}
                  className="p-0.5 hover:bg-gray-200 rounded text-gray-600" 
                  title="Lista numerada"
                >
                  <ListOrdered size={10} />
                </button>
                <button 
                  onClick={() => formatText('formatBlock', '<blockquote>')}
                  className="p-0.5 hover:bg-gray-200 rounded text-gray-600" 
                  title="Cita"
                >
                  <Quote size={10} />
                </button>
                
                <div className="w-px h-3 bg-gray-300 mx-1" />
                
                <button 
                  onClick={insertLink}
                  className="p-0.5 hover:bg-gray-200 rounded text-gray-600" 
                  title="Insertar enlace"
                >
                  <Link size={10} />
                </button>
                <button 
                  onClick={insertImage}
                  className="p-0.5 hover:bg-gray-200 rounded text-gray-600" 
                  title="Insertar imagen"
                >
                  <Image size={10} />
                </button>
              </div>
            </div>

            {/* Large Resizable Editor */}
            <div className="flex-1 p-2 relative min-h-0" ref={resizeRef}>
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorInput}
                onFocus={handleEditorFocus}
                onBlur={handleEditorBlur}
                dangerouslySetInnerHTML={{ __html: currentPage.content }}
                className="w-full outline-none text-gray-700 leading-relaxed border border-gray-200 rounded-lg p-3 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-y overflow-y-auto"
                style={{
                  height: `${editorHeight}px`,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  minHeight: '300px'
                }}
                data-placeholder="Escribe tus notas aquí..."
              />
              
              {/* Manual Resize Handle */}
              <div
                className="absolute bottom-0 left-0 right-0 h-6 cursor-ns-resize transition-all duration-200 bg-transparent hover:bg-blue-200"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsResizing(true);
                }}
                style={{
                  background: isResizing 
                    ? 'linear-gradient(to bottom, transparent 0%, #60a5fa 50%, #60a5fa 100%)'
                    : 'linear-gradient(to bottom, transparent 0%, rgba(59, 130, 246, 0.2) 100%)'
                }}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <FileText size={48} className="mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Selecciona una página</h3>
              <p className="text-sm">O crea una nueva página para comenzar a escribir</p>
            </div>
          </div>
        )}
      </div>

      {/* Title Edit Modal */}
      {isEditingTitle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Editar título</h3>
            <input
              type="text"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditingTitle(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (currentPage) {
                    setNotebooks(prev => prev.map(nb => ({
                      ...nb,
                      sections: nb.sections.map(sec => ({
                        ...sec,
                        pages: sec.pages.map(page => 
                          page.id === currentPage.id 
                            ? { ...page, title: editingTitle }
                            : page
                        )
                      }))
                    })));
                  }
                  setIsEditingTitle(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        [contenteditable] h1 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem 0;
        }
        
        [contenteditable] h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0.75rem 0 0.5rem 0;
        }
        
        [contenteditable] h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0.5rem 0 0.25rem 0;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }
        
        [contenteditable] li {
          margin: 0.25rem 0;
        }
        
        [contenteditable] a {
          color: #2563eb;
          text-decoration: underline;
        }
        
        [contenteditable] a:hover {
          color: #1d4ed8;
        }
        
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
} 