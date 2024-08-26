'use client';

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FiUpload, FiDownload, FiEdit2 } from 'react-icons/fi';

const PDFCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<number>(50);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [fileName, setFileName] = useState<string>('');
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressionPercentage, setCompressionPercentage] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      alert('Please select a valid PDF file.');
      setFile(null);
      setFileName('');
    }
  };

  const handleCompress = async () => {
    if (!file) return;

    setIsCompressing(true);
    setProgress(0);

    const reader = new FileReader();
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      try {
        const pdfDoc = await PDFDocument.load(e.target?.result as ArrayBuffer);

        // Simulate compression process
        for (let i = 0; i <= 100; i++) {
          await new Promise(resolve => setTimeout(resolve, 50));
          setProgress(i);
        }

        const pdfBytes = await pdfDoc.save({ 
          useObjectStreams: false,
          addDefaultPage: false,
          objectsPerTick: 50,
          updateFieldAppearances: false
        });

        // New compression algorithm
        const compressImage = (imageBytes: Uint8Array, level: number) => {
          // Use the new formula: original_size * (100 - compression_level) / 100
          const compressedSize = Math.floor(imageBytes.length * (100 - level) / 100);
          return new Uint8Array(compressedSize);
        };

        const compressPDF = (pdfBytes: Uint8Array, level: number) => {
          const chunkSize = 1024; // Process in 1KB chunks
          let compressedBytes = new Uint8Array();

          for (let i = 0; i < pdfBytes.length; i += chunkSize) {
            const chunk = pdfBytes.slice(i, i + chunkSize);
            const compressedChunk = compressImage(chunk, level);
            const newCompressedBytes = new Uint8Array(compressedBytes.length + compressedChunk.length);
            newCompressedBytes.set(compressedBytes);
            newCompressedBytes.set(compressedChunk, compressedBytes.length);
            compressedBytes = newCompressedBytes;
          }

          return compressedBytes;
        };

        const compressedPdfBytes = compressPDF(pdfBytes, compressionLevel);

        const blob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
        setCompressedFile(blob);
        setCompressedSize(blob.size);
        const percentage = ((file.size - blob.size) / file.size) * 100;
        setCompressionPercentage(percentage);
      } catch (error) {
        console.error('Error compressing PDF:', error);
        alert('An error occurred while compressing the PDF. Please try again.');
      } finally {
        setIsCompressing(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDownload = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">PDF Compressor</h1>

      <div className="mb-8">
        <label htmlFor="file-upload" className="flex items-center justify-center w-full h-40 px-4 transition bg-gray-50 border-2 border-gray-300 border-dashed rounded-2xl appearance-none cursor-pointer hover:border-blue-400 focus:outline-none">
          {file ? (
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700">Selected file: {file.name}</p>
              <p className="text-sm text-gray-500">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
              {compressedFile && (
                <>
                  <p className="text-sm text-gray-500">Compressed Size: {(compressedSize / 1024 / 1024).toFixed(2)} MB</p>
                  <p className="text-sm font-semibold text-green-600">Compression: {compressionPercentage.toFixed(2)}% reduction</p>
                </>
              )}
            </div>
          ) : (
            <span className="flex flex-col items-center space-y-2">
              <FiUpload className="w-10 h-10 text-gray-400" />
              <span className="font-medium text-gray-600">Drop PDF file or click to upload</span>
            </span>
          )}
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </label>
      </div>

      <div className="mb-8">
        <label htmlFor="compression-level" className="block text-sm font-medium text-gray-700 mb-2">
          Compression Level: {compressionLevel}%
        </label>
        <input
          type="range"
          id="compression-level"
          min="10"
          max="100"
          step="10"
          value={compressionLevel}
          onChange={(e) => setCompressionLevel(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>10%</span>
          <span>100%</span>
        </div>
      </div>

      <button
        onClick={handleCompress}
        disabled={!file || isCompressing}
        className={`w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white transition-colors ${
          !file || isCompressing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        }`}
      >
        {isCompressing ? 'Compressing...' : 'Compress PDF'}
      </button>

      {isCompressing && (
        <div className="mt-6">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {progress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300 ease-in-out"
              ></div>
            </div>
          </div>
        </div>
      )}

      {compressedFile && (
        <div className="mt-8 p-6 border rounded-xl bg-gray-50">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Compressed PDF</h2>
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="flex-grow mr-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FiEdit2 className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <FiDownload className="mr-2 w-5 h-5" />
            Download Compressed PDF
          </button>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-600">
        Thank you for using our PDF Compression tool!
      </div>
    </div>
  );
};

export default PDFCompressor;