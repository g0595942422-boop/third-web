/** AI 对话消息 */
export type Message = {
  role: "user" | "assistant";
  content: string;
};
