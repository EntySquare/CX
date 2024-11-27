<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
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
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                field="recommend_address"
                label="上级地址"
                label-col-flex=""
              >
                <a-input
                  v-model="form.recommend_address"
                  placeholder="please enter..."
                  allow-clear
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
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-space>
                <a-button type="primary" @click="getTeamFormList"
                  >查询</a-button
                >
                <a-button type="primary" @click="resetForm">重置筛选</a-button>
              </a-space>
            </a-col>
          </a-row>
        </a-form>

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
                <!-- <a-table-column title="用户ID" data-index="id"></a-table-column> -->

                <a-table-column title="钱包地址" data-index="wallet_address">
                </a-table-column>

                <a-table-column
                  title="邀请码"
                  data-index="invitation_code"
                ></a-table-column>

                <a-table-column
                  title="上级地址"
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
                  title="小区业绩"
                  data-index="community_performance"
                ></a-table-column>

                <a-table-column
                  title="小区算力"
                  data-index="community_power"
                ></a-table-column>
              </template>
            </a-table>
            <div style="display: flex; justify-content: flex-end">
              <a-pagination
                :total="totalUserInfos"
                :current="form.page + 1"
                :page-size="20"
                show-total
                @change="
                  (current) => {
                    handlePageChange(current);
                  }
                "
              ></a-pagination>
            </div>
          </a-grid-item>
        </a-grid>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getTeamList } from '@/api/team';

  const loading = ref(false);
  const userList = ref([]);
  const form = ref({
    wallet_address: '', // 钱包地址
    recommend_address: '', // 上级地址
    invitation_code: '', // 邀请码
    page: 0, // 页码
    page_size: 10, // 每页条数
  });
  const totalUserInfos = ref(0);
  // 查询用户列表
  const getTeamFormList = async () => {
    try {
      loading.value = true;
      const res = await getTeamList({
        wallet_address: form.value.wallet_address,
        recommend_address: form.value.recommend_address,
        invitation_code: form.value.invitation_code,
        page: form.value.page + 1,
        page_size: form.value.page_size,
      });
      if (res.code === 0) {
        userList.value = res.json.list;
        totalUserInfos.value = res.json.total;
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      loading.value = false;
    }
  };

  const handlePageChange = (current: number) => {
    if (current - 1 !== form.value.page) {
      form.value.page = current - 1;
      getTeamFormList();
    }
  };
  const resetForm = () => {
    form.value = {
      wallet_address: '', // 钱包地址
      recommend_address: '', // 上级地址
      invitation_code: '', // 邀请码
      page: 0, // 页码
      page_size: 10, // 每页条数
    };
    getTeamFormList();
  };
  onMounted(async () => {
    getTeamFormList();
  });
</script>

<style scoped></style>
