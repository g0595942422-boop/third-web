import { request } from "./apiClient";
import type { AgentResponse } from "../features/ai-agent/types";

export type { AgentResponse };

let sessionId = "";

export async function sendMessage(
  message: string,
): Promise<AgentResponse> {
  try {
    const data = await request<AgentResponse>("/api/chat", {
      method: "POST",
      body: { session_id: sessionId || "", message, resume: false },
    });

    if (data.metadata?.session_id) {
      sessionId = data.metadata.session_id as string;
    }

    return data;
  } catch (error) {
    console.error("Agent request failed:", error);

    return {
      success: false,
      session_id: sessionId,
      response: {
        text: "智能体暂时无法连接，请检查后端服务。",
        type: "error",
        files: [],
        recommendations: [],
      },
      state_snapshot: {},
      metadata: { status: "error" },
    };
  }
}