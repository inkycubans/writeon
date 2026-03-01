import React, { useState, useEffect, useRef } from 'react';
import { Save, Plus, FileText, Film, BookOpen, Sparkles, Settings, Download, Menu, X, Trash2 } from 'lucide-react';

const App = () => {
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const editorRef = useRef(null);

  const projectTypes = [
    { id: 'novel', name: 'Roman', icon: BookOpen, color: 'bg-blue-500', description: 'Långt berättande verk' },
    { id: 'short-story', name: 'Novell', icon: FileText, color: 'bg-green-500', description: 'Kortare berättelse' },
    { id: 'screenplay', name: 'Filmmanus', icon: Film, color: 'bg-purple-500', description: 'Manus för film' },
    { id: 'stage-play', name: 'Teatermanus', icon: Film, color: 'bg-pink-500', description: 'Manus för teater' }
  ];

  // Load data from storage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const apiKeyResult = await window.storage.get('apiKey');
        if (apiKeyResult) setApiKey(apiKeyResult.value);

        const projectsResult = await window.storage.get('projects');
        if (projectsResult) {
          const loadedProjects = JSON.parse(projectsResult.value);
          setProjects(loadedProjects);
          if (loadedProjects.length > 0) {
            setCurrentProject(loadedProjects[0]);
          }
        }
      } catch (error) {
        console.log('Första gången appen laddas - ingen sparad data ännu');
      }
    };
    loadData();
  }, []);

  // Save projects whenever they change
  useEffect(() => {
    if (projects.length > 0) {
      window.storage.set('projects', JSON.stringify(projects), false);
    }
  }, [projects]);

  const saveApiKey = async () => {
    if (!apiKey.trim()) {
      alert('Vänligen ange en API-nyckel');
      return;
    }
    await window.storage.set('apiKey', apiKey, false);
    setShowSettings(false);
  };

  const createProject = (type, title) => {
    const newProject = {
      id: Date.now().toString(),
      type,
      title,
      content: getTemplateForType(type),
      created: new Date().toISOString(),
      modified: new Date().toISOString()
    };
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
    setShowNewProject(false);
  };

  const deleteProject = (projectId) => {
    if (confirm('Är du säker på att du vill radera detta projekt? Detta går inte att ångra.')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      setProjects(updatedProjects);
      if (currentProject?.id === projectId) {
        setCurrentProject(updatedProjects[0] || null);
      }
    }
  };

  const getTemplateForType = (type) => {
    const templates = {
      'novel': '',
      'short-story': '',
      'screenplay': 'FADE IN:\n\nINT. ',
      'stage-play': 'AKT I\n\nSCEN 1\n\n'
    };
    return templates[type] || '';
  };

  const updateContent = (content) => {
    if (currentProject) {
      const updated = { ...currentProject, content, modified: new Date().toISOString() };
      setCurrentProject(updated);
      setProjects(projects.map(p => p.id === updated.id ? updated : p));
    }
  };

  const callGeminiAPI = async (prompt, userContent) => {
    if (!apiKey) {
      alert('Vänligen ange din Gemini API-nyckel i inställningarna först!');
      setShowSettings(true);
      return null;
    }

    setIsProcessing(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `${prompt}\n\nAktuell text:\n${userContent}` }]
            }],
            generationConfig: { maxOutputTokens: 2000 }
          })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API-anrop misslyckades');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      alert(`Fel vid AI-anrop: ${error.message}\n\nKontrollera att din API-nyckel är korrekt i inställningarna.`);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAiAssist = async (mode) => {
    if (!currentProject) return;

    const selection = window.getSelection().toString();
    const textToProcess = selection || currentProject.content;

    if (!textToProcess.trim()) {
      alert('Ingen text att bearbeta. Skriv något först eller markera text.');
      return;
    }

    let prompt = '';
    switch (mode) {
      case 'continue':
        prompt = 'Fortsätt skriva på denna text på ett naturligt sätt. Behåll stil och ton. Skriv cirka 150-200 ord.';
        break;
      case 'improve':
        prompt = 'Förbättra denna text genom att göra den mer levande, engagerande och välskriven. Behåll grundinnehållet men förbättra formuleringar, rytm och bildspråk.';
        break;
      case 'dialog':
        prompt = 'Förbättra dialogen i denna text. Gör den mer naturlig, dynamisk och karaktärsdriven. Om det inte finns dialog, föreslå var dialog skulle kunna läggas till.';
        break;
      case 'structure':
        prompt = 'Analysera strukturen i denna text. Ge konkreta förslag på förbättringar av uppbyggnad, tempo och narrativ flöde.';
        break;
      default:
        return;
    }

    const result = await callGeminiAPI(prompt, textToProcess);
    if (result) {
      if (selection) {
        // Replace selection
        const textarea = editorRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = currentProject.content.substring(0, start) + result + currentProject.content.substring(end);
        updateContent(newContent);
      } else if (mode === 'continue') {
        // Append for continue mode
        updateContent(currentProject.content + '\n\n' + result);
      } else {
        // For analysis/suggestions, show in alert
        alert(result);
      }
    }
  };

  const exportProject = () => {
    if (!currentProject) return;
    
    const blob = new Blob([currentProject.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProject.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getTypeInfo = (typeId) => {
    return projectTypes.find(t => t.id === typeId);
  };

  // First-time setup screen
  if (!apiKey && !showSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Välkommen till WriteOn</h1>
            <p className="text-gray-600">Ett kraftfullt verktyg för författare, drivet av Gemini AI</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-indigo-900 mb-2">Vad kan du göra?</h3>
            <ul className="text-sm text-indigo-800 space-y-1">
              <li>✍️ Skriv romaner, noveller och manus</li>
              <li>🤖 Få AI-assistans medan du skriver</li>
              <li>💾 Spara alla dina projekt säkert</li>
              <li>📥 Exportera till olika format</li>
            </ul>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Gemini API-nyckel
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-indigo-600 hover:text-indigo-700 text-xs"
                >
                  (Hämta här →)
                </a>
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={saveApiKey}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Spara och börja skriva
            </button>
            <p className="text-xs text-gray-500 text-center">
              Din API-nyckel sparas säkert i din webbläsare och delas aldrig med någon annan.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded"
          >
            {showMobileMenu ? <X /> : <Menu />}
          </button>
          <Sparkles className="w-8 h-8 text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-900 hidden sm:block">WriteOn</h1>
        </div>
        <div className="flex items-center space-x-2">
          {currentProject && (
            <>
              <button
                onClick={exportProject}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Exportera projekt"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteProject(currentProject.id)}
                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
                title="Radera projekt"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </>
          )}
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            title="Inställningar"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${showMobileMenu ? 'block' : 'hidden'} lg:block w-full lg:w-64 bg-white border-r border-gray-200 overflow-y-auto absolute lg:relative z-10 h-full`}>
          <div className="p-4">
            <button
              onClick={() => setShowNewProject(true)}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Nytt projekt</span>
            </button>
          </div>
          
          <div className="px-4 pb-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase mb-2">Dina projekt</h2>
            {projects.length === 0 ? (
              <p className="text-sm text-gray-500 italic">Inga projekt ännu</p>
            ) : (
              <div className="space-y-1">
                {projects.map(project => {
                  const typeInfo = getTypeInfo(project.type);
                  const Icon = typeInfo.icon;
                  return (
                    <button
                      key={project.id}
                      onClick={() => {
                        setCurrentProject(project);
                        setShowMobileMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center space-x-2 ${
                        currentProject?.id === project.id
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{project.title}</p>
                        <p className="text-xs text-gray-500">{typeInfo.name}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {currentProject ? (
            <>
              {/* Project Header */}
              <div className="bg-white border-b border-gray-200 px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">{currentProject.title}</h2>
                <p className="text-sm text-gray-500">
                  {getTypeInfo(currentProject.type).name} • 
                  Senast ändrad: {new Date(currentProject.modified).toLocaleDateString('sv-SE', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              {/* AI Toolbar */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200 px-6 py-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAiAssist('continue')}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Fortsätt skriva</span>
                  </button>
                  <button
                    onClick={() => handleAiAssist('improve')}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Förbättra text
                  </button>
                  <button
                    onClick={() => handleAiAssist('dialog')}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Förbättra dialog
                  </button>
                  <button
                    onClick={() => handleAiAssist('structure')}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Analysera struktur
                  </button>
                </div>
                {isProcessing && (
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                    <p className="text-sm text-indigo-600">Gemini arbetar...</p>
                  </div>
                )}
              </div>

              {/* Editor */}
              <div className="flex-1 overflow-y-auto p-6">
                <textarea
                  ref={editorRef}
                  value={currentProject.content}
                  onChange={(e) => updateContent(e.target.value)}
                  className="w-full h-full min-h-[600px] p-6 bg-white rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono text-base leading-relaxed"
                  placeholder="Börja skriva här..."
                  spellCheck="false"
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Inget projekt valt</h3>
                <p className="text-gray-500 mb-4">Skapa ett nytt projekt för att komma igång</p>
                <button
                  onClick={() => setShowNewProject(true)}
                  className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
                >
                  Skapa projekt
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skapa nytt projekt</h2>
            <p className="text-gray-600 mb-6">Välj typ av projekt du vill skapa</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {projectTypes.map(type => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      const title = prompt(`Ange titel för din ${type.name.toLowerCase()}:`);
                      if (title && title.trim()) {
                        createProject(type.id, title.trim());
                      }
                    }}
                    className="p-6 rounded-xl border-2 border-gray-200 hover:border-indigo-400 transition flex flex-col items-center space-y-3 group"
                  >
                    <div className={`${type.color} w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <span className="font-medium text-gray-900 block">{type.name}</span>
                      <span className="text-sm text-gray-500">{type.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setShowNewProject(false)}
              className="w-full py-2 text-gray-600 hover:text-gray-900 transition"
            >
              Avbryt
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Inställningar</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Gemini API-nyckel
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-indigo-600 hover:text-indigo-700 text-xs"
                  >
                    (Hämta här →)
                  </a>
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="AIzaSy..."
                />
                <p className="text-xs text-gray-500 mt-1">Sparas säkert i din webbläsare</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={saveApiKey}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Spara
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Avbryt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
