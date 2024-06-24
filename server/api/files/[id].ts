import { api } from '~/server/api/api';

export default defineEventHandler(async (event) => {
  const fileId = getRouterParam(event, 'id');
  if (!fileId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'fileId is required',
    });
  }
  const file = await (await api.files.getFile(fileId)).arrayBuffer();
  return new Response(file, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
});
