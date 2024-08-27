'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import { Upload, ZapIcon, Download, Loader2, FileIcon, Edit2, CheckCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PDFCompressor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [isEditingFileName, setIsEditingFileName] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [encryptedFile, setEncryptedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setFileName(acceptedFiles[0].name.replace('.pdf', '') + '_compressed-easyeditpdf.pdf');
      setCompressedFile(null);
      setEncryptedFile(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  const compressPDF = async () => {
    if (!file) return;
    setIsCompressing(true);
    setCompressionProgress(0);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const compressedPdfDoc = await PDFDocument.create();
      const pages = await compressedPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
      const totalPages = pages.length;

      for (let i = 0; i < totalPages; i++) {
        compressedPdfDoc.addPage(pages[i]);
      }

      const pdfBytes = await compressedPdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      const compressedBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      setCompressedFile(new File([compressedBlob], fileName, { type: 'application/pdf' }));
    } catch (error) {
      console.error('Error compressing PDF:', error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCompressing) {
      const duration = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
      const interval = duration / 100;
      let progress = 0;

      timer = setInterval(() => {
        progress += 1;
        setCompressionProgress(progress);

        if (progress >= 100) {
          clearInterval(timer);
          setIsCompressing(false);
          setCompressionProgress(100);
        }
      }, interval);
    }
    return () => clearInterval(timer);
  }, [isCompressing]);

  const downloadCompressedFile = () => {
    if (compressedFile) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(compressedFile);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const encryptPDF = async () => {
    if (!compressedFile || password !== confirmPassword) return;
    setIsEncrypting(true);
    try {
      const arrayBuffer = await compressedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      pdfDoc.encrypt({
        userPassword: password,
        ownerPassword: password,
        permissions: {
          printing: 'highResolution',
          modifying: false,
          copying: false,
          annotating: false,
          fillingForms: false,
          contentAccessibility: true,
          documentAssembly: false,
        },
      });

      const pdfBytes = await pdfDoc.save();
      const encryptedBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      setEncryptedFile(new File([encryptedBlob], fileName.replace('.pdf', '_encrypted.pdf'), { type: 'application/pdf' }));
    } catch (error) {
      console.error('Error encrypting PDF:', error);
    } finally {
      setIsEncrypting(false);
    }
  };

  const downloadEncryptedFile = () => {
    if (encryptedFile) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(encryptedFile);
      link.download = encryptedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">PDF Compressor</CardTitle>
          <CardDescription className="text-center">Compress your PDF files easily</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all hover:border-primary ${
              isDragActive ? 'border-primary bg-primary/10' : 'border-muted'
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="flex flex-col items-center">
                {compressedFile && compressionProgress === 100 ? (
                  <CheckCircle className="w-12 h-12 mb-2 text-green-500" />
                ) : (
                  <FileIcon className="w-12 h-12 mb-4 text-primary" />
                )}
                <p className="text-lg font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg font-medium">
                  {isDragActive ? "Drop the PDF file here ..." : "Drag & drop a PDF file here, or click to select one"}
                </p>
              </>
            )}
          </div>

          {file && (
            <div className="space-y-4">
              {isCompressing ? (
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary-100">
                        Compressing
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-primary">
                        {compressionProgress.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
                    <div style={{ width: `${compressionProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary">
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loader2 className="animate-spin h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    setIsCompressing(true);
                    compressPDF();
                  }}
                  disabled={isCompressing}
                  className="w-full"
                >
                  <ZapIcon className="mr-2 h-4 w-4" /> Compress PDF
                </Button>
              )}
            </div>
          )}

          {compressedFile && !isCompressing && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Compression Results</h3>
              <Progress value={((1 - compressedFile.size / file!.size) * 100)} className="w-full" />
              <div className="flex justify-between text-sm">
                <span>Original: {(file!.size / 1024 / 1024).toFixed(2)} MB</span>
                <span>Compressed Size: {(compressedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                <p className="text-green-200 font-semibold">
                Size Reduction: {((1 - compressedFile.size / file!.size) * 100).toFixed(2)}%
              </p>
              </div>

              <div className="flex items-center space-x-2">
                {isEditingFileName ? (
                  <div className="flex-grow flex items-center">
                    <Input
                      value={fileName.slice(0, -4)}
                      onChange={(e) => setFileName(e.target.value + '.pdf')}
                      onBlur={() => setIsEditingFileName(false)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          setIsEditingFileName(false);
                        }
                      }}
                      className="flex-grow"
                      autoFocus
                    />
                    <span className="ml-1 font-bold">.pdf</span>
                  </div>
                ) : (
                  <p className="flex-grow text-sm font-medium">
                    {fileName.slice(0, -4)}<span className="font-bold">.pdf</span>
                  </p>
                )}
                <Button
                  onClick={() => setIsEditingFileName(!isEditingFileName)}
                  variant="outline"
                  size="sm"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
              <Button
                onClick={downloadCompressedFile}
                className="w-full"
                variant="secondary"
              >
                <Download className="mr-2 h-4 w-4" /> Download Compressed PDF
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    <Lock className="mr-2 h-4 w-4" /> Encrypt PDF
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Encrypt PDF</DialogTitle>
                    <DialogDescription>
                      Set a password to encrypt your PDF. Note: Without this password, you won't be able to open the PDF.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 text-grey-200">
                    <Input
                      className="text-grey-200"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      className="text-grey-200"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                      onClick={encryptPDF}
                      disabled={isEncrypting || password !== confirmPassword}
                      className="w-full"
                    >
                      {isEncrypting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                      {isEncrypting ? 'Encrypting...' : 'Encrypt and Download'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              {encryptedFile && (
                <Button
                  onClick={downloadEncryptedFile}
                  className="w-full"
                  variant="secondary"
                >
                  <Download className="mr-2 h-4 w-4" /> Download Encrypted PDF
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFCompressor;
