import { createError } from "h3";
import type { IChatgptClient, IMessage, IModel, IOptions } from "../types";

export const useChatgpt = (): IChatgptClient => {
  const chat = async (
    message: IMessage,
    model?: IModel,
    options?: IOptions,
    dynamicApiKey?: string
  ) => {
    try {
      return await $fetch("/api/chat", {
        method: "POST",
        body: {
          message,
          model,
          options,
          dynamicApiKey,
        },
      });
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: "Failed to forward request to server",
      });
    }
  };

  const chatCompletion = async (
    messages?: [],
    model?: IModel,
    options?: IOptions,
    dynamicApiKey?: string
  ) => {
    try {
      return await $fetch("/api/chat-completion", {
        method: "POST",
        body: {
          messages,
          model,
          options,
          dynamicApiKey,
        },
      });
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: "Failed to forward request to server",
      });
    }
  };

  return { chat, chatCompletion };
};
