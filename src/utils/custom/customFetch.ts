"use client";
import { z } from "zod";
import { fromError } from "zod-validation-error";

interface SuccessData<T extends z.ZodSchema> {
  success: true;
  payload: T;
}
interface FailureData {
  success: false;
  errCode: string;
  error: string;
}
const ServerErrorResponse = z.object({
  success: z.boolean().default(false),
  errCode: z.string(),
  message: z.string(),
});
/**
 * App must use this custom fetch to fetch any data from endpoint
 */
class CustomFetch {
  static serverURL = process.env.NEXT_PUBLIC_SERVER_URL as string;

  async fetchData<T extends z.ZodSchema, U>(
    input: RequestInfo | URL,
    sucessDataSchema: T,
    jsonData: U | null = null,
    init?: RequestInit,
  ): Promise<SuccessData<z.infer<T>> | FailureData> {
    try {
      const reqToSelfServer =
        (typeof input === "string" || input instanceof String) &&
        input.startsWith("/");

      let jsonReq: null | RequestInit = null;
      if (jsonData)
        jsonReq = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
          method: "post",
        };
      const response = await fetch(
        reqToSelfServer ? CustomFetch.serverURL + input : input,
        { cache: "no-store", credentials: "include", ...init, ...jsonReq },
      );
      const responseJson = await response.json();

      if (!response.ok) {
        if (reqToSelfServer) {
          const serverErr = ServerErrorResponse.parse(responseJson);
          return {
            success: false,
            errCode: serverErr.errCode,
            error: `${serverErr.errCode}: ${serverErr.message}`,
          };
        }
        throw new Error("Failed to fetch data");
      }
      const payload = sucessDataSchema.parse(responseJson);
      return { success: true, payload };
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationError = fromError(err);

        return {
          success: false,
          errCode: "Validation Error",
          error: `Data Fetch Error: ${validationError.toString()}`,
        };
      } else if (err instanceof Error)
        return {
          success: false,
          errCode: "Fetch Error",
          error: `Data Fetch Error: ${err.message}`,
        };
      else
        return {
          success: false,
          errCode: "Fetch Error",
          error: `Data Fetch Error: Something went wrong.`,
        };
    }
  }
}

const customFetch = new CustomFetch();
const fetchData = customFetch.fetchData;
export { fetchData };
