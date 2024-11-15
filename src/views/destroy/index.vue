<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6">销毁列表</a-typography-title>
        <a-divider />
        <a-form :model="form" style="padding-right: 120px">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="value3" label="订单ID" label-col-flex="">
                <a-input v-model="form.id" placeholder="please enter..." />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value3" label="钱包地址" label-col-flex="">
                <a-input
                  v-model="form.wallet_address"
                  placeholder="please enter..."
                />
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-space>
                <a-button type="primary" @click="getBuyalList">查询</a-button>
                <a-button type="primary" @click="resetForm">重置筛选</a-button>
              </a-space>
            </a-col>
          </a-row>
        </a-form>

        <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
          <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
          >
            <a-table :data="BuyList" style="margin-top: 20px">
              <template #columns>
                <a-table-column title="订单ID" data-index="id"></a-table-column>

                <a-table-column title="钱包地址" data-index="wallet_address">
                </a-table-column>

                <a-table-column
                  title="订单状态"
                  data-index="status"
                ></a-table-column>

                <a-table-column
                  title="算力"
                  data-index="power"
                ></a-table-column>

                <a-table-column
                  title="币种"
                  data-index="token_name"
                ></a-table-column>

                <a-table-column
                  title="代币数量"
                  data-index="burn_num"
                ></a-table-column>

                <a-table-column
                  title="价格"
                  data-index="price"
                ></a-table-column>

                <a-table-column
                  title="释放时间"
                  data-index="burn_time"
                ></a-table-column>
              </template>
            </a-table>
            <!-- <div style="display: flex; justify-content: flex-end">
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
            </div> -->
          </a-grid-item>
        </a-grid>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
  import { getBurnList } from '@/api/destroy';
  import { onMounted, ref } from 'vue';

  const BuyList = ref([]);
  const loading = ref(false);
  const form = ref({
    id: '', // 用户ID
    wallet_address: '', // 钱包地址
    page: 1, // 页码
    page_size: 10, // 每页条数
  });

  const getBuyalList = async () => {
    try {
      const res = await getBurnList({
        id: form.value.id === '' ? 0 : Number(form.value.id), // 用户ID
        wallet_address: form.value.wallet_address, // 钱包地址

        page: form.value.page, // 页码
        page_size: form.value.page_size, // 每页条数
      });
      if (res.code === 0) {
        BuyList.value = res.json.list;
      }
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  const resetForm = () => {
    form.value = {
      id: '', // 用户ID
      wallet_address: '', // 钱包地址
      page: 1, // 页码
      page_size: 10, // 每页条数
    };
    getBuyalList();
  };

  onMounted(async () => {
    getBuyalList();
  });
</script>

<style scoped></style>
