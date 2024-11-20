<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 用户资产变动 </a-typography-title>
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
                field="start_time"
                label="开始时间"
                label-col-flex=""
              >
                <a-date-picker
                  style="width: 220px; margin: 0 24px 24px 0"
                  show-time
                  format="YYYY-MM-DD hh:mm"
                  @change="onChangeStart"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="end_time" label="结束时间" label-col-flex="">
                <a-date-picker
                  style="width: 220px; margin: 0 24px 24px 0"
                  show-time
                  format="YYYY-MM-DD hh:mm"
                  @change="onChangeEnd"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="change_type" label="操作" label-col-flex="">
                <a-select v-model="form.change_type">
                  <a-option value="直推奖励">直推奖励</a-option>
                  <a-option value="提现USDT">提现USDT</a-option>
                  <a-option value="提现GNS">提现GNS</a-option>
                  <a-option value="节点收益">节点收益</a-option>
                  <a-option value="提现拒绝">提现拒绝</a-option>
                  <a-option value="团队奖励">团队奖励</a-option>
                </a-select>
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
                <a-table-column title="钱包地址" data-index="wallet_address">
                </a-table-column>

                <a-table-column
                  title="上级地址"
                  data-index="recommend_address"
                ></a-table-column>

                <a-table-column
                  title="币种"
                  data-index="token_name"
                ></a-table-column>

                <a-table-column
                  title="金额"
                  data-index="amount"
                ></a-table-column>

                <a-table-column
                  title="价格"
                  data-index="price"
                ></a-table-column>

                <a-table-column
                  title="操作前数量"
                  data-index="original_balance"
                ></a-table-column>

                <a-table-column
                  title="操作后数量"
                  data-index="update_balance"
                ></a-table-column>
                <a-table-column
                  title="类型"
                  data-index="change_type"
                ></a-table-column>
                <a-table-column
                  title="创建时间"
                  data-index="created_at"
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
import { getAssetChangeList } from '@/api/alteration';
import { onMounted, ref } from 'vue';

const loading = ref(false);
const userList = ref([]);
const form = ref({
  wallet_address: '', // 钱包地址
  recommend_address: '', // 上级地址
  change_type: '', // 变动类型
  start_time: 0, // 开始时间
  end_time: 0, // 结束时间
  page: 0, // 页码
  page_size: 10, // 每页条数
});
const totalUserInfos = ref(0);
const onChangeStart = (date: any) => {
  form.value.start_time = date;
  if (date) {
    // 将日期转换为秒级时间戳
    const timestamp = Math.floor(new Date(date).getTime() / 1000);
    form.value.start_time = timestamp; // 将时间戳赋值给 form.end_time
    console.log('秒级时间戳:', timestamp);
  } else {
    form.value.start_time = 0; // 清空时间戳
    console.log('未选择日期');
  }
};

const onChangeEnd = (date: any) => {
  // form.value.end_time = date;
  if (date) {
    // 将日期转换为秒级时间戳
    const timestamp = Math.floor(new Date(date).getTime() / 1000);
    form.value.end_time = timestamp; // 将时间戳赋值给 form.end_time
    console.log('秒级时间戳:', timestamp);
  } else {
    form.value.end_time = 0; // 清空时间戳
    console.log('未选择日期');
  }
};

// 查询用户列表
const getTeamFormList = async () => {
  try {
    loading.value = true;
    const res = await getAssetChangeList({
      wallet_address: form.value.wallet_address,
      recommend_address: form.value.recommend_address,
      change_type: form.value.change_type, // 变动类型
      start_time: form.value.start_time, // 开始时间
      end_time: form.value.end_time, // 结束时间      page: form.value.page + 1,
      page_size: form.value.page_size,
      page: form.value.page + 1,
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
    change_type: '', // 变动类型
    start_time: undefined, // 开始时间
    end_time: undefined, // 结束时间
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
