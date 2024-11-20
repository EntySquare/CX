<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 公告列表 </a-typography-title>
        <a-divider />
        <a-button type="primary" @click="CreateBulletin">创建公告</a-button>
        <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
          <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
          >
            <a-table
              :data="userList"
              style="margin-top: 20px"
              :pagination="false"
            >
              <template #columns>
                <a-table-column title="公告发布时间" data-index="created_at">
                </a-table-column>

                <a-table-column
                  title="公告更新时间"
                  data-index="updated_at"
                ></a-table-column>

                <a-table-column
                  title="公告状态"
                  data-index="status"
                ></a-table-column>

                <a-table-column title="公告内容" data-index="content">
                  <template #cell="{ record }">
                    <!-- <a-button @click="viewDetails(record)" size="small">
                    查看详情
                  </a-button> -->
                    <a-popover>
                      <div class="content-text" v-html="record.content"></div>
                      <template #content>
                        <div style="width: 200px" v-html="record.content"></div>
                      </template>
                    </a-popover>
                  </template>
                </a-table-column>

                <a-table-column
                  title="公告标题"
                  data-index="title"
                ></a-table-column>
                <a-table-column title="公告标题" data-index="title"
                  ><template #cell="{ record }">
                    <a-button type="outline" @click="handleEditadd(record)"
                      >删除</a-button
                    >
                  </template>
                </a-table-column>
              </template>
            </a-table>
            <!-- <div style="display: flex; justify-content: flex-end">
            <a-pagination
              :total="totalUserInfo"
              :current="form.page + 1"
              :page-size="20"
              show-total
              @change="
                (current) => {
                  handlePageChange(current);
                }
              "
            ></a-pagination>
          </div> -->
          </a-grid-item>
        </a-grid>
        <a-modal
          :visible="visible"
          :mask-closable="false"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <a-form ref="formRef" :model="addOrderForm">
            <a-form-item field="author" label="公告发布者">
              <a-input
                v-model="addOrderForm.author"
                placeholder="请输入公告发布者"
                allow-clear
                show-word-limit
              />
            </a-form-item>
            <a-form-item field="title" label="公告标题">
              <a-input
                v-model="addOrderForm.title"
                placeholder="请输入公告标题"
                allow-clear
                show-word-limit
              />
            </a-form-item>
            <a-form-item field="content" label="公告内容">
              <a-textarea
                v-model="addOrderForm.content"
                placeholder="请输入公告内容"
                :auto-size="{
                  minRows: 3,
                  maxRows: 10,
                }"
              />
            </a-form-item>
          </a-form>
        </a-modal>
        <a-modal
          :visible="visible1"
          :mask-closable="false"
          @ok="handleEdit"
          @cancel="visible1 = false"
        >
          确认删除该公告？
        </a-modal>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
  import {
    createBulletin,
    deleteBulletin,
    getBulletinList,
  } from '@/api/announcement';
  import { Message } from '@arco-design/web-vue';
  import { computed, onMounted, ref } from 'vue';

  const userList = ref([]);
  const loading = ref(false);
  // 查询列表
  const getTeamFormList = async () => {
    try {
      loading.value = true;
      const res = await getBulletinList();
      if (res.code === 0) {
        userList.value = res.json;
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      loading.value = false;
    }
  };
  // const totalUserInfo = ref(0);
  // const handlePageChange = (current: number) => {
  //   if (current - 1 !== form.value.page) {
  //     form.value.page = current - 1;
  //     getTeamFormList();
  //   }
  // };
  const visible = ref(false);
  const visible1 = ref(false);
  const addOrderForm = ref({
    content: '',
    title: '',
    author: '',
  });

  // 计算属性：将普通文本转换为富文本（HTML 格式）
  const convertedContent = computed(() => {
    // 将换行符 \n 转为 <br> 标签
    let text = addOrderForm.value.content.replace(/\n/g, '<br/>');

    // 将多个空格转换为 HTML 中的 &nbsp;（可选）
    text = text.replace(/ /g, '&nbsp;');

    return text; // 返回富文本格式的内容
  });

  const handleOk = async () => {
    // visible.value = false;
    if (addOrderForm.value.author === '') {
      Message.error('公告发布者不能为空');
      return;
    }

    if (addOrderForm.value.title === '') {
      Message.error('公告标题不能为空');
      return;
    }

    if (addOrderForm.value.content === '') {
      Message.error('公告内容不能为空');
      return;
    }
    // 发送请求
    const res = await createBulletin({
      content: convertedContent.value,
      title: addOrderForm.value.title,
      author: addOrderForm.value.author,
    });
    if (res.code === 0) {
      Message.success('创建成功');
      // 刷新列表
      getTeamFormList();
      // 关闭弹窗
      visible.value = false;
      // 清空表单
      addOrderForm.value = {
        content: '',
        title: '',
        author: '',
      };
    } else {
      Message.error('创建失败');
    }
  };

  const handleCancel = () => {
    visible.value = false;
  };
  const CreateBulletin = () => {
    visible.value = true;
  };
  const recordID = ref();
  const handleEditadd = (record: any) => {
    recordID.value = record.id;
    visible1.value = true;
  };
  // 删除公告
  const handleEdit = async () => {
    const res = await deleteBulletin({ id: recordID.value });

    if (res.code === 0) {
      Message.success('删除成功');
      // 刷新列表
      getTeamFormList();
      // 关闭弹窗
      visible1.value = false;
      // 清空表单
      recordID.value = '';
    } else {
      Message.error('删除失败');
    }
  };

  onMounted(async () => {
    getTeamFormList();
  });
</script>

<style scoped>
  .content-text {
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 显示前三行 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
</style>
