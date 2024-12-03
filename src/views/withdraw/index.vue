<template>
  <div class="container">
    <a-spin :loading="loading" style="width: 100%">
      <a-card>
        <a-typography-title :heading="6"> 提现列表 </a-typography-title>
        <a-divider />
        <a-form :model="form" style="padding-right: 120px">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="value3" label="钱包地址" label-col-flex="">
                <a-input
                  v-model="form.wallet_address"
                  placeholder="please enter..."
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value3" label="代币名称" label-col-flex="">
                <!-- <a-input
                  v-model="form.token_name"
                  placeholder="please enter..."
                  allow-clear
                /> -->
                <a-select v-model="form.token_name">
                  <a-option value="USDT">USDT</a-option>
                  <a-option value="GNS">GNS</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="value2" label="提现状态" label-col-flex="">
                <a-select v-model="form.status">
                  <a-option value="1">审核中</a-option>
                  <a-option value="2">通过</a-option>
                  <a-option value="3">拒绝</a-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-space>
                <a-button type="primary" @click="getWithdrawalList"
                  >查询</a-button
                >
                <a-button type="primary" @click="resetForm">重置筛选</a-button>
                <a-button type="primary" @click="modifiedState(-1)"
                  >修改全部状态</a-button
                >
              </a-space>
            </a-col>
          </a-row>
        </a-form>

        <a-grid :cols="24" :col-gap="16" :row-gap="16" style="margin-top: 16px">
          <a-grid-item
            :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }"
          >
            <a-table
              :data="withdrawList"
              style="margin-top: 20px"
              :pagination="false"
            >
              <template #columns>
                <!-- <a-table-column title="用户ID" data-index="id"></a-table-column> -->

                <a-table-column title="钱包地址" data-index="wallet_address">
                </a-table-column>

                <a-table-column
                  title="提现数量"
                  data-index="amount"
                ></a-table-column>

                <a-table-column
                  title="实际到账"
                  data-index="practical_amount"
                ></a-table-column>

                <a-table-column
                  title="手续费"
                  data-index="fee_amount"
                ></a-table-column>

                <a-table-column
                  title="代币名称"
                  data-index="token_name"
                ></a-table-column>

                <a-table-column
                  title="提现状态"
                  data-index="status"
                ></a-table-column>

                <a-table-column
                  title="提现交易hash"
                  data-index="tx_hash"
                ></a-table-column>

                <a-table-column
                  title="拒绝原因"
                  data-index="refuse_cause"
                ></a-table-column>

                <a-table-column
                  title="处理时间"
                  data-index="dispose_time"
                ></a-table-column>

                <a-table-column
                  title="注册时间"
                  data-index="created_at"
                ></a-table-column>

                <a-table-column title="操作">
                  <template #cell="{ record }">
                    <div v-if="record.status === '审核中'">
                      <a-button type="primary" @click="modifiedState(record.id)"
                        >修改状态</a-button
                      >
                    </div>
                  </template>
                </a-table-column>
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
        <a-modal
          :visible="visible"
          :mask-closable="false"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <a-form ref="formRef" :model="WithdrawalStatus" :rules="rules">
            <a-form-item field="dispose" label="操作">
              <a-select v-model="WithdrawalStatus.dispose">
                <a-option value="1">通过</a-option>
                <a-option value="2">拒绝</a-option>
              </a-select>
            </a-form-item>
            <a-form-item
              v-if="WithdrawalStatus.dispose === '2'"
              field="reason"
              label="拒绝原因"
            >
              <a-input v-model="WithdrawalStatus.reason" allow-clear />
            </a-form-item>
          </a-form>
        </a-modal>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
  import { getWithdrawalLog, withdrawalHandle } from '@/api/withdraw';
  import { FormInstance, Message } from '@arco-design/web-vue';
  import { onMounted, reactive, ref } from 'vue';

  const withdrawList = ref([]);
  const loading = ref(false);
  const form = ref({
    wallet_address: '', // 钱包地址
    token_name: '', // 代币名称
    status: '', // 提现状态
    page: 0, // 页码
    page_size: 10, // 每页条数
  });
  const totalUserInfos = ref(0);
  const getWithdrawalList = async () => {
    try {
      loading.value = true;
      const res = await getWithdrawalLog({
        wallet_address: form.value.wallet_address, // 钱包地址
        token_name: form.value.token_name, // 代币名称
        status: form.value.status === '' ? 0 : Number(form.value.status), // 提现状态
        page: form.value.page + 1, // 页码
        page_size: form.value.page_size, // 每页条数
      });
      if (res.code === 0) {
        withdrawList.value = res.json.list;
        totalUserInfos.value = res.json.total;
      }
    } catch (err) {
      // 1
    } finally {
      loading.value = false;
    }
  };

  const handlePageChange = (current: number) => {
    if (current - 1 !== form.value.page) {
      form.value.page = current - 1;
      getWithdrawalList();
    }
  };
  const resetForm = () => {
    form.value = {
      wallet_address: '', // 钱包地址
      token_name: '', // 代币名称
      status: '', // 提现状态
      page: 0, // 页码
      page_size: 10, // 每页条数
    };
    getWithdrawalList();
  };

  const rules = {
    dispose: [{ required: true, message: '请选择操作', trigger: 'change' }],
  };

  // 修改提现状态
  const visible = ref(false);
  const moId = ref();

  const modifiedState = (id: number) => {
    visible.value = true;
    moId.value = id;
  };

  const formRef = ref<FormInstance>();
  const WithdrawalStatus = reactive({
    id: moId.value,
    dispose: '',
    reason: '',
  });
  const handleOk = async () => {
    if (WithdrawalStatus.dispose === '') {
      // 提示
      Message.error('请选择操作');
      return;
    }
    if (WithdrawalStatus.dispose === '2') {
      // 拒绝
      if (WithdrawalStatus.reason === '') {
        Message.error('请输入拒绝原因');
        return;
      }
    }

    try {
      loading.value = true;
      const dispose = WithdrawalStatus.dispose === '1';

      // 过滤出状态为"审核中"的记录
      const pendingWithdrawals = withdrawList.value.filter(
        (item: any) => item.status === '审核中'
      );

      if (pendingWithdrawals.length === 0) {
        Message.info("没有需要处理的'审核中'记录");
        return;
      }
      if (moId.value === -1) {
        const withdrawalHandleReq = {
          list: pendingWithdrawals.map((item: any) => ({
            id: item.id,
            dispose, // 或者 false，根据你的需求批量通过或拒绝
            reason: dispose ? '' : WithdrawalStatus.reason, // 只有拒绝才需要填写原因
          })),
        };
        const res = await withdrawalHandle(withdrawalHandleReq);
        if (res.code === 0) {
          Message.success(
            `操作完成：${res.json.success_count} 条成功，${res.json.fail_count} 条失败`
          );
        }
      } else {
        const withdrawalHandleReq = {
          list: [
            {
              id: moId.value,
              dispose, // 或者 false，根据你的需求批量通过或拒绝
              reason: dispose ? '' : WithdrawalStatus.reason, // 只有拒绝才需要填写原因
            },
          ],
        };
        const res = await withdrawalHandle(withdrawalHandleReq);
        if (res.code === 0) {
          Message.success(
            `操作完成：${res.json.success_count} 条成功，${res.json.fail_count} 条失败`
          );
        }
      }
      visible.value = false;
      // 清空表单
      formRef.value?.resetFields();
      // 刷新列表
      getWithdrawalList();
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      loading.value = false;
    }
  };
  const handleCancel = () => {
    visible.value = false;
  };

  onMounted(async () => {
    getWithdrawalList();
  });
</script>

<style scoped></style>
