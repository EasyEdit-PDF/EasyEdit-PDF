"use client";

import {CircularSpinnerSmall} from"../components/global/spinners"
import { delay } from "../components/utils/utils";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { ProcessedFile } from "../components/models/processed-file";
import { useAppDispatch, useAppSelector } from "../lib/redux-hooks";
import {
  refreshCoreState,
  setDownloadMessage,
  setFinalPdfUrl,
  setIsUploadComplete,
  setIsUploadFailed,
  setIsUploadInitiated,
  setSubmitMessage,
  setUploadErrorMessage,
  setUploadMessage
} from "../lib/redux-features/pdf-core/pdf-core-slice";
import UploadContainer from "../components/global/upload-container";
import UploadFailedContainer from "../components/global/upload-failed-container";
import UploadStateContainer from "../components/global/upload-state-container";
import ActionStateContainer from "../components/global/action-state-container";
import DownloadContainer from "../components/global/download-container";
import {
  EncryptorValidatorState,
  PdfEncryptorState,
  initialPdfEncryptorState
} from "../components/pdf-encryptor/pdf-encryptor";
import { encryptPdf } from "../components/pdf-encryptor/pdf-encryptor-core";

export default function PdfEncryptor(): ReactElement {
  const dispatch = useAppDispatch();
  const pdfCoreState = useAppSelector((state) => state.pdfCore);

  const [pdfEncryptorState, setPdfEncryptorState] = useState<PdfEncryptorState>(initialPdfEncryptorState);
  const [loading, setLoading] = useState<boolean>(true);
  const [validatorTimer, setValidatorTimer] = useState<NodeJS.Timeout>();

  function refreshApp(): void {
    dispatch(refreshCoreState());
    setPdfEncryptorState(initialPdfEncryptorState);
  }
  /*
    refreshAppCached() is a useCallback() or Cached version of refreshApp()
    specifically made to be used within the useEffect() hook.
   */
  const refreshAppCached = useCallback(refreshApp, [dispatch]);

  useEffect(() => {
    refreshAppCached();
    setLoading(false);
  }, [refreshAppCached]);

  async function uploadFilesInitializer(files: FileList | null): Promise<void> {
    if (files !== null) {
      if (files.length === 0) {
        return;
      }

      refreshApp();
      dispatch(setUploadMessage("Uploading your PDF file... ⏳"));
      dispatch(setIsUploadInitiated(true));

      await delay(1000);

      if (files.item(0) !== null) {
        let processedFile: ProcessedFile = { Id: 1, Content: files.item(0)! };

        if (processedFile.Content.size > pdfEncryptorState.MaxSizeAllowed) {
          handleFailedUpload("Max 20 MB size allowed for the PDF file!");
          return;
        }
        if (processedFile.Content.type !== pdfEncryptorState.FileTypeAllowed) {
          handleFailedUpload("You can only upload a PDF file!");
          return;
        }

        setPdfEncryptorState((prev) => ({ ...prev, UploadedFile: processedFile }));
        dispatch(setUploadMessage("PDF file uploaded. ✅"));
        dispatch(setIsUploadInitiated(false));
        dispatch(setIsUploadComplete(true));
      }
    }
  }

  function handleFailedUpload(uploadErrorMessage: string): void {
    dispatch(setUploadMessage("Upload failed! ❌"));
    dispatch(setUploadErrorMessage(uploadErrorMessage));
    dispatch(setIsUploadInitiated(false));
    dispatch(setIsUploadFailed(true));
  }

  function removeFile(): void {
    dispatch(setIsUploadComplete(false));
    dispatch(setIsUploadFailed(true));
    dispatch(setUploadMessage("PDF file deleted."));
    dispatch(setUploadErrorMessage("You have to upload again."));
    setPdfEncryptorState((prev) => ({ ...prev, UploadedFile: null }));
  }

  function updatePassword(password: string): void {
    if (pdfEncryptorState.ReTypedPassword !== "") {
      setPdfEncryptorState((prev) => ({
        ...prev,
        Password: password,
        ReTypedPassword: "",
        EncryptorInfo: initialPdfEncryptorState.EncryptorInfo,
        EncryptorValidator: "EMPTY"
      }));
    } else {
      setPdfEncryptorState((prev) => ({ ...prev, Password: password }));
    }
  }

  function validateEncryptor(password: string): void {
    let encryptorResultInfo: string = "";
    let encryptorState: EncryptorValidatorState = "CHECKING";

    if (password === pdfEncryptorState.Password) {
      encryptorResultInfo = "Passwords are matching. ✅";
      encryptorState = "VALID";
    } else {
      encryptorResultInfo = "Passwords don't match. ❌";
      encryptorState = "INVALID";
    }

    setPdfEncryptorState((prev) => ({
      ...prev,
      EncryptorInfo: encryptorResultInfo,
      EncryptorValidator: encryptorState
    }));
  }

  function startEncryptorValidator(password: string): void {
    if (validatorTimer !== undefined) {
      clearTimeout(validatorTimer);
    }
    if (password === "") {
      setPdfEncryptorState((prev) => ({
        ...prev,
        ReTypedPassword: "",
        EncryptorInfo: initialPdfEncryptorState.EncryptorInfo,
        EncryptorValidator: "EMPTY"
      }));
    } else {
      setPdfEncryptorState((prev) => ({
        ...prev,
        ReTypedPassword: password,
        EncryptorValidator: "CHECKING"
      }));
      const timeOutId: NodeJS.Timeout = setTimeout(() => validateEncryptor(password), 850);
      setValidatorTimer(timeOutId);
    }
  }

  async function submitFile(): Promise<void> {
    let submitMessage: string = "Encrypting the PDF file... ⏳";
    dispatch(setSubmitMessage(submitMessage));
    setPdfEncryptorState((prev) => ({ ...prev, IsEncryptonInitiated: true }));

    const encryptedPdfUrl: string = await encryptPdf(
      await pdfEncryptorState.UploadedFile!.Content.arrayBuffer(),
      pdfEncryptorState.Password
    );
    const fileName: string = pdfEncryptorState.UploadedFile!.Content.name;
    const finalPdfFileName: string = `${fileName.substring(0, fileName.lastIndexOf("."))} (Encrypted)`;
    await delay(1000);

    dispatch(setDownloadMessage("Successfully Encrypted the PDF File. ✅"));
    dispatch(setFinalPdfUrl({ PdfFilename: finalPdfFileName, PdfUrl: encryptedPdfUrl }));
    setPdfEncryptorState((prev) => ({ ...prev, IsEncryptonComplete: true }));
  }

  if (
    !loading &&
    !pdfCoreState.IsUploadInitiated &&
    !pdfEncryptorState.IsEncryptonInitiated &&
    !pdfEncryptorState.IsEncryptonComplete
  ) {
    return (
      <>
        <main className="h-full flex flex-col justify-center items-center">
          <div className="font-bold tracking-wide h-[8rem] flex flex-col justify-center items-center text-center mt-14 max-sm:mt-5 px-2 text-6xl max-sm:text-[2.5rem] font-sans">
            PDF Encryptor
          </div>
          {!pdfCoreState.IsUploadInitiated && !pdfCoreState.IsUploadComplete && !pdfCoreState.IsUploadFailed && (
            <UploadContainer UploadType="PDF" IsMultipleUpload={false} UploadFiles={uploadFilesInitializer} />
          )}

          {pdfCoreState.IsUploadFailed && <UploadFailedContainer RefreshApp={refreshApp} />}

          {pdfCoreState.IsUploadComplete && (
            <div className="flex flex-col justify-center items-center text-center mt-16 mb-8 max-sm:-mt-4 max-sm:mb-7 text-[1.7rem] max-sm:text-[1.55rem] font-sans">
              <div>
                <div className="mb-8 max-sm:mb-7">
                  <p className="font-semibold px-6">{pdfCoreState.UploadMessage}</p>
                </div>
                <table className="table-fixed border-collapse mx-auto mb-8 max-sm:mb-7 text-[1.2rem] max-sm:text-[1.1rem]">
                  <tbody>
                    <tr key={pdfEncryptorState.UploadedFile!.Id}>
                      <td className="px-4 text-center">
                        <i className="text-4xl max-sm:text-3xl mb-2 fa-solid fa-file-pdf"></i>
                        <p>{pdfEncryptorState.UploadedFile!.Content.name}</p>
                        <span
                          className="hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white rounded-md hover:shadow hover:shadow-[#404756] dark:hover:shadow-[#ffffffa6] cursor-pointer fa-solid fa-xmark p-1 mt-2"
                          title="Remove File"
                          onClick={removeFile}
                        ></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="h-[9.5rem] mb-24 max-sm:mb-16 text-[1.5rem] max-sm:text-[1.25rem]">
                  <p className="px-6 mb-4">Enter a Password:</p>
                  <input
                    className={`mb-4 border border-[#AEAEAE] rounded-lg font-mono  h-auto w-80 max-sm:w-52 mx-auto text-center`}
                    type="password"
                    value={pdfEncryptorState.Password}
                    onInput={(e) => updatePassword(e.currentTarget.value)}
                    placeholder="Password"
                  />
                  {pdfEncryptorState.EncryptorValidator === "CHECKING" ? (
                    <div className="mb-4 max-sm:mb-[1.12rem]">
                      <CircularSpinnerSmall />
                    </div>
                  ) : (
                    <p className="px-6 mb-4">{pdfEncryptorState.EncryptorInfo}</p>
                  )}
                  <input
                    className={`mb-4 border border-[#AEAEAE] rounded-lg font-mono  h-auto w-80 max-sm:w-52 mx-auto text-center`}
                    type="password"
                    value={pdfEncryptorState.ReTypedPassword}
                    onInput={(e) => startEncryptorValidator(e.currentTarget.value)}
                    placeholder="Verify Password"
                  />
                </div>
                <div className="h-[6rem] max-sm:h-[5rem]">
                  <button
                    className="text-3xl max-sm:text-2xl rounded-xl bg-green-700 dark:bg-green-900 hover:bg-green-900 dark:hover:bg-green-950 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 hover:ring hover:ring-green-500 dark:hover:ring-green-700 disabled:ring-transparent dark:disabled:ring-transparent text-gray-200 disabled:text-zinc-300 dark:disabled:text-zinc-600 p-2 h-[4.5rem] w-52 max-sm:h-16 max-sm:w-40"
                    onClick={submitFile}
                    disabled={pdfEncryptorState.EncryptorValidator === "VALID" ? false : true}
                  >
                    <i className="fa-solid fa-circle-check mr-3"></i>Encrypt
                  </button>
                </div>
              </div>
              <div className="h-[6rem]">
                <button
                  className="text-3xl max-sm:text-2xl rounded-xl bg-[#074DA6] dark:bg-[#05336E] hover:bg-[#05346e] dark:hover:bg-[#04234D] hover:ring hover:ring-[#0091ff] dark:hover:ring-[#074DA6] text-gray-200 p-2 h-[4.5rem] w-52 max-sm:h-16 max-sm:w-40"
                  onClick={refreshApp}
                >
                    <i className="fa-solid fa-arrow-rotate-right mr-3"></i>Try Again With Another PDF
                    </button>
              </div>
            </div>
          )}
        </main>
      </>
    );
  }

  if (!loading && pdfCoreState.IsUploadInitiated && !pdfCoreState.IsUploadComplete) {
    return (
      <>
        <UploadStateContainer />
      </>
    );
  }

  if (!loading && pdfEncryptorState.IsEncryptonInitiated && !pdfEncryptorState.IsEncryptonComplete) {
    return (
      <>
        <ActionStateContainer />
      </>
    );
  }

  if (!loading && pdfEncryptorState.IsEncryptonComplete) {
    return (
      <>
        <DownloadContainer ToolName="PDF Encryptor" RefreshApp={refreshApp} />
      </>
    );
  }

  return <></>;
}
