<template>
  <div class="container">
    <a-card>
      <a-typography-title :heading="6"> 团队列表 </a-typography-title>
      <a-divider />
      <a-form :model="form" style="padding-right: 120px">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              field="wallet_address"
              label="钱包地址"
              label-col-flex=""
            >
              <a-input
                v-model="form.wallet_address"
                placeholder="please enter..."
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              field="recommend_address"
              label="上级ID"
              label-col-flex=""
            >
              <a-input
                v-model="form.recommend_address"
                placeholder="please enter..."
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              field="invitation_code"
              label="邀请码"
              label-col-flex=""
            >
              <a-input
                v-model="form.invitation_code"
                placeholder="please enter..."
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-space>
              <a-button type="primary" @click="getTeamFormList">查询</a-button>
              <a-button type="primary" @click="resetForm">重置筛选</a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>

      <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
        <a-grid-item
          :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
        >
          <a-table :data="userList" style="margin-top: 20px">
            <template #columns>
              <!-- <a-table-column title="用户ID" data-index="id"></a-table-column> -->

              <a-table-column title="钱包地址" data-index="wallet_address">
              </a-table-column>

              <a-table-column
                title="邀请码"
                data-index="invitation_code"
              ></a-table-column>

              <a-table-column
                title="上级ID"
                data-index="recommend_address"
              ></a-table-column>

              <a-table-column
                title="团队业绩"
                data-index="team_performance"
              ></a-table-column>

              <a-table-column
                title="团队人数"
                data-index="team_num"
              ></a-table-column>

              <a-table-column
                title="社区业绩"
                data-index="community_performance"
              ></a-table-column>

              <a-table-column
                title="社区算力"
                data-index="community_power"
              ></a-table-column>
            </template>
          </a-table>
        </a-grid-item>
      </a-grid>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getTeamList } from '@/api/team';

  const userList = ref([]);
  const form = ref({
    wallet_address: '', // 钱包地址
    recommend_address: '', // 上级地址
    invitation_code: '', // 邀请码
    page: 1, // 页码
    page_size: 10, // 每页条数
  });

  // 查询用户列表
  const getTeamFormList = async () => {
    try {
      const res = await getTeamList(form.value);
      if (res.code === 0) {
        userList.value = res.json.list;
      }
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  const resetForm = () => {
    form.value = {
      wallet_address: '', // 钱包地址
      recommend_address: '', // 上级地址
      invitation_code: '', // 邀请码
      page: 1, // 页码
      page_size: 10, // 每页条数
    };
    getTeamFormList();
  };
  onMounted(async () => {
    getTeamFormList();
  });
</script>

<style scoped></style>
