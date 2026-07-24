/** AI 对话消息 */
export type Message = {
  role: "user" | "assistant";
  content: string;
};

/** Agent 工作流步骤 */
export interface AgentStep {
  label: string;
  status: "wait" | "running" | "done";
  detail: string;
}

/** 用户画像 */
export interface UserProfile {
  major: string;
  interests: string[];
  goal: string;
  matched: boolean;
}
