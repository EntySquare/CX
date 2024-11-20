<template>
  <div style="padding: 20px">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 管理账户 </a-typography-title>
        <a-divider />
        <a-button type="primary" style="margin-top: 10px">
          <template #icon>
            <icon-plus />
          </template>
          添加账户
        </a-button>
        <a-table style="margin-top: 20px">
          <template #columns>
            <a-table-column title="账户" data-index="title"></a-table-column>
            <a-table-column title="角色" data-index="content"></a-table-column>
            <a-table-column title="操作">
              <template #cell="{ record }">
                <a-button
                  @click="$modal.info({ title: 'Name', content: record.name })"
                  >删除</a-button
                >
                <a-button
                  style="margin-right: 10px"
                  @click="$modal.info({ title: 'Name', content: record.name })"
                  >修改角色</a-button
                >
                <a-button
                  style="margin-right: 10px"
                  @click="$modal.info({ title: 'Name', content: record.name })"
                  >修改密码</a-button
                >
              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-card>
    </a-spin>
  </div>
  <!--  增加账户弹窗-->
  <a-modal v-model:visible="addUser" title="添加账户">
    <a-form :model="form">
      <a-form-item field="name" label="用户名">
        <a-input v-model="form.name" allow-clear />
      </a-form-item>
      <a-form-item field="post" label="密码">
        <a-input v-model="form.name" allow-clear />
      </a-form-item>
      <a-form-item field="post" label="角色">
        <a-select :style="{ width: '320px' }" placeholder="Please select ...">
          <a-option>Beijing</a-option>
          <a-option>Shanghai</a-option>
          <a-option>Guangzhou</a-option>
          <a-option disabled>Disabled</a-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
  <!--  修改角色弹窗-->
  <a-modal v-model:visible="editUser" title="修改角色">
    <a-form :model="form">
      <a-form-item field="name" label="用户名">
        <a-input v-model="form.content" allow-clear />
      </a-form-item>
      <a-form-item field="name" label="角色">
        <a-select :style="{ width: '320px' }" placeholder="Please select ...">
          <a-option>Beijing</a-option>
          <a-option>Shanghai</a-option>
          <a-option>Guangzhou</a-option>
          <a-option disabled>Disabled</a-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
  <!--  修改密码弹窗-->
  <a-modal v-model:visible="editPass" title="修改密码">
    <a-form :model="form">
      <a-form-item field="name" label="用户名">
        <a-input v-model="form.content" allow-clear />
      </a-form-item>
      <a-form-item field="name" label="新密码">
        <a-input v-model="form.content" allow-clear />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';

  const loading = ref<boolean>(false);
  const addUser = ref<boolean>(false);
  const editUser = ref<boolean>(false);
  const editPass = ref<boolean>(false);
  const form = reactive({
    name: '',
    picture: '',
    content: '',
  });
</script>

<style scoped></style>
