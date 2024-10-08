"use client";

import { delay } from "../components/utils/utils";
import { CircularSpinnerSmall } from "../components/global/spinners";
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
import { PdfPageExtractorState, initialPdfPageExtractorState } from "../components/pdf-page-extractor/pdf-page-extractor";
import {
  PageExtractorValidatorResult,
  validatePagesToExtract
} from "../components/pdf-page-extractor/page-extractor-validator";
import { extractPagesFromPdf } from "../components/pdf-page-extractor/pdf-page-extractor-core";
import { getTotalPagesFromPdf } from "../components/pdf-core/pdf-core-shared";

export default function PdfPageExtractor(): ReactElement {
  const dispatch = useAppDispatch();
  const pdfCoreState = useAppSelector((state) => state.pdfCore);

  const [pdfPageExtrState, setPdfPageExtrState] = useState<PdfPageExtractorState>(initialPdfPageExtractorState);
  const [loading, setLoading] = useState<boolean>(true);
  const [validatorTimer, setValidatorTimer] = useState<NodeJS.Timeout>();

  function refreshApp(): void {
    dispatch(refreshCoreState());
    setPdfPageExtrState(initialPdfPageExtractorState);
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

        if (processedFile.Content.size > pdfPageExtrState.MaxSizeAllowed) {
          handleFailedUpload("Max 20 MB size allowed for the PDF file!");
          return;
        }
        if (processedFile.Content.type !== pdfPageExtrState.FileTypeAllowed) {
          handleFailedUpload("You can only upload a PDF file!");
          return;
        }

        const totalPages: number = await getTotalPagesFromPdf(await processedFile.Content.arrayBuffer());

        if (totalPages === 1) {
          handleFailedUpload("That PDF file has only 1 page, which is not enough! It must have at least 2 pages.");
          return;
        }

        setPdfPageExtrState((prev) => ({ ...prev, UploadedFile: processedFile, TotalPages: totalPages }));
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
    setPdfPageExtrState((prev) => ({ ...prev, UploadedFile: null, TotalPages: 0 }));
  }

  function validatePageExtractor(pagesToExtract: string): void {
    let validatorResult: PageExtractorValidatorResult = validatePagesToExtract(pagesToExtract, pdfPageExtrState.TotalPages);

    setPdfPageExtrState((prev) => ({
      ...prev,
      TotalPagesToExtract: validatorResult[1],
      PagesToExtractInfo: validatorResult[2],
      PagesToExtractValidator: validatorResult[0]
    }));
  }

  function startPageExtractorValidator(pagesToExtract: string): void {
    if (validatorTimer !== undefined) {
      clearTimeout(validatorTimer);
    }
    if (pagesToExtract === "") {
      setPdfPageExtrState((prev) => ({
        ...prev,
        PagesToExtract: "",
        TotalPagesToExtract: 0,
        PagesToExtractInfo: initialPdfPageExtractorState.PagesToExtractInfo,
        PagesToExtractValidator: "EMPTY"
      }));
    } else {
      setPdfPageExtrState((prev) => ({
        ...prev,
        PagesToExtract: pagesToExtract,
        PagesToExtractValidator: "CHECKING"
      }));
      const timeOutId: NodeJS.Timeout = setTimeout(() => validatePageExtractor(pagesToExtract), 850);
      setValidatorTimer(timeOutId);
    }
  }

  async function submitFile(): Promise<void> {
    const submitMessage: string =
      pdfPageExtrState.TotalPagesToExtract == 1
        ? "Extracting 1 Page from the PDF file... ⏳"
        : `Extracting ${pdfPageExtrState.TotalPagesToExtract} Pages from the PDF file... ⏳`;

    dispatch(setSubmitMessage(submitMessage));
    setPdfPageExtrState((prev) => ({ ...prev, IsExtractionInitiated: true }));

    const pdfWithExtractedPagesUrl: string = await extractPagesFromPdf(
      await pdfPageExtrState.UploadedFile!.Content.arrayBuffer(),
      pdfPageExtrState.PagesToExtract
    );
    const fileName: string = pdfPageExtrState.UploadedFile!.Content.name;
    const finalPdfFileName: string = `${fileName.substring(0, fileName.lastIndexOf("."))} (Extracted)`;
    await delay(1000);

    const downloadMessage: string =
      pdfPageExtrState.TotalPagesToExtract == 1
        ? "Successfully Extracted 1 Page from the PDF File. ✅"
        : `Successfully Extracted ${pdfPageExtrState.TotalPagesToExtract} Pages from the PDF File. ✅`;

    dispatch(setDownloadMessage(downloadMessage));
    dispatch(setFinalPdfUrl({ PdfFilename: finalPdfFileName, PdfUrl: pdfWithExtractedPagesUrl }));
    setPdfPageExtrState((prev) => ({ ...prev, IsExtractionComplete: true }));
  }

  if (
    !loading &&
    !pdfCoreState.IsUploadInitiated &&
    !pdfPageExtrState.IsExtractionInitiated &&
    !pdfPageExtrState.IsExtractionComplete
  ) {
    return (
      <>
        <main className="h-full flex flex-col justify-center items-center">
          <div className="font-bold tracking-wide h-[8rem] flex flex-col justify-center items-center text-center mt-14 max-sm:mt-5 px-2 text-6xl max-sm:text-[2.5rem] font-sans">
            PDF Page Extractor
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
                    <tr key={pdfPageExtrState.UploadedFile!.Id}>
                      <td className="px-4 text-center">
                        <i className="text-4xl max-sm:text-3xl mb-2 fa-solid fa-file-pdf"></i>
                        <p>{pdfPageExtrState.UploadedFile!.Content.name}</p>
                        <p>{`(${pdfPageExtrState.TotalPages} Pages)`}</p>
                        <span
                          className="hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white rounded-md hover:shadow hover:shadow-[#404756] dark:hover:shadow-[#ffffffa6] p-1 cursor-pointer fa-solid fa-xmark mt-2"
                          title="Remove File"
                          onClick={removeFile}
                        ></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="h-[9.5rem] mb-12 max-sm:mb-10 text-[1.5rem] max-sm:text-[1.25rem]">
                  <p className="px-6 mb-4">{"Enter the page(s) to extract:"}</p>
                  <input
                    className={`mb-4 border border-[#AEAEAE] rounded-lg font-mono  h-auto w-32 max-sm:w-28 mx-auto text-center`}
                    type="text"
                    value={pdfPageExtrState.PagesToExtract}
                    onInput={(e) => startPageExtractorValidator(e.currentTarget.value)}
                    placeholder="Page No."
                  />
                  {pdfPageExtrState.PagesToExtractValidator === "CHECKING" ? (
                    <CircularSpinnerSmall />
                  ) : (
                    <p className="px-6">{pdfPageExtrState.PagesToExtractInfo}</p>
                  )}
                </div>
                <div className="h-[6rem] max-sm:h-[5rem]">
                  <button
                    className="text-3xl max-sm:text-2xl rounded-xl bg-green-700 dark:bg-green-900 hover:bg-green-900 dark:hover:bg-green-950 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 hover:ring hover:ring-green-500 dark:hover:ring-green-700 disabled:ring-transparent dark:disabled:ring-transparent text-gray-200 disabled:text-zinc-300 dark:disabled:text-zinc-600 p-2 h-[4.5rem] w-52 max-sm:h-16 max-sm:w-40"
                    onClick={submitFile}
                    disabled={pdfPageExtrState.PagesToExtractValidator === "VALID" ? false : true}
                  >
                    <i className="fa-solid fa-circle-check mr-3"></i>Extract
                  </button>
                </div>
              </div>
              <div className="h-[6rem]">
                <button
                  className="text-3xl max-sm:text-2xl rounded-xl bg-[#074DA6] dark:bg-[#05336E] hover:bg-[#05346e] dark:hover:bg-[#04234D] hover:ring hover:ring-[#0091ff] dark:hover:ring-[#074DA6] text-gray-200 p-2 h-[4.5rem] w-52 max-sm:h-16 max-sm:w-40"
                  onClick={refreshApp}
                >
                  <i className="fa-solid fa-arrow-rotate-right mr-3"></i>Re-Do
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

  if (!loading && pdfPageExtrState.IsExtractionInitiated && !pdfPageExtrState.IsExtractionComplete) {
    return (
      <>
        <ActionStateContainer />
      </>
    );
  }

  if (!loading && pdfPageExtrState.IsExtractionComplete) {
    return (
      <>
        <DownloadContainer ToolName="PDF Page Extractor" RefreshApp={refreshApp} />
      </>
    );
  }

  return <></>;
}
