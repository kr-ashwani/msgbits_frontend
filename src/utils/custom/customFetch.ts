"use client";
import { z } from "zod";
import { fromError } from "zod-validation-error";

interface SuccessData<T extends z.ZodSchema> {
  success: true;
  data: T;
}
interface FailureData {
  success: false;
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

  async fetchData<T extends z.ZodSchema>(
    input: RequestInfo | URL,
    sucessDataSchema: T,
    init?: RequestInit,
  ): Promise<SuccessData<z.infer<T>> | FailureData> {
    try {
      const serverSegment =
        (typeof input === "string" || input instanceof String) &&
        input.startsWith("/");
      const response = await fetch(
        serverSegment ? CustomFetch.serverURL + input : input,
        { cache: "no-store", credentials: "include", ...init },
      );
      const responseJson = await response.json();

      if (!response.ok) {
        if (serverSegment) {
          const serverErr = ServerErrorResponse.parse(responseJson);
          return {
            success: false,
            error: `${serverErr.errCode}: ${serverErr.message}`,
          };
        }
        throw new Error("Failed to fetch data");
      }

      const data = sucessDataSchema.parse(responseJson?.data || responseJson);
      return { success: true, data };
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationError = fromError(err);
        console.log(
          validationError.name,
          validationError.message,
          validationError.details,
        );
        return {
          success: false,
          error: `Data Fetch Error: ${validationError.toString()}`,
        };
      } else if (err instanceof Error)
        return { success: false, error: `Data Fetch Error: ${err.message}` };
      else
        return {
          success: false,
          error: `Data Fetch Error: Something went wrong.`,
        };
    }
  }
}

const customFetch = new CustomFetch();
const fetchData = customFetch.fetchData;
export { fetchData };
