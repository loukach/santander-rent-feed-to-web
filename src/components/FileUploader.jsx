import React, { useRef } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';

const FileUploader = ({ onFileUpload, loading, error }) => {
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/xml') {
      onFileUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <FileText className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Cargar Catálogo XML
            </h2>
            <p className="text-gray-600">
              Seleccione el archivo XML del catálogo Motorflash
            </p>
          </div>

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-red-400 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600">
              Haga clic o arrastre el archivo XML aquí
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Formato: XML de Motorflash API
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xml,text/xml"
              onChange={handleFileSelect}
              className="hidden"
              disabled={loading}
            />
          </div>

          {loading && (
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
              <p className="text-sm text-gray-600 text-center mt-2">
                Procesando XML...
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;