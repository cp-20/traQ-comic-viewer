<script setup lang="ts">
const initialMessageIds = location.hash
  .slice(1)
  .split(',')
  .filter((v) => !!v);
const initialMessageLinkStr = initialMessageIds
  .map((id) => `https://q.trap.jp/messages/${id}`)
  .join('\n');
const messageLinkStr = ref(initialMessageLinkStr);
const messageIds = computed(() =>
  messageLinkStr.value
    .split('\n')
    .filter((v) => !!v)
    .map((v) => v.split('/').pop()),
);

const fileIds = ref<string[]>([]);

const send = async (e: Event) => {
  e.preventDefault();
  location.hash = messageIds.value.join(',');
  const results = await Promise.all(
    messageIds.value.map((id) => $fetch(`/api/messages/${id}`)),
  );
  fileIds.value = results.flatMap((r) => r.fileIds);
};
if (initialMessageIds.length > 0) {
  send(new Event('submit'));
}
</script>

<template>
  <div class="container">
    <h1 class="title">
      <span class="no-wrap">traQに</span>
      <span class="no-wrap">投稿された</span>
      <span class="no-wrap">漫画を</span>
      <span class="no-wrap">いい感じに</span>
      <span class="no-wrap">見るやつ</span>
    </h1>

    <form class="input-container" @submit="send">
      <label for="message-link-input" class="input-label"
        >メッセージリンク</label
      >
      <p class="input-annotation">改行で区切ることで複数入力可能です</p>
      <textarea
        id="message-link-input"
        v-model="messageLinkStr"
        rows="3"
        class="input-textarea"
      />
      <button type="submit" class="input-submit-button">取得</button>
    </form>

    <div class="images-container">
      <div v-for="(id, i) in fileIds" :key="id" class="image-container">
        <div class="image-index">{{ i + 1 }} / {{ fileIds.length }}</div>
        <img class="image" :src="`/api/files/${id}`" />
      </div>
    </div>
  </div>
</template>

<style>
body {
  font-family: 'Noto Sans JP', sans-serif;
}

.container {
  max-width: 800px;
  padding-inline: 0.5rem;
  padding-top: 16px;
  padding-bottom: 50vh;
  margin: 0 auto;
}

@media screen and (min-width: 480px) {
  .container {
    padding-inline: 1rem;
    padding-top: 32px;
  }
}

.title {
  font-size: 2rem;
}

.no-wrap {
  white-space: nowrap;
}

.input-container {
  margin-top: 1rem;
}

.input-label {
  font-weight: 500;
}

.input-annotation {
  font-size: 0.8rem;
  color: #666;
}

.input-textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
}

.input-submit-button {
  width: 100%;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 0.25rem;
}

.images-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.image-container {
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.image-index {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  text-align: right;
  background-color: #f8f9fa;
}

.image {
  width: 100%;
  height: auto;
}
</style>
