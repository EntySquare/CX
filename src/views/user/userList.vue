<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6"> 用户列表 </a-typography-title>
      <a-divider />
      <a-row :gutter="16">
        <a-col :span="8">
          <a-input v-model="condition" placeholder="手机号/昵称" />
        </a-col>
        <a-col :span="4">
          <a-space :size="18" style="margin-left: 100px">
            <a-button
              type="primary"
              style="margin-right: 10px"
              @click="queryUserListData()"
            >
              <icon-search :size="20" />
              查询
            </a-button>
            <a-button @click="resetQuery">
              <icon-loop :size="20" />
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider />
      <a-table :data="tableData" style="margin-top: 20px" :pagination="false">
        <template #columns>
          <a-table-column title="昵称" data-index="nickname"></a-table-column>
          <a-table-column title="头像" data-index="picture">
            <template #cell="{ record }">
              <a-image :src="record.avatar" height="80px" width="120px">
              </a-image>
            </template>
          </a-table-column>
          <a-table-column
            title="手机号/账号"
            data-index="phone"
          ></a-table-column>
          <a-table-column
            title="创作的nft数量"
            data-index="author_nft_count"
          ></a-table-column>
          <a-table-column title="余额" data-index="balance"></a-table-column>
          <a-table-column
            title="创建时间"
            data-index="created_at"
          ></a-table-column>
          <a-table-column
            title="持有的nft数量"
            data-index="holder_nft_count"
          ></a-table-column>
          <a-table-column
            title="发布的专辑数量"
            data-index="publish_album_count"
          ></a-table-column>
          <a-table-column title="详情">
            <template #cell="{ record }">
              <a-button style="margin-right: 10px" @click="onRowClick(record.id)"
                >查看</a-button
              >
            </template>
          </a-table-column>
        </template>
      </a-table>
      <a-row justify="center" style="padding-top: 20px">
        <a-pagination
          v-model:current="pagination.current"
          :total="pagination.total!"
          show-total
          @change="queryUserListData()"
        />
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { fetchUserList, User, UserParam } from '@/api/user';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import router from '@/router';

  const { setLoading } = useLoading(true);
  const condition = ref<string>('');
  const tableData = ref<User[]>([]);
  const pagination: Pagination = reactive({
    current: 1,
    pageSize: 10,
  });

  // 查询用户列表
  const queryUserListData = async (
    params: UserParam = {
      keyword: condition.value,
      pageNum: pagination.current,
      pageSize: 10,
    }
  ) => {
    setLoading(true);
    try {
      const res = await fetchUserList(params);
      tableData.value = res.data.user_list;
      pagination.current = res.data.current_page;
      pagination.total = res.data.total;
    } finally {
      setLoading(false);
    }
  };

  // 重置查询
  const resetQuery = async () => {
    condition.value = '';
    await queryUserListData();
  };

  // 查看用户详情
  const onRowClick = (index: number) => {
    router.push({ name: 'userListInfo', query: { id: index } });
  };

  onMounted(() => {
    queryUserListData();
  });
</script>

<style scoped>
  .container {
    padding: 16px 20px;
  }
</style>
