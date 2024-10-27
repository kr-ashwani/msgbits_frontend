export interface DeviceStatus {
  hasMicrophone: boolean;
  hasCamera: boolean;
  error?: string;
}

interface DeviceCheckResult {
  success: boolean;
  error?: string;
}

type DeviceType = "mic" | "camera" | "micAndCamera";

class DeviceAccessChecker {
  private formatErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      switch (error.name) {
        case "NotAllowedError":
        case "PermissionDeniedError":
          return "Permission denied. Please allow access to your devices in browser settings.";
        case "NotFoundError":
        case "DevicesNotFoundError":
          return "Required media devices not found. Please check your device connections.";
        case "NotReadableError":
        case "TrackStartError":
          return "Device is in use by another application or not accessible.";
        case "OverconstrainedError":
          return "Device does not meet the required constraints.";
        case "SecurityError":
          return "Media access is not allowed due to security restrictions.";
        case "AbortError":
          return "Device access request was aborted.";
        default:
          return (
            error.message ||
            "An unknown error occurred while accessing devices."
          );
      }
    }
    return "An unexpected error occurred while checking device access.";
  }

  private async checkMicrophone(): Promise<DeviceCheckResult> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      stream.getTracks().forEach((track) => track.stop());
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Microphone: ${this.formatErrorMessage(error)}`,
      };
    }
  }

  private async checkCamera(): Promise<DeviceCheckResult> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      stream.getTracks().forEach((track) => track.stop());
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Camera: ${this.formatErrorMessage(error)}`,
      };
    }
  }

  private checkBrowserSupport(): { supported: boolean; error?: string } {
    if (!navigator) {
      return {
        supported: false,
        error: "Navigator API is not available in this environment.",
      };
    }
    if (!navigator.mediaDevices) {
      return {
        supported: false,
        error: "Media Devices API is not supported in this browser.",
      };
    }
    if (!navigator.mediaDevices.getUserMedia) {
      return {
        supported: false,
        error:
          "getUserMedia is not supported in this browser. Please update your browser.",
      };
    }
    return { supported: true };
  }

  async checkDeviceAccess(deviceType: DeviceType): Promise<DeviceStatus> {
    const browserSupport = this.checkBrowserSupport();
    if (!browserSupport.supported) {
      return {
        hasMicrophone: false,
        hasCamera: false,
        error: browserSupport.error,
      };
    }

    try {
      let micStatus: DeviceCheckResult = { success: false };
      let cameraStatus: DeviceCheckResult = { success: false };

      switch (deviceType) {
        case "mic":
          micStatus = await this.checkMicrophone();
          break;
        case "camera":
          cameraStatus = await this.checkCamera();
          break;
        case "micAndCamera":
          [micStatus, cameraStatus] = await Promise.all([
            this.checkMicrophone(),
            this.checkCamera(),
          ]);
          break;
      }

      const status: DeviceStatus = {
        hasMicrophone: deviceType === "camera" ? false : micStatus.success,
        hasCamera: deviceType === "mic" ? false : cameraStatus.success,
      };

      // Collect all relevant error messages
      const errors: string[] = [];
      if (micStatus.error) errors.push(micStatus.error);
      if (cameraStatus.error) errors.push(cameraStatus.error);

      if (errors.length > 0) {
        status.error = errors.join(" | ");
      }

      return status;
    } catch (error) {
      return {
        hasMicrophone: false,
        hasCamera: false,
        error: `Unexpected error: ${this.formatErrorMessage(error)}`,
      };
    }
  }
}

export const deviceChecker = new DeviceAccessChecker();
