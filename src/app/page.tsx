"use client";
import { JsonEditor } from "json-edit-react";
import Image from "next/image";
import BUNDLE_PAYLOAD from './payload.json'
import { useState } from "react";

interface BundlesResponse {
  messages: string;
  redirect_url: string;
  status: number;
}

const sendReqBundles = async (payload: any, token: string) => {
  const response = await fetch("https://api.staging.medplanner.io/api/fhir/v1/bundles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });
  return response.json() as unknown as BundlesResponse;
} 

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [jsonData, setJsonData] = useState<any>(BUNDLE_PAYLOAD);
  const [authToken, setAuthToken] = useState("eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0OTYyRnZxS1lFclk5WmxEcjJnS2wwS1RBZzVOak1ROXY1dGx2WWNIbms4In0.eyJleHAiOjE3MzQ1MDIxNzksImlhdCI6MTczNDUwMjExOSwianRpIjoiMGU0YjBiN2ItNmE5NS00N2ZlLThjOWQtY2U5Y2UwMGIxMmI2IiwiaXNzIjoiaHR0cHM6Ly92ZWluc3Nzby5taG5leHVzLmNvbS9yZWFsbXMvcHJvdmlkZXIiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiNWUwZDg5YzgtN2YzMS00NDVmLTliZGMtNDY5NDlhNmRhZmU4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicHJvdmlkZXItcG9ydGFsIiwic2Vzc2lvbl9zdGF0ZSI6ImQ3ZGQ2NTA5LWI5MTUtNGJiMS05MmIxLTFmNDlmMjc4Y2Y3YSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly92ZWluc21lZGljby5taG5leHVzLmNvbSIsImh0dHBzOi8vd3d3LmNwcmNob3NwaXRhbC5tb2guZ292Lm15IiwiaHR0cHM6Ly92ZWlucy5tb2NrdXAubWhuZXh1cy5jb20iLCJodHRwOi8vbG9jYWxob3N0OjQ0MDAiLCJodHRwczovL21hbmFnZW1lbnQuaGllLm1vaC5nb3YubXkiLCJodHRwOi8vbG9jYWxob3N0OjQzMDAiLCJodHRwczovL3ZlaW5zbWVkaWNvLmhhcGkubWhuZXh1cy5jb20iLCJodHRwczovL3RlbHN0cmEuZWhyLXZpZXdlci5taG5leHVzLmNvbSIsImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCIsImh0dHA6Ly9sb2NhbGhvc3Q6MjAwMCIsImh0dHA6Ly9sb2NhbGhvc3Q6NDEwMCIsImh0dHBzOi8vdWF0LmNwcmNob3NwaXRhbC5tb2guZ292Lm15IiwiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaHR0cHM6Ly9jaGF0Ym90Lm1obmV4dXMuY29tIiwiaHR0cHM6Ly92ZWluc3Nzby5taG5leHVzLmNvbSIsImh0dHA6Ly8xOTIuODIuNjMuNTA6NDIwMiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1wcm92aWRlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbIm1hbmFnZS11c2VycyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwYXRpZW50LyoucmVhZCBwcm9maWxlIHBhdGllbnQvKi53cml0ZSBlbWFpbCIsInNpZCI6ImQ3ZGQ2NTA5LWI5MTUtNGJiMS05MmIxLTFmNDlmMjc4Y2Y3YSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJhY3RpdGlvbmVyIjoiYWQ0NmFhY2EtZTRlNy00NWY5LTlkNzgtYzJlZDk2ODYxZTFlIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiMDAwODI0MDIwNzI2IiwiZW1haWwiOiJsaWFraW02NDVAZ21haWwuY29tIiwiZGFzaGJvYXJkIjoiWSJ9.kLo2qLu46DQVSUSE-_kTi8q2CChfifTCs3mHTLSu4dTeafUwFzkis4uCJJzk3Q1Tn-Muf3imOEHcgXkfABrner7AsSMpCg_qQg9VXGQlVOsE0oiszYvDPKHPVk19AIEm0d28DCWvasLswBc1Eje800Gvgvj6u1gKm2O1_ZfYZHzP3q3o-MKVJZx8DAIHs6_3UE553M271HatMpVp1_Yu9KvET3bQeAPnespKYmdIaQj6yxzcXV2_ytmVmXFmMc5ACV4PKAYR3WiPjAe3dSakVme0FO7U1Vr92nYrn07B8fCdmnXlusjWbw5F4u3TVdI1wa_Be2gNP2-AC8Y51RuPvg")
  const onClickSendRequest = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await sendReqBundles(jsonData, authToken);
    if (response.redirect_url) {
      window.open(response.redirect_url, "_blank");
    }
    setIsLoading(false);
    return response;
  }
  return (
    <div className="container font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-center font-semibold text-3xl">
        Method
      </h2>
      <pre className="text-center text-pretty">
        <code>POST</code>
      </pre>
      <h2 className="text-center font-semibold text-3xl">
        Endpoint
      </h2>
      <pre className="text-center text-pretty">
        <code>https://api.staging.medplanner.io/api/fhir/v1/bundles</code>
      </pre>
      <main className="flex flex-col gap-8 items-center py-4">
        <button type="button" disabled={isLoading} onClick={onClickSendRequest} className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
          {isLoading ? "Processing..." : "Send Request"}
        </button>
        <mark>
          NOTE: Before triggering make sure you already signout from https://app.staging.medplanner.io
        </mark>
        <h2 className="text-center font-semibold text-3xl">
          Bearer Token
        </h2>
        <textarea aria-label="Auth Token" placeholder="Bearer auth token" className="w-full text-zinc-950 p-2 rounded-md" rows={5} onChange={(e) => setAuthToken(e.target.value)} value={authToken} />
        <h2 className="text-center font-semibold text-3xl">
          Editable Payload
        </h2>
        <JsonEditor
          data={jsonData}
          setData={(updatedJsonData) => setJsonData(updatedJsonData)}
          className="w-full !max-w-none"
        />
      </main>
    </div>
  );
}
