export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

export interface ChatRequest {
  pnr?: string;
  user_message: string;
}

export interface SystemAction {
  type: "none" | "escalated" | "issued_compensation";
  reason?: string;
  compensation?: string;
}

export interface ChatResponse {
  reply: string;
  system_action: SystemAction;
  pnr?: string | null;
}
