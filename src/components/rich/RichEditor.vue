<script setup lang="ts">
  import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import { IEditorConfig, SlateElement } from '@wangeditor/editor';
  import { editorUpload } from '@/api/upload';
  
  const emit = defineEmits(['confirm']);

  const mode = 'default';
  // 编辑器实例，必须用 shallowRef，重要！
  const editorRef = shallowRef();

  // 内容 HTML
  const valueHtml = ref('');

  // 模拟 ajax 异步获取内容
  onMounted(() => {
    // setTimeout(() => {
    //   valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
    // }, 1500);
  });

  const toolbarConfig = {};
  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      /* 菜单配置，下文解释 */
    },
  };

  // 组件销毁时，及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });

  // 编辑器回调函数
  const handleCreated = (editor: any) => {
    console.log('created', editor);
    editorRef.value = editor; // 记录 editor 实例，重要！
  };
  const handleChange = (editor: any) => {
    emit("confirm",editor.getHtml());
    console.log('change:', editor.getHtml());
  };
  const handleDestroyed = (editor: any) => {
    console.log('destroyed', editor);
  };
  const handleFocus = (editor: any) => {
    console.log('focus', editor);
  };
  const handleBlur = (editor: any) => {
    console.log('blur', editor);
  };
  const insertText = () => {
    const editor = editorRef.value;
    if (editor == null) return;

    editor.insertText('hello world');
  };

  const printHtml = () => {
    const editor = editorRef.value;
    if (editor == null) return;
    console.log(editor.getHtml());
  };

  const disable = () => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.disable();
  };

  // type InsertFnType = (url: string, alt: string, href: string) => void;
  type InsertFnType = (url: string) => void;

  type ImageElement = SlateElement & {
    src: string;
    alt: string;
    url: string;
    href: string;
  };

  // 插入图片
  editorConfig.MENU_CONF!.insertImage = {
    onInsertedImage(imageNode: ImageElement | null) {
      // TS 语法
      // onInsertedImage(imageNode) {                    // JS 语法
      if (imageNode == null) return;

      const { src, alt, url, href } = imageNode;
      console.log('inserted image', src, alt, url, href);
    },
    // checkImage: customCheckImageFn, // 也支持 async 函数
    // parseImageSrc: customParseImageSrc, // 也支持 async 函数
  };
  // 编辑图片
  editorConfig.MENU_CONF!.editImage = {
    onUpdatedImage(imageNode: ImageElement | null) {
      // TS 语法
      // onUpdatedImage(imageNode) {                    // JS 语法
      if (imageNode == null) return;

      const { src, alt, url } = imageNode;
      console.log('updated image', src, alt, url);
    },
  };

  editorConfig.MENU_CONF!.uploadImage = {
    // 自定义上传
    async customUpload(file: File, insertFn: InsertFnType) {  // TS 语法
      // async customUpload(file, insertFn) {                   // JS 语法
      // file 即选中的文件
      const url = await editorUpload(file);
      // 最后插入图片
      insertFn(url);
    }
  }
</script>

<template>
  <div>
    <div>
<!--      <button @click="insertText">insert text</button>-->
<!--      <button @click="printHtml">print html</button>-->
<!--      <button @click="disable">disable</button>-->
    </div>
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <Toolbar
        :editor="editorRef"
        :default-config="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        v-model="valueHtml"
        :default-config="editorConfig"
        :mode="mode"
        style="height: 300px; overflow-y: hidden"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onDestroyed="handleDestroyed"
        @onFocus="handleFocus"
        @onBlur="handleBlur"
      />
    </div>
  </div>
</template>

<style src="@wangeditor/editor/dist/css/style.css"></style>
