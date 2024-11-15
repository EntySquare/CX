<template>
  <div class="container">
    <a-card>
      <a-typography>
        <a-typography-title :heading="6"
          >{{ isEdit ? '编辑' : '创建' }}账户</a-typography-title
        >
      </a-typography>
      <a-divider />
      <a-form :model="form" :auto-label-width="true">
        <a-form-item label="手机号">
          <a-input v-model="form.phone" placeholder="请输入手机号"/>
        </a-form-item>
        <a-form-item label="昵称">
          <a-input v-model="form.nickname"  placeholder="请输入昵称"/>
        </a-form-item>
        <a-form-item label="简介">
          <a-textarea
            v-model="form.introduction"
            placeholder="请输入简介"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="头像">
          <a-upload
            draggable
            image-preview
            :custom-request="uploadImg"
            :limit="1"
          />
        </a-form-item>
   

        
        <a-form-item label="背景图">
          <a-upload
            draggable
            image-preview
            :custom-request="uploadImg2"
            :limit="1"
          />
        </a-form-item>
     
      </a-form>
      <a-row justify="center">
        <a-col :span="4">
          <a-button type="primary" long @click="handleCreate"
            >完成并上传</a-button
          >
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { Message, RequestOption } from '@arco-design/web-vue';
  import { arcoUpload } from '@/api/upload';

  import {
    createUser,
    CreateUser,
  } from '@/api/user';

  const fusionId = ref(0);
  const isEdit = ref(false);


  const form = reactive<CreateUser>({
   
    avatar: '',
    background_img: '',
   
    introduction: '',

    nickname: '',
    phone: '',
  });






  const handleCreate = async () => {
    const userData: CreateUser = {
      avatar: form.avatar,
      background_img: form.background_img,
      introduction: form.introduction,
      nickname: form.nickname,
      phone: form.phone,
    };
    // if (fusionId.value === 0) {
      const res = await createUser(userData);
      if (res.data === 'success') {
        Message.success('创建成功');
      }
    // } else {
      // const res = await updateFusion(fusionId.value, fusionData);
      // if (res.data === 'success') {
      //   Message.success('修改成功');
      // }
    // }
  };

  async function uploadImg(option: RequestOption) {
    form.avatar = await arcoUpload(option);
  }

  async function uploadImg2(option: RequestOption) {
    form.background_img = await arcoUpload(option);
  }



  onMounted(async () => {
    // const value = useRoute().query.id;
    // if (value !== undefined) {
      // isEdit.value = true;
      // fusionId.value = value;
    // }

    // await queryUserListData(1);
  });
</script>

<style scoped></style>
