import { api } from '../api';

export default defineEventHandler(async (event) => {
  const messageId = getRouterParam(event, 'id');
  if (!messageId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'messageId is required',
    });
  }
  const message = (await api.messages.getMessage(messageId)).data;

  const fileLinks = Array.from(
    message.content.match(/https:\/\/q.trap.jp\/files\/[0-9a-f-]+/g) ?? [],
  );
  const fileIds = fileLinks.map((link) => link.split('/').pop()!);

  return {
    message,
    fileIds,
  };
});
