import { FileUploadStatus } from "@/service/file/types";

export const updateUploadProgress = (fileUploadStatus: FileUploadStatus) => {
  const { fileId } = fileUploadStatus;

  const fileElem = document.getElementById(fileId);
  if (!fileElem) return;

  const attachProgressLabelElem = fileElem.getElementsByClassName(
    "progressLabelAttach",
  )[0];

  if (attachProgressLabelElem) {
    // file is attachment
    if (fileUploadStatus.status === "UPLOADING")
      attachProgressLabelElem.textContent = `${fileUploadStatus.percentage}%`;
  } else {
    // file is doc
    const docLabelElem = fileElem.getElementsByClassName("progressLabel")[0];
    const docDescA = fileElem.getElementsByClassName("fileUploadDescA")[0];
    const docDescB = fileElem.getElementsByClassName("fileUploadDescB")[0];

    if (!docLabelElem || !docDescA || !docDescB) return;

    const progressPath = fileElem.getElementsByClassName(
      "CircularProgressbar-path",
    )[0] as SVGPathElement;
    const pathLength = progressPath?.getTotalLength();
    const percentLabel = fileElem.getElementsByClassName(
      "CircularProgressbar-text",
    )[0];
    if (!progressPath || !pathLength || !percentLabel) return;

    if (fileUploadStatus.status === "UPLOADING") {
      // Animate to percentage
      const offset =
        pathLength - (fileUploadStatus.percentage / 100) * pathLength;
      progressPath.style.strokeDashoffset = `${offset}px`;

      docDescA.textContent = `${fileUploadStatus.uploadedSize} / ${fileUploadStatus.size}`;
      percentLabel.textContent = `${fileUploadStatus.percentage}%`;
      docDescB.textContent = fileUploadStatus.speed;
    }
  }
};
